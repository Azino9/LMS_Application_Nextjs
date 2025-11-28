# UI Component Plan - NextAuth Authentication System

## 📋 Project Overview
A comprehensive UI architecture for a multi-role authentication system with reusable components, consistent styling, and responsive design using Tailwind CSS.

---

## 🎯 Component Classification

### 1. Layout Components
Components that define page structure and provide consistent layout across the application.

| Component | Path | Purpose | Props |
|-----------|------|---------|-------|
| **RootLayout** | `app/layout.tsx` | Main app wrapper with providers | `children` |
| **DashboardLayout** | `components/layouts/DashboardLayout.jsx` | Common layout for dashboards | `children, title, user` |
| **AuthLayout** | `components/layouts/AuthLayout.jsx` | Layout for login/register pages | `children, title` |
| **Navbar** | `components/layouts/Navbar.jsx` | Top navigation bar | `user, isAuthenticated` |
| **Sidebar** | `components/layouts/Sidebar.jsx` | Side navigation (future) | `items, activeItem` |
| **Footer** | `components/layouts/Footer.jsx` | Page footer with links | `minimal` |

### 2. Reusable UI Components
Small, reusable components used throughout the application.

| Component | Path | Purpose | Props |
|-----------|------|---------|-------|
| **Button** | `components/ui/Button.jsx` | Primary button | `variant, size, disabled, onClick, children` |
| **Input** | `components/ui/Input.jsx` | Text input field | `type, placeholder, value, onChange, error` |
| **Card** | `components/ui/Card.jsx` | Container card | `children, className, hover` |
| **Badge** | `components/ui/Badge.jsx` | Status/role badge | `variant, children` |
| **Avatar** | `components/ui/Avatar.jsx` | User avatar | `name, src, size` |
| **LoadingSpinner** | `components/ui/LoadingSpinner.jsx` | Loading indicator | `size, color` |
| **Alert** | `components/ui/Alert.jsx` | Alert messages | `type, message, dismissible` |
| **Modal** | `components/ui/Modal.jsx` | Modal dialog | `isOpen, onClose, title, children` |

### 3. Feature Components
Components specific to authentication features.

| Component | Path | Purpose | Props |
|-----------|------|---------|-------|
| **LoginForm** | `components/auth/LoginForm.jsx` | Login form | `onSubmit, isLoading` |
| **RegisterForm** | `components/auth/RegisterForm.jsx` | Registration form | `onSubmit, isLoading` |
| **PasswordInput** | `components/auth/PasswordInput.jsx` | Password with toggle | `value, onChange, error` |
| **RoleCard** | `components/dashboard/RoleCard.jsx` | Role display card | `role, description` |
| **StatsCard** | `components/dashboard/StatsCard.jsx` | Statistics card | `title, value, icon` |
| **ProtectedButton** | `components/auth/ProtectedButton.jsx` | Role-based button | `role, children, onClick` |

### 4. Page Components
Full page implementations.

| Component | Path | Purpose | Protected |
|-----------|------|---------|-----------|
| **HomePage** | `app/page.tsx` | Landing page | No |
| **LoginPage** | `app/login/page.tsx` | Login page | No |
| **RegisterPage** | `app/register/page.tsx` | Registration page | No |
| **AdminDashboard** | `app/dashboard/page.tsx` | Admin dashboard | Yes (Admin) |
| **ConsumerDashboard** | `app/consumer/page.tsx` | Consumer dashboard | Yes (Consumer) |

---

## 📁 File Structure

