import CredentialsProvider from "next-auth/providers/credentials";
import NextAuth from 'next-auth';
import type { NextAuthOptions } from 'next-auth';
import bcrypt from 'bcryptjs';
import connectToDatabase from '@/utils/mongodb';
import User from '@/app/models/User';

/**
 * NEXTAUTH CONFIGURATION WITH MONGODB
 * Updated to use MongoDB for user authentication with bcrypt password hashing
 */
const NEXT_AUTH: NextAuthOptions = {
  /**
   * AUTHENTICATION PROVIDERS
   * CredentialsProvider now authenticates against MongoDB
   */
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      
      /**
       * AUTHORIZE FUNCTION - MongoDB Integration
       * Authenticates users against MongoDB database with bcrypt password verification
       * 
       * Flow:
       * 1. Receives email and password from login form
       * 2. Connects to MongoDB
       * 3. Finds user by email
       * 4. Verifies password using bcrypt.compare()
       * 5. Returns user object if valid, null if invalid
       */
      async authorize(credentials) {
        try {
          if (!credentials?.email || !credentials?.password) {
            console.log('❌ Missing credentials');
            return null;
          }

          // Connect to MongoDB
          await connectToDatabase();

          // Find user by email (case-insensitive)
          const user = await User.findOne({ email: credentials.email.toLowerCase() });
          
          if (!user) {
            console.log('❌ User not found:', credentials.email);
            return null;
          }

          // Verify password with bcrypt - SECURE PASSWORD VALIDATION
          const isPasswordValid = await bcrypt.compare(credentials.password, user.password);
          
          if (!isPasswordValid) {
            console.log('❌ Invalid password for:', credentials.email);
            return null;
          }

          console.log('✅ User authenticated successfully:', user.email);

          // Return user object for JWT token creation
          return {
            id: user._id.toString(),
            email: user.email,
            name: user.name,
            role: user.role,
          };
        } catch (error) {
          console.error('❌ Auth error:', error);
          return null;
        }
      }
    })
  ],
  
  /**
   * JWT SECRET
   * Used to sign and verify JWT tokens
   * Should be a long, random string stored in environment variables
   * Critical for security - keeps tokens tamper-proof
   */
  secret: process.env.NEXTAUTH_SECRET,
  
  /**
   * SESSION STRATEGY
   * "jwt" means sessions are stored in encrypted JWT tokens on the client
   * Alternative is "database" which stores sessions server-side
   * 
   * Benefits of JWT:
   * - Stateless (no server-side session storage needed)
   * - Scalable (works across multiple servers)
   * - Fast (no database queries for session validation)
   */
  session: {
    strategy: "jwt",
  },
  
  /**
   * CALLBACKS
   * These functions customize the behavior of JWT and session handling
   * They run at specific points in the authentication lifecycle
   */
  callbacks: {
    /**
     * JWT CALLBACK
     * Called whenever a JWT is created or updated
     * This is where we can add custom data to the token
     * 
     * Flow:
     * 1. Runs after successful login (when user object exists)
     * 2. Runs on every request to refresh/validate the token
     * 3. Custom properties added here are encrypted in the JWT
     * 
     * When it's triggered:
     * - After authorize() succeeds (user object is available)
     * - On subsequent requests (user object is undefined, token persists)
     * 
     * @param token - The JWT token object (contains encrypted session data)
     * @param user - User object from authorize() (only available on initial sign-in)
     * @returns Modified token with custom properties
     */
    async jwt({ token, user }) {
      // Only runs on initial sign-in when user object is available
      if (user) {
        // Add custom properties (name and role) to the JWT token
        // This data will be encrypted and stored in the token
        token.name = user.name;
        token.role = user.role;
      }
      
      // Return the token (with or without modifications)
      // This token is then signed and sent to the client as a cookie
      return token;
    },
    
    /**
     * SESSION CALLBACK
     * Called whenever a session is checked (useSession, getSession, etc.)
     * Transforms the JWT token data into a session object
     * 
     * Flow:
     * 1. Receives the JWT token (decoded)
     * 2. Extracts data from token and adds it to session
     * 3. Returns session object that's accessible in the app
     * 
     * Purpose:
     * - Control what data from JWT is exposed to the client
     * - Add computed properties to session
     * - Sanitize sensitive token data before exposing
     * 
     * @param session - The session object (contains user info for client-side)
     * @param token - The decoded JWT token (contains all encrypted data)
     * @returns Modified session object with data from token
     */
    async session({ session, token }) {
      // Only modify session if user exists in session object
      if (session.user) {
        // Add custom properties from JWT token to session
        // token.name and token.role were set in jwt() callback above
        session.user.name = token.name as string;
        session.user.role = token.role as string;
        
        // token.sub is the user ID (automatically added by NextAuth)
        session.user.id = token.sub as string;
      }
      
      // Return the modified session object
      // This is what useSession() hook will return in components
      return session;
    }
  },
  
  /**
   * CUSTOM PAGES
   * Override default NextAuth pages with custom routes
   * Allows you to use your own login/error pages
   */
  pages: {
    signIn: '/login',
  },
};

/**
 * NEXTAUTH ROUTE HANDLER
 * This creates the API route that handles all authentication requests
 * Routes handled: /api/auth/signin, /api/auth/signout, /api/auth/session, etc.
 * 
 * Export as default is required for Next.js Pages Router API routes
 */

export default NextAuth(NEXT_AUTH);
