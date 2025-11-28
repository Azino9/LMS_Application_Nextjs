# NextAuth Multi-Role Authentication System

A production-ready Next.js application demonstrating secure authentication, role-based access control, and session management using NextAuth.js.

## 🚀 Features

- **JWT-Based Authentication** - Stateless, secure token-based auth
- **Multi-Role Support** - Admin, Author, and Consumer roles with different access levels
- **Protected Routes** - Client-side route protection with automatic redirects
- **Role-Based UI** - Components that render conditionally based on user roles
- **Responsive Design** - Mobile-friendly, minimalistic UI with Tailwind CSS
- **Toast Notifications** - Real-time user feedback with react-hot-toast
- **Session Management** - Persistent sessions with `useSession()` hook

## 🛠 Tech Stack

- **Framework:** Next.js 14.x (App Router)
- **Authentication:** NextAuth.js 4.x
- **Language:** TypeScript 5.x
- **Styling:** Tailwind CSS 3.x
- **State Management:** React Hooks
- **Notifications:** react-hot-toast

## 📋 Prerequisites

- Node.js 18.x or higher
- npm or yarn
- Git

## ⚙️ Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd nextjs_auth_workflow
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**

Create a `.env.local` file in the root directory:

```env
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-super-secret-key-min-32-characters
```

Generate a secure secret:
```bash
openssl rand -base64 32
```

4. **Run the development server**
```bash
npm run dev
```

5. **Open your browser**
```
http://localhost:3000
```

## 🔐 Test Credentials

Use these credentials to test different user roles:

| Role | Email | Password | Access |
|------|-------|----------|--------|
| **Admin** | admin@example.com | adminpass | Full access to `/dashboard` |
| **Author** | author@example.com | authorpass | Limited access to `/dashboard` |
| **Consumer** | consumer@example.com | consumerpass | Access to `/consumer` |

## 📁 Project Structure

```
nextjs_auth_workflow/
├── app/                          # Next.js App Router
│   ├── layout.tsx               # Root layout with SessionProvider
│   ├── page.tsx                 # Home page with role-based navigation
│   ├── globals.css              # Global styles
│   ├── dashboard/               
│   │   └── page.tsx             # Admin dashboard (protected)
│   ├── consumer/                
│   │   └── page.tsx             # Consumer dashboard (protected)
│   ├── login/                   
│   │   └── page.tsx             # Login form with role-based redirect
│   └── register/                
│       └── page.tsx             # Registration UI (display only)
├── components/                   
│   ├── ProtectedButton.tsx      # Admin-only UI component
│   └── providers/               
│       └── SessionProvider.tsx  # Auth context wrapper
├── pages/                        
│   └── api/                     
│       └── auth/                
│           └── [...nextauth].tsx # NextAuth configuration & API route
├── types/                        
│   └── next-auth.d.ts           # TypeScript type extensions for NextAuth
├── .env.local                   # Environment variables (gitignored)
├── package.json                 # Project dependencies
├── next.config.ts               # Next.js configuration
├── tailwind.config.js           # Tailwind CSS configuration
├── tsconfig.json                # TypeScript configuration
└── README.md                    # This file
```

## 🎯 Key Features Explained

### 1. JWT-Based Authentication

NextAuth.js uses JWT tokens stored as HTTP-only cookies for stateless authentication.

**Flow:**
1. User submits credentials → `authorize()` validates
2. JWT token created with custom data (name, role)
3. Token encrypted and stored as secure cookie
4. Client accesses session via `useSession()` hook

**Implementation in `pages/api/auth/[...nextauth].tsx`:**
```typescript
callbacks: {
  async jwt({ token, user }) {
    if (user) {
      token.name = user.name;
      token.role = user.role;
    }
    return token;
  },
  async session({ session, token }) {
    session.user.name = token.name;
    session.user.role = token.role;
    session.user.id = token.sub;
    return session;
  }
}
```

### 2. Role-Based Access Control (RBAC)

Protected routes verify user roles before rendering content.

**Pattern used in `app/dashboard/page.tsx`:**
```typescript
const { data: session, status } = useSession();

useEffect(() => {
  if (status === 'loading') return;
  
  if (!session || session.user.role !== 'admin') {
    router.push('/login');
  }
}, [session, status, router]);
```

