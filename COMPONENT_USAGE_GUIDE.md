# UI Component Usage Guide

Complete guide for using the reusable UI components in this project.

## Quick Import

```javascript
// UI Components
import { Button, Input, Card, Badge, LoadingSpinner, Avatar } from '@/components/ui';

// Layout Components
import { Navbar, Footer, DashboardLayout, AuthLayout } from '@/components/layouts';

// Dashboard Components
import { StatsCard, SessionInfo, RoleCard } from '@/components/dashboard';
```

---

## UI Components

### Button

Reusable button component with multiple variants and states.

**Import:**
```javascript
import Button from '@/components/ui/Button';
```

**Usage:**
```jsx
// Primary button
<Button variant="primary" size="md">
  Click Me
</Button>

// Secondary button
<Button variant="secondary" size="sm">
  Cancel
</Button>

// Loading state
<Button variant="primary" loading disabled>
  Submitting...
</Button>

// Full width
<Button variant="primary" fullWidth>
  Sign In
</Button>
```

**Props:**
- `variant`: 'primary' | 'secondary' | 'ghost' | 'danger' (default: 'primary')
- `size`: 'sm' | 'md' | 'lg' (default: 'md')
- `loading`: boolean (default: false)
- `disabled`: boolean (default: false)
- `fullWidth`: boolean (default: false)
- `children`: ReactNode
- `className`: string
- All button HTML attributes

---

### Input

Input field component with label and error handling.

**Import:**
```javascript
import Input from '@/components/ui/Input';
```

**Usage:**
```jsx
// Basic input
<Input
  label="Email"
  type="email"
  placeholder="Enter your email"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
/>

// Input with error
<Input
  label="Password"
  type="password"
  value={password}
  onChange={(e) => setPassword(e.target.value)}
  error="Password must be at least 8 characters"
/>

// Required input
<Input
  label="Username"
  type="text"
  required
/>
```

**Props:**
- `label`: string
- `type`: 'text' | 'email' | 'password' | 'number' (default: 'text')
- `error`: string
- `required`: boolean (default: false)
- `disabled`: boolean (default: false)
- `placeholder`: string
- `className`: string
- All input HTML attributes

---

### Card

Container component for content sections.

**Import:**
```javascript
import Card, { CardHeader, CardBody } from '@/components/ui/Card';
```

**Usage:**
```jsx
// Simple card
<Card>
  <p>Card content here</p>
</Card>

// Card with header and footer
<Card header="Card Title" footer={<Button>Action</Button>}>
  <p>Main content</p>
</Card>

// Interactive card (clickable)
<Card interactive onClick={() => console.log('Clicked')}>
  <p>Click me!</p>
</Card>

// Using sub-components
<Card>
  <CardHeader>
    <h3>Custom Header</h3>
  </CardHeader>
  <CardBody>
    <p>Body content</p>
  </CardBody>
</Card>
```

**Props:**
- `header`: ReactNode | string
- `footer`: ReactNode
- `interactive`: boolean (default: false)
- `onClick`: function
- `children`: ReactNode
- `className`: string

---

### Badge

Badge/pill component for status and labels.

**Import:**
```javascript
import Badge, { RoleBadge, StatusBadge } from '@/components/ui/Badge';
```

**Usage:**
```jsx
// Basic badge
<Badge variant="blue" size="md">
  New
</Badge>

// Role badge (pre-configured)
<RoleBadge role="admin" size="sm" />

// Status badge (pre-configured)
<StatusBadge status="active" size="md" />
```

**Props:**
- `variant`: 'blue' | 'green' | 'purple' | 'gray' | 'red' | 'yellow' | 'emerald' (default: 'gray')
- `size`: 'sm' | 'md' | 'lg' (default: 'md')
- `children`: ReactNode
- `className`: string

**RoleBadge Props:**
- `role`: 'admin' | 'author' | 'consumer'
- `size`: 'sm' | 'md' | 'lg'

**StatusBadge Props:**
- `status`: 'active' | 'inactive' | 'pending' | 'error'
- `size`: 'sm' | 'md' | 'lg'

---

### LoadingSpinner

Loading indicator component.