```
nextjs_auth_workflow/
├── app/
│   ├── layout.tsx                    # Root layout with providers
│   ├── page.tsx                      # Home page
│   ├── globals.css                   # Global styles
│   ├── dashboard/
│   │   └── page.tsx                  # Admin dashboard page
│   ├── consumer/
│   │   └── page.tsx                  # Consumer dashboard page
│   ├── login/
│   │   └── page.tsx                  # Login page
│   └── register/
│       └── page.tsx                  # Register page
│
├── components/
│   ├── layouts/                      # Layout components
│   │   ├── Navbar.jsx               # Navigation bar
│   │   ├── Footer.jsx               # Page footer
│   │   ├── DashboardLayout.jsx      # Dashboard layout wrapper
│   │   └── AuthLayout.jsx           # Auth pages layout
│   │
│   ├── ui/                          # Reusable UI components
│   │   ├── Button.jsx               # Button component
│   │   ├── Input.jsx                # Input field
│   │   ├── Card.jsx                 # Card container
│   │   ├── Badge.jsx                # Badge/pill
│   │   ├── Avatar.jsx               # User avatar
│   │   ├── LoadingSpinner.jsx       # Loading spinner
│   │   ├── Alert.jsx                # Alert messages
│   │   └── Modal.jsx                # Modal dialog
│   │
│   ├── auth/                        # Authentication components
│   │   ├── LoginForm.jsx            # Login form
│   │   ├── RegisterForm.jsx         # Register form
│   │   ├── PasswordInput.jsx        # Password input with toggle
│   │   └── ProtectedButton.jsx      # Role-based button
│   │
│   ├── dashboard/                   # Dashboard components
│   │   ├── StatsCard.jsx            # Statistics card
│   │   ├── RoleCard.jsx             # Role display card
│   │   └── SessionInfo.jsx          # Session information display
│   │
│   └── providers/                   # Context providers
│       └── SessionProvider.jsx      # NextAuth session provider
│
├── pages/
│   └── api/
│       └── auth/
│           └── [...nextauth].tsx    # NextAuth API route
│
├── types/
│   └── next-auth.d.ts               # NextAuth type definitions
│
└── ui-plan.md                       # This file
```

---

## 🎨 Design System

### Color Palette

#### Primary Colors
```css
/* Admin Theme - Blue */
--admin-primary: #2563eb     /* blue-600 */
--admin-light: #dbeafe       /* blue-50 */
--admin-dark: #1e40af        /* blue-800 */

/* Consumer Theme - Green */
--consumer-primary: #16a34a   /* green-600 */
--consumer-light: #dcfce7     /* green-50 */
--consumer-dark: #15803d      /* green-800 */

/* Neutral Colors */
--gray-50: #f9fafb
--gray-100: #f3f4f6
--gray-200: #e5e7eb
--gray-600: #4b5563
--gray-900: #111827
```

#### Status Colors
```css
--success: #10b981   /* green-500 */
--error: #ef4444     /* red-500 */
--warning: #f59e0b   /* amber-500 */
--info: #3b82f6      /* blue-500 */
```

### Typography Scale

| Element | Tailwind Class | Size | Weight |
|---------|---------------|------|--------|
| H1 | `text-4xl` | 36px | 700 (bold) |
| H2 | `text-3xl` | 30px | 700 (bold) |
| H3 | `text-2xl` | 24px | 600 (semibold) |
| H4 | `text-xl` | 20px | 600 (semibold) |
| Body | `text-base` | 16px | 400 (normal) |
| Small | `text-sm` | 14px | 400 (normal) |
| Tiny | `text-xs` | 12px | 400 (normal) |

### Spacing System

Using Tailwind's default spacing scale (0.25rem = 4px):
- **Micro:** `p-1` (4px)
- **Small:** `p-2` (8px)
- **Medium:** `p-4` (16px)
- **Large:** `p-6` (24px)
- **XLarge:** `p-8` (32px)

### Border Radius

- **Small:** `rounded-md` (6px)
- **Medium:** `rounded-lg` (8px)
- **Large:** `rounded-xl` (12px)
- **XLarge:** `rounded-2xl` (16px)
- **Full:** `rounded-full` (9999px)

### Shadows

- **Small:** `shadow-sm`
- **Medium:** `shadow-md`
- **Large:** `shadow-lg`
- **XLarge:** `shadow-xl`

---

## 📱 Responsive Breakpoints

Following Tailwind CSS defaults:

| Breakpoint | Min Width | Prefix | Usage |
|------------|-----------|--------|-------|
| Mobile | 0px | (default) | Base mobile styles |
| SM | 640px | `sm:` | Large phones |
| MD | 768px | `md:` | Tablets |
| LG | 1024px | `lg:` | Laptops |
| XL | 1280px | `xl:` | Desktops |
| 2XL | 1536px | `2xl:` | Large screens |

---

## 🔧 Component Specifications

### 1. Button Component

**Variants:**
- `primary` - Solid colored button (default)
- `secondary` - Outlined button
- `ghost` - Transparent button
- `danger` - Red button for destructive actions

**Sizes:**
- `sm` - Small (py-2 px-3 text-sm)
- `md` - Medium (py-3 px-4 text-base) [default]
- `lg` - Large (py-4 px-6 text-lg)

**States:**
- Normal
- Hover (darker shade)
- Active (slightly darker)
- Disabled (opacity-50, cursor-not-allowed)
- Loading (with spinner)

**Example Usage:**
```jsx
<Button variant="primary" size="md" onClick={handleClick}>
  Sign In
</Button>
```

### 2. Input Component

**Types:**
- `text` - Text input (default)
- `email` - Email input
- `password` - Password input
- `number` - Number input

**States:**
- Default
- Focused (ring border)
- Error (red border + error message)
- Disabled (gray background)

**Features:**
- Label support
- Error message display
- Icon support (left/right)
- Character counter (optional)

**Example Usage:**
```jsx
<Input
  type="email"
  label="Email Address"
  placeholder="you@example.com"
  value={email}
  onChange={setEmail}
  error={emailError}
/>
```

### 3. Card Component

**Variants:**
- `default` - White background, border
- `hover` - Adds hover shadow effect
- `interactive` - Clickable with cursor-pointer

**Features:**
- Optional header/footer sections
- Padding options
- Shadow variants

**Example Usage:**
```jsx
<Card hover className="p-6">
  <h3 className="text-xl font-semibold">Card Title</h3>
  <p className="text-gray-600">Card content</p>
</Card>
```

### 4. Badge Component

**Variants:**
- `blue` - Admin role
- `green` - Consumer role
- `purple` - Author role
- `gray` - Default/inactive
- `red` - Error/warning
- `yellow` - Pending

**Sizes:**
- `sm` - Small (text-xs px-2 py-0.5)
- `md` - Medium (text-sm px-2.5 py-0.5) [default]
- `lg` - Large (text-base px-3 py-1)

**Example Usage:**
```jsx
<Badge variant="blue">Admin</Badge>
```

### 5. Navbar Component

**Features:**
- Logo/brand section
- Navigation links (desktop)
- User menu dropdown
- Mobile hamburger menu
- Sign out button
- Responsive layout

**Sections:**
- Left: Logo + Navigation
- Right: User info + Actions

**States:**
- Desktop (full navigation)
- Mobile (hamburger menu)
- Authenticated (show user menu)
- Unauthenticated (show sign in button)

### 6. Footer Component

**Sections:**
- Left: Copyright/brand
- Center: Navigation links
- Right: Social links

**Variants:**
- `default` - Full footer with all sections
- `minimal` - Only copyright

### 7. DashboardLayout Component

**Structure:**
```
┌─────────────────────────────────┐
│          Navbar                 │
├─────────────────────────────────┤
│                                 │
│         Page Content            │
│         (children)              │
│                                 │
└─────────────────────────────────┘
```

**Features:**
- Consistent navbar
- Content area with max-width
- Padding and spacing
- Role-based styling

### 8. AuthLayout Component

**Structure:**
```
┌─────────────────────────────────┐
│                                 │
│         Centered Card           │
│      ┌───────────────┐         │
│      │               │         │
│      │    Form       │         │
│      │  (children)   │         │
│      │               │         │
│      └───────────────┘         │
│                                 │
└─────────────────────────────────┘
```

**Features:**
- Centered form card
- Gradient background
- Responsive sizing
- Optional header/footer

---

## 🎭 Animation & Transitions

### Standard Transitions
```css
transition-all duration-200 ease-in-out
```

### Hover Effects
- **Buttons:** Scale slightly + darken
  ```css
  hover:scale-[1.02] hover:shadow-lg
  ```
