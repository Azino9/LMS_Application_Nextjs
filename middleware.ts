import { NextResponse } from "next/server";
import type { NextRequest } from 'next/server';
import { getToken } from "next-auth/jwt";

/**
 * GLOBAL MIDDLEWARE FOR ROUTE PROTECTION
 * 
 * This middleware protects dashboard routes and enforces role-based access control.
 * It runs before every request to protected routes and validates:
 * 1. User authentication status
 * 2. User role permissions
 * 3. Proper route access authorization
 * 
 * Protected Routes:
 * - /admin_dashboard/* - Only accessible by users with role "admin"
 * - /student_dashboard/* - Only accessible by users with role "student"
 * 
 * Security Features:
 * - JWT token validation
 * - Role-based access control
 * - Unauthorized access logging
 * - Automatic redirection for improper access
 */
export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  
  console.log(`🔒 Middleware: Checking access to ${pathname}`);

  try {
    // Extract JWT token from the request
    // Uses the same secret as NextAuth configuration
    const token = await getToken({ 
      req, 
      secret: process.env.NEXTAUTH_SECRET 
    });

    // ==========================================
    // UNAUTHENTICATED USER HANDLING
    // ==========================================
    if (!token) {
      console.log(`❌ UNAUTHORIZED ACCESS: Unauthenticated user attempted to access ${pathname}`);
      console.log(`🔄 REDIRECT: Sending user to /login`);
      
      // Redirect unauthenticated users to login
      // Store the attempted URL for post-login redirect
      const loginUrl = new URL('/login', req.url);
      loginUrl.searchParams.set('callbackUrl', pathname);
      
      return NextResponse.redirect(loginUrl);
    }

    // ==========================================
    // AUTHENTICATED USER - ROLE VALIDATION
    // ==========================================
    const userRole = token.role as string;
    const userEmail = token.email as string;
    
    console.log(`✅ AUTHENTICATED: ${userEmail} (role: ${userRole}) accessing ${pathname}`);

    // ==========================================
    // ADMIN DASHBOARD PROTECTION
    // ==========================================
    if (pathname.startsWith('/admin_dashboard')) {
      if (userRole !== 'admin') {
        console.log(`❌ ROLE MISMATCH: User ${userEmail} (role: ${userRole}) attempted to access admin dashboard`);
        console.log(`🔄 REDIRECT: Sending ${userRole} to appropriate dashboard`);
        
        // Redirect non-admin users to their appropriate dashboard
        if (userRole === 'student') {
          return NextResponse.redirect(new URL('/student_dashboard', req.url));
        } else {
          // For any other role, redirect to login
          return NextResponse.redirect(new URL('/login', req.url));
        }
      }
      
      console.log(`✅ ADMIN ACCESS GRANTED: ${userEmail} accessing admin dashboard`);
      return NextResponse.next();
    }

    // ==========================================
    // STUDENT DASHBOARD PROTECTION
    // ==========================================
    if (pathname.startsWith('/student_dashboard')) {
      if (userRole !== 'student') {
        console.log(`❌ ROLE MISMATCH: User ${userEmail} (role: ${userRole}) attempted to access student dashboard`);
        console.log(`🔄 REDIRECT: Sending ${userRole} to appropriate dashboard`);
        
        // Redirect non-student users to their appropriate dashboard
        if (userRole === 'admin') {
          return NextResponse.redirect(new URL('/admin_dashboard', req.url));
        } else {
          // For any other role, redirect to login
          return NextResponse.redirect(new URL('/login', req.url));
        }
      }
      
      console.log(`✅ STUDENT ACCESS GRANTED: ${userEmail} accessing student dashboard`);
      return NextResponse.next();
    }

    // Default: Allow access to other routes
    return NextResponse.next();
    
  } catch (error) {
    console.error(`❌ MIDDLEWARE ERROR: Failed to validate token for ${pathname}`, error);
    console.log(`🔄 REDIRECT: Error occurred, sending to login page`);
    
    // In case of any error, redirect to login for safety
    return NextResponse.redirect(new URL('/login', req.url));
  }
}

/**
 * MIDDLEWARE CONFIGURATION
 * 
 * The matcher specifies which routes this middleware should run on.
 * Only dashboard routes need protection, so we target:
 * - /admin_dashboard and all sub-routes
 * - /student_dashboard and all sub-routes
 * 
 * This ensures the middleware only runs when necessary, improving performance.
 */
export const config = {
  matcher: [
    '/admin_dashboard/:path*', 
    '/student_dashboard/:path*'
  ],
};