**Import:**
```javascript
import LoadingSpinner, { InlineSpinner } from '@/components/ui/LoadingSpinner';
```

**Usage:**
```jsx
// Basic spinner
<LoadingSpinner size="md" />

// Spinner with text
<LoadingSpinner size="lg" text="Loading data..." />

// Full screen spinner
<LoadingSpinner fullScreen size="xl" text="Please wait..." />

// Inline spinner for buttons
<InlineSpinner size="sm" />
```

**Props:**
- `size`: 'sm' | 'md' | 'lg' | 'xl' (default: 'md')
- `text`: string
- `fullScreen`: boolean (default: false)
- `className`: string

---

### Avatar

User avatar component with initials fallback.

**Import:**
```javascript
import Avatar, { AvatarGroup } from '@/components/ui/Avatar';
```

**Usage:**
```jsx
// Avatar with initials
<Avatar name="John Doe" size="md" />

// Avatar with image
<Avatar src="/images/user.jpg" name="John Doe" size="lg" />

// Avatar group
<AvatarGroup
  users={[
    { name: 'John Doe', image: '/user1.jpg' },
    { name: 'Jane Smith', image: '/user2.jpg' },
    { name: 'Bob Johnson' }
  ]}
  max={3}
  size="md"
/>
```

**Props:**
- `src`: string (image URL)
- `name`: string (used for initials)
- `size`: 'xs' | 'sm' | 'md' | 'lg' | 'xl' (default: 'md')
- `alt`: string
- `className`: string

**AvatarGroup Props:**
- `users`: array of { name, image? }
- `max`: number (default: 3)
- `size`: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
- `className`: string

---

## Layout Components

### Navbar

Main navigation bar with user menu.

**Import:**
```javascript
import Navbar from '@/components/layouts/Navbar';
```

**Usage:**
```jsx
<Navbar />
```

**Features:**
- Logo and branding
- Navigation links (Home, Dashboard)
- User avatar and info
- Sign in/out functionality
- Mobile responsive with hamburger menu
- Shows user role badge

---

### Footer

Page footer with links and copyright.

**Import:**
```javascript
import Footer from '@/components/layouts/Footer';
```

**Usage:**
```jsx
// Full footer
<Footer />

// Minimal footer (copyright only)
<Footer minimal />
```

**Props:**
- `minimal`: boolean (default: false)

---

### DashboardLayout

Protected layout for dashboard pages.

**Import:**
```javascript
import DashboardLayout from '@/components/layouts/DashboardLayout';
```

**Usage:**
```jsx
// In a dashboard page
export default function DashboardPage() {
  return (
    <DashboardLayout
      title="Dashboard"
      description="Welcome to your dashboard"
    >
      {/* Your dashboard content */}
    </DashboardLayout>
  );
}
```

**Props:**
- `children`: ReactNode (required)
- `title`: string
- `description`: string
- `maxWidth`: string (default: '7xl')
- `showFooter`: boolean (default: true)

**Features:**
- Automatic authentication check
- Redirects unauthenticated users to login
- Includes Navbar and Footer
- Loading state
- Consistent page structure

---

### AuthLayout

Layout for authentication pages (login, register).

**Import:**
```javascript
import AuthLayout from '@/components/layouts/AuthLayout';
```

**Usage:**
```jsx
// In login/register pages
export default function LoginPage() {
  return (
    <AuthLayout
      title="Sign In"
      subtitle="Welcome back! Please enter your credentials."
    >
      {/* Your login form */}
    </AuthLayout>
  );
}
```

**Props:**
- `children`: ReactNode (required)
- `title`: string
- `subtitle`: string

**Features:**
- Centered card design
- Logo header
- Gradient background
- Redirects authenticated users to dashboard
- Minimal footer
- Terms and Privacy links

---

## Dashboard Components

### StatsCard

Display statistical data with icon and trend.

**Import:**
```javascript
import StatsCard, { StatsCardSkeleton } from '@/components/dashboard/StatsCard';
```

**Usage:**
```jsx
// Basic stats card
<StatsCard
  title="Total Users"
  value="1,234"
  icon={
    <svg>...</svg>
  }
/>

// With trend indicator
<StatsCard
  title="Revenue"
  value="$45,678"
  trend="+12.5%"
  trendUp={true}
  bgColor="bg-blue-50"
  iconColor="text-blue-600"
/>

// Loading skeleton
<StatsCardSkeleton />
```