- **Cards:** Add shadow
  ```css
  hover:shadow-md
  ```
- **Links:** Change color
  ```css
  hover:text-blue-600
  ```

### Loading States
- **Spinner:** Rotating animation
- **Skeleton:** Pulse animation
  ```css
  animate-pulse
  ```

---

## ♿ Accessibility Guidelines

### Focus States
All interactive elements must have visible focus states:
```css
focus:ring-2 focus:ring-blue-500 focus:outline-none
```

### ARIA Labels
- Use `aria-label` for icon-only buttons
- Use `role` attributes appropriately
- Ensure form inputs have associated labels

### Keyboard Navigation
- Tab order follows logical flow
- Enter/Space activates buttons
- Escape closes modals

### Color Contrast
- Minimum 4.5:1 ratio for normal text
- Minimum 3:1 ratio for large text
- Test with WCAG standards

---

## 📦 Component Dependencies

### External Dependencies
- **NextAuth.js** - Session management
- **react-hot-toast** - Notifications
- **Tailwind CSS** - Styling

### Internal Dependencies
```
Button
  └─ LoadingSpinner (when loading)

Input
  └─ Alert (for error messages)

Navbar
  ├─ Avatar
  ├─ Badge
  └─ Button

DashboardLayout
  └─ Navbar
  
Card
  └─ (no dependencies)

LoginForm
  ├─ Input
  ├─ PasswordInput
  ├─ Button
  └─ Alert
```

---

## 🔄 State Management

### Component State
Use React hooks for local state:
- `useState` - Component state
- `useEffect` - Side effects
- `useRouter` - Navigation
- `useSession` - Auth state

### Global State
- **Session:** Managed by NextAuth SessionProvider
- **Toasts:** Managed by react-hot-toast

---

## 🚀 Implementation Priority

### Phase 1: Core UI Components (High Priority)
1. ✅ Button
2. ✅ Input
3. ✅ Card
4. ✅ Badge
5. ✅ LoadingSpinner

### Phase 2: Layout Components (High Priority)
1. ✅ Navbar
2. ✅ Footer
3. ✅ DashboardLayout
4. ✅ AuthLayout

### Phase 3: Feature Components (Medium Priority)
1. ✅ LoginForm (exists, needs refactor)
2. ✅ PasswordInput (exists in LoginForm)
3. ✅ StatsCard
4. ✅ SessionInfo

### Phase 4: Advanced Components (Low Priority)
1. ⏳ Modal
2. ⏳ Avatar (basic version exists)
3. ⏳ Sidebar
4. ⏳ Alert (using toast for now)

---

## 📊 Testing Strategy

### Visual Testing
- Test on different screen sizes (mobile, tablet, desktop)
- Test in different browsers (Chrome, Firefox, Safari)
- Verify dark mode support (future)

### Functional Testing
- Test all button states (hover, active, disabled)
- Test form validation
- Test navigation flow
- Test role-based rendering

### Accessibility Testing
- Use keyboard navigation only
- Test with screen reader
- Verify color contrast
- Check focus indicators

---

## 📈 Future Enhancements

### Phase 5: Advanced Features
1. **Dark Mode Support**
   - Add theme toggle
   - Update color palette
   - Persist user preference

2. **Animations**
   - Page transitions
   - Loading skeletons
   - Micro-interactions

3. **Advanced Components**
   - Data tables
   - Charts/graphs
   - File upload
   - Rich text editor

4. **Performance**
   - Lazy loading
   - Code splitting
   - Image optimization

---

## 📝 Notes

### Design Principles
1. **Consistency** - Use the same patterns across the app
2. **Simplicity** - Keep components simple and focused
3. **Reusability** - Design for reuse from the start
4. **Accessibility** - Make it usable for everyone
5. **Responsiveness** - Mobile-first approach

### Best Practices
- Use semantic HTML elements
- Keep components small and focused
- Separate logic from presentation
- Document props and usage
- Write reusable, maintainable code

---

**Document Version:** 1.0.0  
**Last Updated:** November 21, 2025  
**Status:** Active Development