### 3. Role-Based Redirects

After login, users are automatically redirected to their appropriate dashboard.

**Implementation in `app/login/page.tsx`:**
```typescript
const response = await fetch('/api/auth/session');
const session = await response.json();

let redirectUrl = '/dashboard'; // default for admin
if (session?.user?.role === 'consumer') {
  redirectUrl = '/consumer';
}
window.location.href = redirectUrl;
```

### 4. Conditional UI Rendering

Components like `ProtectedButton` only render for specific roles.

```typescript
export default function ProtectedButton() {
  const { data: session, status } = useSession();
  
  if (status === 'loading' || session?.user?.role !== 'admin') {
    return null; // Don't render for non-admin users
  }
  
  return <button>Admin Controls</button>;
}
```

## 🎨 Design System

### Admin Dashboard
- **Theme:** Blue minimalistic
- **Primary Color:** Blue-600
- **Features:** User management, Settings, Analytics
- **Route:** `/dashboard`

### Consumer Dashboard
- **Theme:** Green minimalistic
- **Primary Color:** Green-600
- **Features:** Browse, Saved items, History
- **Route:** `/consumer`

### UI Components
- Clean white cards with gray borders
- Subtle shadows and smooth transitions
- Responsive grid layouts
- Icon-based navigation

## 🔒 Security Features

- ✅ **JWT Encryption** - Tokens signed with secret key
- ✅ **HTTP-Only Cookies** - Prevents XSS attacks
- ✅ **Environment Variables** - Secrets stored securely
- ✅ **Route Protection** - Unauthorized access blocked
- ✅ **Role Verification** - Server and client-side checks

## 🧪 Testing

### Login Flow Test
1. Navigate to `/login`
2. Enter admin credentials
3. Verify redirect to `/dashboard`
4. Open browser console (F12)
5. Check for session verification logs:
```
=== SESSION VERIFICATION ===
User details: {
  name: "admin",
  email: "admin@example.com",
  role: "admin",
  id: "1"
}
```

### Role-Based Access Test
1. Log in as consumer
2. Try accessing `/dashboard` directly
3. Verify automatic redirect to `/login`
4. Access `/consumer` - should work
5. Verify ProtectedButton doesn't appear

### Session Persistence Test
1. Log in as any user
2. Refresh the page
3. Verify you remain logged in
4. Check session data persists

## 📚 API Routes

### Authentication Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/auth/signin` | POST | Sign in with credentials |
| `/api/auth/signout` | POST | Sign out current user |
| `/api/auth/session` | GET | Get current session |
| `/api/auth/csrf` | GET | Get CSRF token |

All endpoints are automatically created by NextAuth.js.

## 🚀 Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Import project in Vercel
3. Add environment variables:
   - `NEXTAUTH_URL`: Your production URL
   - `NEXTAUTH_SECRET`: Generate new secret for production
4. Deploy

### Environment Variables for Production

```env
NEXTAUTH_URL=https://your-domain.com
NEXTAUTH_SECRET=<generate-new-secret-for-production>
```

## 📝 Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
```

## 🐛 Troubleshooting

### Issue: Session is undefined
**Solution:** Ensure `SessionProvider` wraps your app in `layout.tsx`

### Issue: Redirect loop on protected routes
**Solution:** Check role verification logic in `useEffect`

### Issue: NEXTAUTH_SECRET error
**Solution:** Generate a new secret and add to `.env.local`

### Issue: Toast notifications not showing
**Solution:** Verify `react-hot-toast` is installed and `<Toaster />` is in component

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 👨‍💻 Author

Created as a demonstration of NextAuth.js authentication patterns with role-based access control.

## 🙏 Acknowledgments

- [NextAuth.js](https://next-auth.js.org) - Authentication library
- [Next.js](https://nextjs.org) - React framework
- [Tailwind CSS](https://tailwindcss.com) - CSS framework
- [react-hot-toast](https://react-hot-toast.com) - Toast notifications

## 📞 Support

For issues or questions:
- Check [NextAuth.js Documentation](https://next-auth.js.org/getting-started/introduction)
- Review [Next.js App Router Docs](https://nextjs.org/docs/app)
- Search [Stack Overflow](https://stackoverflow.com/questions/tagged/next-auth)

---

**Built with ❤️ using Next.js and NextAuth.js**