**Props:**
- `title`: string (required)
- `value`: string | number (required)
- `icon`: ReactNode
- `trend`: string (e.g., "+12.5%")
- `trendUp`: boolean (default: true)
- `bgColor`: string (default: 'bg-blue-50')
- `iconColor`: string (default: 'text-blue-600')

---

### SessionInfo

Display current user session information.

**Import:**
```javascript
import SessionInfo, { SessionInfoSkeleton } from '@/components/dashboard/SessionInfo';
```

**Usage:**
```jsx
// Basic session info
<SessionInfo />

// With login time
<SessionInfo showLoginTime />

// Without status indicator
<SessionInfo showStatus={false} />

// Loading skeleton
<SessionInfoSkeleton />
```

**Props:**
- `showStatus`: boolean (default: true)
- `showLoginTime`: boolean (default: false)

**Features:**
- User avatar
- Name and email
- Role badge
- Session status (Active)
- User ID and role details
- Loading skeleton

---

### RoleCard

Display role information with permissions.

**Import:**
```javascript
import RoleCard, { RoleCardGrid } from '@/components/dashboard/RoleCard';
```

**Usage:**
```jsx
// Single role card
<RoleCard
  role="admin"
  icon="👑"
  description="Full system access"
  permissions={[
    'Manage users',
    'Access admin dashboard',
    'Configure settings'
  ]}
/>

// Role card grid (shows all roles)
<RoleCardGrid />

// Custom roles grid
<RoleCardGrid roles={[
  {
    role: 'admin',
    icon: '👑',
    description: 'Administrator access',
    permissions: ['Manage all', 'View all']
  }
]} />
```

**Props (RoleCard):**
- `role`: string (required)
- `description`: string
- `permissions`: array of strings
- `icon`: ReactNode

**Props (RoleCardGrid):**
- `roles`: array of role objects (uses defaults if not provided)

---

## Complete Page Example

```jsx
'use client';

import { useState } from 'react';
import DashboardLayout from '@/components/layouts/DashboardLayout';
import { Button, Input, Card } from '@/components/ui';
import { StatsCard, SessionInfo, RoleCard } from '@/components/dashboard';

export default function DashboardPage() {
  const [loading, setLoading] = useState(false);

  return (
    <DashboardLayout
      title="Dashboard"
      description="Welcome to your personalized dashboard"
    >
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <StatsCard
          title="Total Users"
          value="1,234"
          trend="+12.5%"
          trendUp={true}
        />
        <StatsCard
          title="Active Sessions"
          value="456"
          trend="+8.2%"
          trendUp={true}
        />
        <StatsCard
          title="Revenue"
          value="$78,910"
          trend="-3.1%"
          trendUp={false}
        />
      </div>

      {/* Session Info */}
      <div className="mb-8">
        <SessionInfo showStatus showLoginTime />
      </div>

      {/* Custom Card */}
      <Card header="Quick Actions">
        <div className="space-y-4">
          <Input
            label="Search"
            placeholder="Search for something..."
          />
          <Button
            variant="primary"
            loading={loading}
            onClick={() => setLoading(true)}
          >
            Search
          </Button>
        </div>
      </Card>
    </DashboardLayout>
  );
}
```

---

## Styling Guide

All components use Tailwind CSS classes. You can extend styling using the `className` prop:

```jsx
<Button className="mt-4 shadow-lg">
  Custom Styled Button
</Button>

<Card className="border-2 border-blue-500">
  Custom Card
</Card>
```

---

## Accessibility

All components follow accessibility best practices:
- Semantic HTML elements
- ARIA labels where needed
- Keyboard navigation support
- Focus states
- Screen reader friendly
- Color contrast compliance

---

## Responsive Design

Components are mobile-first and fully responsive:
- `sm`: 640px+
- `md`: 768px+
- `lg`: 1024px+
- `xl`: 1280px+
- `2xl`: 1536px+

Example:
```jsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  {/* Responsive grid */}
</div>
```
