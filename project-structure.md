# Phase 1: User & Company Management UI

## PROJECT FOLDER STRUCTURE

```
esg-platform/
│
├── prisma/
│   ├── schema.prisma                 # Database schema
│   ├── migrations/                   # Migration files
│   └── seed.ts                       # Seed data script
│
├── public/
│   ├── images/
│   │   ├── logo.svg
│   │   └── default-avatar.png
│   └── favicon.ico
│
├── src/
│   │
│   ├── app/                          # Next.js App Router
│   │   │
│   │   ├── (auth)/                   # Auth layout group
│   │   │   ├── layout.tsx            # Auth pages layout
│   │   │   ├── login/
│   │   │   │   └── page.tsx          # Login page
│   │   │   ├── register/
│   │   │   │   └── page.tsx          # Registration page
│   │   │   ├── forgot-password/
│   │   │   │   └── page.tsx          # Forgot password page
│   │   │   └── reset-password/
│   │   │       └── page.tsx          # Reset password page
│   │   │
│   │   ├── (dashboard)/              # Dashboard layout group
│   │   │   ├── layout.tsx            # Dashboard layout with sidebar
│   │   │   ├── dashboard/
│   │   │   │   └── page.tsx          # Dashboard home
│   │   │   ├── company/
│   │   │   │   ├── page.tsx          # Company profile view
│   │   │   │   └── edit/
│   │   │   │       └── page.tsx      # Company edit page
│   │   │   ├── users/
│   │   │   │   ├── page.tsx          # User list page
│   │   │   │   ├── [id]/
│   │   │   │   │   └── page.tsx      # User detail page
│   │   │   │   └── invite/
│   │   │   │       └── page.tsx      # Invite user page
│   │   │   └── profile/
│   │   │       └── page.tsx          # User profile settings
│   │   │
│   │   ├── api/                      # API Routes
│   │   │   ├── auth/
│   │   │   │   ├── login/
│   │   │   │   │   └── route.ts
│   │   │   │   ├── register/
│   │   │   │   │   └── route.ts
│   │   │   │   ├── logout/
│   │   │   │   │   └── route.ts
│   │   │   │   ├── session/
│   │   │   │   │   └── route.ts
│   │   │   │   ├── forgot-password/
│   │   │   │   │   └── route.ts
│   │   │   │   └── reset-password/
│   │   │   │       └── route.ts
│   │   │   │
│   │   │   ├── companies/
│   │   │   │   ├── route.ts          # GET (list), POST (create)
│   │   │   │   └── [id]/
│   │   │   │       └── route.ts      # GET, PUT, DELETE
│   │   │   │
│   │   │   └── users/
│   │   │       ├── route.ts          # GET (list), POST (create)
│   │   │       ├── invite/
│   │   │       │   └── route.ts      # POST invite
│   │   │       └── [id]/
│   │   │           ├── route.ts      # GET, PUT, DELETE
│   │   │           └── reset-password/
│   │   │               └── route.ts  # POST
│   │   │
│   │   ├── layout.tsx                # Root layout
│   │   └── page.tsx                  # Landing/redirect page
│   │
│   ├── components/
│   │   │
│   │   ├── auth/                     # Authentication components
│   │   │   ├── LoginForm.tsx
│   │   │   ├── RegisterForm.tsx
│   │   │   ├── ForgotPasswordForm.tsx
│   │   │   ├── ResetPasswordForm.tsx
│   │   │   └── AuthGuard.tsx         # Protected route wrapper
│   │   │
│   │   ├── company/                  # Company components
│   │   │   ├── CompanyProfile.tsx
│   │   │   ├── CompanyEditForm.tsx
│   │   │   ├── CompanyCard.tsx
│   │   │   ├── CompanyDeleteDialog.tsx
│   │   │   └── CompanyStats.tsx
│   │   │
│   │   ├── users/                    # User components
│   │   │   ├── UserTable.tsx
│   │   │   ├── UserRow.tsx
│   │   │   ├── UserCard.tsx
│   │   │   ├── InviteUserDialog.tsx
│   │   │   ├── EditUserDialog.tsx
│   │   │   ├── DeleteUserDialog.tsx
│   │   │   ├── UserRoleBadge.tsx
│   │   │   ├── UserStatusBadge.tsx
│   │   │   └── UserActionsMenu.tsx
│   │   │
│   │   ├── dashboard/                # Dashboard components
│   │   │   ├── DashboardLayout.tsx
│   │   │   ├── Sidebar.tsx
│   │   │   ├── TopNav.tsx
│   │   │   ├── StatsCard.tsx
│   │   │   ├── ActivityFeed.tsx
│   │   │   ├── QuickActions.tsx
│   │   │   └── WelcomeBanner.tsx
│   │   │
│   │   ├── shared/                   # Shared/reusable components
│   │   │   ├── Button.tsx
│   │   │   ├── Input.tsx
│   │   │   ├── Select.tsx
│   │   │   ├── TextArea.tsx
│   │   │   ├── Checkbox.tsx
│   │   │   ├── Modal.tsx
│   │   │   ├── Dialog.tsx
│   │   │   ├── Card.tsx
│   │   │   ├── Badge.tsx
│   │   │   ├── Avatar.tsx
│   │   │   ├── DropdownMenu.tsx
│   │   │   ├── Toast.tsx
│   │   │   ├── LoadingSpinner.tsx
│   │   │   ├── ErrorMessage.tsx
│   │   │   ├── EmptyState.tsx
│   │   │   └── ConfirmDialog.tsx
│   │   │
│   │   └── ui/                       # shadcn/ui components
│   │       ├── button.tsx
│   │       ├── input.tsx
│   │       ├── label.tsx
│   │       ├── card.tsx
│   │       ├── dialog.tsx
│   │       ├── dropdown-menu.tsx
│   │       ├── table.tsx
│   │       ├── badge.tsx
│   │       ├── avatar.tsx
│   │       └── toast.tsx
│   │
│   ├── lib/
│   │   ├── prisma.ts                 # Prisma client singleton
│   │   ├── auth.ts                   # Auth utilities
│   │   ├── session.ts                # Session management
│   │   ├── permissions.ts            # Role-based permissions
│   │   ├── utils.ts                  # General utilities
│   │   └── constants.ts              # App constants
│   │
│   ├── hooks/
│   │   ├── useAuth.ts                # Authentication hook
│   │   ├── useUser.ts                # Current user hook
│   │   ├── useCompany.ts             # Company data hook
│   │   ├── useUsers.ts               # Users list hook
│   │   ├── useToast.ts               # Toast notifications hook
│   │   └── usePermissions.ts         # Permissions check hook
│   │
│   ├── context/
│   │   ├── AuthContext.tsx           # Auth state provider
│   │   └── ToastContext.tsx          # Toast notifications provider
│   │
│   ├── types/
│   │   ├── auth.ts                   # Auth types
│   │   ├── user.ts                   # User types
│   │   ├── company.ts                # Company types
│   │   ├── api.ts                    # API response types
│   │   └── index.ts                  # Barrel exports
│   │
│   ├── validations/
│   │   ├── auth.ts                   # Auth validation schemas (Zod)
│   │   ├── user.ts                   # User validation schemas
│   │   └── company.ts                # Company validation schemas
│   │
│   └── styles/
│       └── globals.css               # Global styles with Tailwind
│
├── .env                              # Environment variables
├── .env.example                      # Example env file
├── .gitignore
├── next.config.js
├── package.json
├── tsconfig.json
├── tailwind.config.js
└── README.md
```

---

## USER INTERFACE SPECIFICATIONS

### 1. AUTHENTICATION PAGES

#### 1.1 Login Page (`/login`)

**File:** `src/app/(auth)/login/page.tsx`

```
┌─────────────────────────────────────────────────────────┐
│                                                         │
│                     ESG Platform                        │
│               Sustainability Reporting                  │
│                                                         │
│           ┌───────────────────────────────┐             │
│           │                               │             │
│           │    Welcome Back               │             │
│           │                               │             │
│           │    Email Address              │             │
│           │    ┌─────────────────────┐   │             │
│           │    │ user@company.com    │   │             │
│           │    └─────────────────────┘   │             │
│           │                               │             │
│           │    Password                   │             │
│           │    ┌─────────────────────┐   │             │
│           │    │ ••••••••••          │ 👁 │             │
│           │    └─────────────────────┘   │             │
│           │                               │             │
│           │    ☐ Remember me for 30 days │             │
│           │                               │             │
│           │    ┌─────────────────────┐   │             │
│           │    │    Sign In          │   │             │
│           │    └─────────────────────┘   │             │
│           │                               │             │
│           │    Forgot password?           │             │
│           │                               │             │
│           └───────────────────────────────┘             │
│                                                         │
│           Don't have an account? Register               │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

**Components Used:**
- `LoginForm.tsx` - Main form component
- `Input.tsx` - Email and password inputs
- `Button.tsx` - Sign in button
- `Checkbox.tsx` - Remember me checkbox

**Form Fields:**

| Field      | Type      | Validation         | Required |
|-------     |------     |------------        |----------|
| email      | email     | Valid email format | Yes      |
| password   | password  | Min 1 character    | Yes      |
| rememberMe | checkbox  | Boolean            | No       |

**States:**
- **Default:** Empty form ready for input
- **Loading:** Button shows spinner during authentication
- **Error:** Red error message above form
- **Success:** Redirect to dashboard

**Error Messages:**
- "Please enter your email address"
- "Please enter your password"
- "Invalid email or password"
- "Too many login attempts. Please try again in 15 minutes"
- "Your account has been deactivated. Contact admin."

**Interactions:**
- Tab through form fields
- Enter key submits form
- Eye icon toggles password visibility
- "Forgot password?" link navigates to `/forgot-password`
- "Register" link navigates to `/register`

---

#### 1.2 Registration Page (`/register`)

**File:** `src/app/(auth)/register/page.tsx`

```
┌─────────────────────────────────────────────────────────┐
│                  Create Your Account                    │
│                                                         │
│   ┌─────────────────────────────────────────────────┐  │
│   │ PERSONAL INFORMATION                            │  │
│   │                                                 │  │
│   │ Full Name                                       │  │
│   │ ┌─────────────────────────────────────────┐    │  │
│   │ │ John Müller                              │    │  │
│   │ └─────────────────────────────────────────┘    │  │
│   │                                                 │  │
│   │ Email Address                                   │  │
│   │ ┌─────────────────────────────────────────┐    │  │
│   │ │ john.mueller@company.de                  │    │  │
│   │ └─────────────────────────────────────────┘    │  │
│   │                                                 │  │
│   │ Password                                        │  │
│   │ ┌─────────────────────────────────────────┐ 👁  │  │
│   │ │ ••••••••••                               │    │  │
│   │ └─────────────────────────────────────────┘    │  │
│   │ ✓ At least 8 characters                        │  │
│   │ ✓ 1 uppercase letter                           │  │
│   │ ✓ 1 number                                     │  │
│   │ ✗ 1 special character                          │  │
│   │                                                 │  │
│   │ Confirm Password                                │  │
│   │ ┌─────────────────────────────────────────┐ 👁  │  │
│   │ │ ••••••••••                               │    │  │
│   │ └─────────────────────────────────────────┘    │  │
│   │                                                 │  │
│   ├─────────────────────────────────────────────────┤  │
│   │ COMPANY INFORMATION                             │  │
│   │                                                 │  │
│   │ Company Name                                    │  │
│   │ ┌─────────────────────────────────────────┐    │  │
│   │ │ Acme Manufacturing GmbH                  │    │  │
│   │ └─────────────────────────────────────────┘    │  │
│   │                                                 │  │
│   │ Legal Entity Type                               │  │
│   │ ┌─────────────────────────────────────────┐    │  │
│   │ │ GmbH                                ▼   │    │  │
│   │ └─────────────────────────────────────────┘    │  │
│   │                                                 │  │
│   │ Industry Sector                                 │  │
│   │ ┌─────────────────────────────────────────┐    │  │
│   │ │ Automotive                          ▼   │    │  │
│   │ └─────────────────────────────────────────┘    │  │
│   │                                                 │  │
│   │ Country of Registration                         │  │
│   │ ┌─────────────────────────────────────────┐    │  │
│   │ │ Germany                             ▼   │    │  │
│   │ └─────────────────────────────────────────┘    │  │
│   │                                                 │  │
│   │ ☑ I agree to the Terms of Service and         │  │
│   │   Privacy Policy                                │  │
│   │                                                 │  │
│   │ ┌───────────────────────────────────────────┐  │  │
│   │ │        Create Account                     │  │  │
│   │ └───────────────────────────────────────────┘  │  │
│   └─────────────────────────────────────────────────┘  │
│                                                         │
│        Already have an account? Sign in                 │
└─────────────────────────────────────────────────────────┘
```

**Components Used:**
- `RegisterForm.tsx` - Main registration form
- `Input.tsx` - Text inputs
- `Select.tsx` - Dropdown selects
- `Checkbox.tsx` - Terms acceptance
- `Button.tsx` - Submit button

**Form Fields:**

| Field           | Type     | Validation                             | Options |
|-------          |------    |------------                            |---------|
| name            | text     | 2-100 chars                            | - |
| email           | email    | Valid format, unique                   | - |
| password        | password | 8+ chars, 1 upper, 1 number, 1 special | - |
| confirmPassword | password | Must match password                    | - |
| companyName     | text     | 2-200 chars, unique                    | - |
| legalEntity     | select   | Required                               | GmbH, AG, SE, KG, OHG, Einzelunternehmen |
| industry        | select   | Required                               | Automotive, Machinery, Chemical, Food & 

                                                                        Beverage, Textiles, Electronics, Energy, Construction, Other |

| country         | select   | Default Germany                        | Germany, Austria, Switzerland, etc. |
| acceptTerms     | checkbox | Must be checked                        | - |

**Legal Entity Options:**
- **GmbH** - Gesellschaft mit beschränkter Haftung (Limited Liability Company)
- **AG** - Aktiengesellschaft (Stock Corporation)
- **SE** - Societas Europaea (European Company)
- **KG** - Kommanditgesellschaft (Limited Partnership)
- **OHG** - Offene Handelsgesellschaft (General Partnership)
- **Einzelunternehmen** - Sole Proprietorship

**Industry Options:**
- Automotive
- Machinery & Equipment
- Chemical & Pharmaceutical
- Food & Beverage
- Textiles & Apparel
- Electronics & Technology
- Energy & Utilities
- Construction
- Other

**Real-time Validation:**
- Email: Check format and uniqueness on blur
- Password: Show strength requirements with checkmarks
- Confirm Password: Show match indicator
- Company Name: Check uniqueness on blur

**Password Strength Indicator:**
```
Weak:     [▓░░░░] Red
Fair:     [▓▓░░░] Orange
Good:     [▓▓▓░░] Yellow
Strong:   [▓▓▓▓░] Light Green
Excellent:[▓▓▓▓▓] Green
```

**Success Flow:**
1. Form submission
2. Show loading state
3. Create company and user
4. Auto-login
5. Redirect to `/dashboard`
6. Show welcome toast: "Welcome to ESG Platform!"

---

#### 1.3 Forgot Password Page (`/forgot-password`)

**File:** `src/app/(auth)/forgot-password/page.tsx`

```
┌─────────────────────────────────────────────────────────┐
│                                                         │
│                  Reset Your Password                    │
│                                                         │
│           ┌───────────────────────────────┐             │
│           │                               │             │
│           │  Enter your email address     │             │
│           │  and we'll send you a link    │             │
│           │  to reset your password.      │             │
│           │                               │             │
│           │  Email Address                │             │
│           │  ┌───────────────────────┐   │             │
│           │  │ user@company.com      │   │             │
│           │  └───────────────────────┘   │             │
│           │                               │             │
│           │  ┌───────────────────────┐   │             │
│           │  │  Send Reset Link      │   │             │
│           │  └───────────────────────┘   │             │
│           │                               │             │
│           │  Back to Sign In              │             │
│           │                               │             │
│           └───────────────────────────────┘             │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

**Success Message:**
```
┌─────────────────────────────────────────────────────────┐
│                                                         │
│  ✓ Check Your Email                                    │
│                                                         │
│  We've sent a password reset link to:                  │
│  user@company.com                                      │
│                                                         │
│  The link will expire in 1 hour.                       │
│                                                         │
│  Didn't receive the email? Check your spam folder      │
│  or [Resend Email]                                     │
│                                                         │
│  [Back to Sign In]                                     │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

---

#### 1.4 Reset Password Page (`/reset-password?token=xxx`)

**File:** `src/app/(auth)/reset-password/page.tsx`

```
┌─────────────────────────────────────────────────────────┐
│                                                         │
│                  Create New Password                    │
│                                                         │
│           ┌───────────────────────────────┐             │
│           │                               │             │
│           │  New Password                 │             │
│           │  ┌───────────────────────┐   │             │
│           │  │ ••••••••••            │ 👁 │             │
│           │  └───────────────────────┘   │             │
│           │  ✓ At least 8 characters     │             │
│           │  ✓ 1 uppercase letter        │             │
│           │  ✗ 1 number                  │             │
│           │  ✗ 1 special character       │             │
│           │                               │             │
│           │  Confirm New Password         │             │
│           │  ┌───────────────────────┐   │             │
│           │  │ ••••••••••            │ 👁 │             │
│           │  └───────────────────────┘   │             │
│           │                               │             │
│           │  ┌───────────────────────┐   │             │
│           │  │  Reset Password       │   │             │
│           │  └───────────────────────┘   │             │
│           │                               │             │
│           └───────────────────────────────┘             │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

**Error States:**
- Token expired: "This reset link has expired. Please request a new one."
- Token invalid: "This reset link is invalid. Please request a new one."
- Passwords don't match: "Passwords do not match"

---

### 2. DASHBOARD LAYOUT

#### 2.1 Main Dashboard Layout

**File:** `src/app/(dashboard)/layout.tsx`

```
┌───────────────────────────────────────────────────────────────────────┐
│  [Logo] ESG Platform    🔍 Search...      🔔(3)  👤 John M.  [▼]      │
├────────┬──────────────────────────────────────────────────────────────┤
│        │                                                              │
│  MENU  │                  PAGE CONTENT AREA                           │
│        │                                                              │
│ 🏠 Home│                                                              │
│        │                                                              │
│ 🏢 Co. │                                                              │
│        │                                                              │
│ 👥 Usr │                                                              │
│        │                                                              │
│ 📊 Rpt │                                                              │
│  ▸ E   │                                                              │
│  ▸ S   │                                                              │
│  ▸ G   │                                                              │
│        │                                                              │
│ 🏭 Site│                                                              │
│        │                                                              │
│ ⚙️ Set │                                                              │
│        │                                                              │
├────────┤                                                              │
│        │                                                              │
│  [👤]  │                                                              │
│  John  │                                                              │
│  Admin │                                                              │
│        │                                                              │
└────────┴──────────────────────────────────────────────────────────────┘
```

**Components:**
- `DashboardLayout.tsx` - Main layout wrapper
- `TopNav.tsx` - Top navigation bar
- `Sidebar.tsx` - Left sidebar navigation
- Page content rendered in main area

---

#### 2.2 Top Navigation Bar

**File:** `src/components/dashboard/TopNav.tsx`

**Left Section:**
- Logo image (40x40px)
- App name "ESG Platform"

**Center Section:**
- Search input (coming in later phases)
- Placeholder: "Search companies, users, reports..."

**Right Section:**

**Notification Bell:**
```
┌─────────────────────────────────────┐
│  Notifications              [Mark all│
│                              as read]│
├─────────────────────────────────────┤
│  🟢 Sarah joined the team           │
│     2 hours ago                     │
├─────────────────────────────────────┤
│  📝 Company profile updated         │
│     Yesterday                       │
├─────────────────────────────────────┤
│  👥 New user invitation sent        │
│     2 days ago                      │
├─────────────────────────────────────┤
│  [View all notifications]           │
└─────────────────────────────────────┘
```

**User Menu Dropdown:**
```
┌─────────────────────────────────────┐
│  👤 John Müller                     │
│     john@acme.de                    │
│     Administrator                   │
├─────────────────────────────────────┤
│  👤 Profile Settings                │
│  🏢 Company Settings                │
│  📚 Help & Documentation            │
│  ⚙️  Preferences                     │
├─────────────────────────────────────┤
│  🚪 Sign Out                        │
└─────────────────────────────────────┘
```

---

#### 2.3 Sidebar Navigation

**File:** `src/components/dashboard/Sidebar.tsx`

**Navigation Items:**

| Icon | Label | Route | Permission |
|------|-------|-------|------------|
| 🏠 | Dashboard | `/dashboard` | All |
| 🏢 | Company | `/dashboard/company` | All |
| 👥 | Users | `/dashboard/users` | Admin, Manager |
| 📊 | Reports | `/dashboard/reports` | All (Phase 4+) |
| 🏭 | Sites | `/dashboard/sites` | All (Phase 2+) |
| ⚙️ | Settings | `/dashboard/settings` | All |

**Collapsed State (60px width):**
- Shows only icons
- Tooltip on hover

**Expanded State (240px width):**
- Shows icons + labels
- Sub-menu for Reports (E, S, G)

**User Section (Bottom):**
- Avatar
- Name (when expanded)
- Role badge

---

### 3. DASHBOARD HOME PAGE

**File:** `src/app/(dashboard)/dashboard/page.tsx`

```
┌───────────────────────────────────────────────────────────────────┐
│  Welcome back, John Müller                                        │
│  Acme Manufacturing GmbH                                          │
├───────────────────────────────────────────────────────────────────┤
│                                                                   │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐           │
│  │   👥  5      │  │   📄  0      │  │   🏭  0      │           │
│  │              │  │              │  │              │           │
│  │ Team Members │  │   Reports    │  │    Sites     │           │
│  │              │  │  (Phase 4)   │  │  (Phase 2)   │           │
│  │ [View All →] │  │              │  │              │           │
│  └──────────────┘  └──────────────┘  └──────────────┘           │
│                                                                   │
│  ┌───────────────────────────────────────────────────────────┐   │
│  │  QUICK ACTIONS                                            │   │
│  │                                                           │   │
│  │  [+ Invite Team Member]    [⚙️ Company Settings]          │   │
│  │                                                           │   │
│  │  [📖 Documentation]         [💬 Get Help]                 │   │
│  └───────────────────────────────────────────────────────────┘   │
│                                                                   │
│  ┌───────────────────────────────────────────────────────────┐   │
│  │  RECENT ACTIVITY                            [View All →]  │   │
│  │                                                           │   │
│  │  🟢 John Müller updated company profile                  │   │
│  │     Today at 2:30 PM                                     │   │
│  │                                                           │   │
│  │  🟢 Sarah Schmidt accepted invitation                    │   │
│  │     Today at 10:15 AM                                    │   │
│  │                                                           │   │
│  │  🟢 Thomas Weber was invited to join                     │   │
│  │     Yesterday at 4:20 PM                                 │   │
│  │                                                           │   │
│  │  🟢 Company profile created                              │   │
│  │     3 days ago                                           │   │
│  └───────────────────────────────────────────────────────────┘   │
│                                                                   │
└───────────────────────────────────────────────────────────────────┘
```

**Components:**
- `WelcomeBanner.tsx` - Welcome message with user name and company
- `StatsCard.tsx` - Metric cards (users, reports, sites)
- `QuickActions.tsx` - Action buttons
- `ActivityFeed.tsx` - Recent activity list

**Stats Cards:**
- Click to navigate to respective sections
- Show count and label
- "Coming Soon" badge for Phase 2+ features

**Quick Actions:**
- Context-aware based on user role
- Admins see all actions
- Regular users see limited options

---

### 4. COMPANY PAGES

#### 4.1 Company Profile View

**File:** `src/app/(dashboard)/company/page.tsx`

```
┌───────────────────────────────────────────────────────────────────┐
│  Company Profile                             [Edit] [Delete]      │
├───────────────────────────────────────────────────────────────────┤
│                                                                   │
│  ┌─────────────────────────────────────────────────────────────┐ │
│  │  COMPANY INFORMATION                                        │ │
│  │                                                             │ │
│  │  Company Name                                               │ │
│  │  Acme Manufacturing GmbH                                    │ │
│  │                                                             │ │
│  │  Legal Entity                                               │ │
│  │  GmbH (Limited Liability Company)                           │ │
│  │                                                             │ │
│  │  Industry                                                   │ │
│  │  Automotive                                                 │ │
│  │                                                             │ │
│  │  Country of Registration                                    │ │
│  │  Germany                                                    │ │
│  └─────────────────────────────────────────────────────────────┘ │
│                                                                   │
│  ┌─────────────────────────────────────────────────────────────┐ │
│  │  TEAM OVERVIEW                                              │ │
│  │                                                             │ │
│  │  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │ │
│  │  │ Total Users  │  │ Admins       │  │ Managers     │     │ │
│  │  │      5       │  │      2       │  │      1       │     │ │
│  │  └──────────────┘  └──────────────┘  └──────────────┘     │ │
│  │                                                             │ │
│  │  [View All Users →]                                         │ │
│  └─────────────────────────────────────────────────────────────┘ │
│                                                                   │
│  ┌─────────────────────────────────────────────────────────────┐ │
│  │  AUDIT TRAIL                                                │ │
│  │                                                             │ │
│  │  Created:      January 15, 2024 at 10:23 AM                │ │
│  │  Created By:   John Müller (john@acme.de)                  │ │
│  │                                                             │ │
│  │  Last Updated: February 5, 2024 at 2:30 PM                 │ │
│  │  Updated By:   John Müller (john@acme.de)                  │ │
│  └─────────────────────────────────────────────────────────────┘ │
│                                                                   │
│  ┌─────────────────────────────────────────────────────────────┐ │
│  │  DANGER ZONE                            [Admin Only]        │ │
│  │                                                             │ │
│  │  Delete Company                                             │ │
│  │  ⚠️  This will permanently delete all company data          │ │
│  │  including 5 users, sites, and reports.                    │ │
│  │                                                             │ │
│  │  [Delete Company]                                           │ │
│  └─────────────────────────────────────────────────────────────┘ │
│                                                                   │
└───────────────────────────────────────────────────────────────────┘
```

**Components:**
- `CompanyProfile.tsx` - Main profile display
- `CompanyStats.tsx` - Team overview stats
- `Card.tsx` - Section containers
- `Button.tsx` - Edit/Delete actions

**Permissions:**
- View: All users
- Edit button: Admin, Manager only
- Delete button: Admin only

---

#### 4.2 Company Edit Page

**File:** `src/app/(dashboard)/company/edit/page.tsx`

```
┌───────────────────────────────────────────────────────────────────┐
│  Edit Company                                    [Cancel] [Save]   │
├───────────────────────────────────────────────────────────────────┤
│                                                                   │
│  ┌─────────────────────────────────────────────────────────────┐ │
│  │  COMPANY INFORMATION                                        │ │
│  │                                                             │ │
│  │  Company Name *                                             │ │
│  │  ┌───────────────────────────────────────────────────────┐ │ │
│  │  │ Acme Manufacturing GmbH                               │ │ │
│  │  └───────────────────────────────────────────────────────┘ │ │
│  │                                                             │ │
│  │  Legal Entity Type *                                        │ │
│  │  ┌───────────────────────────────────────────────────────┐ │ │
│  │  │ GmbH                                              ▼   │ │ │
│  │  └───────────────────────────────────────────────────────┘ │ │
│  │  • GmbH (Limited Liability Company)                        │ │
│  │  • AG (Stock Corporation)                                  │ │
│  │  • SE (European Company)                                   │ │
│  │  • KG (Limited Partnership)                                │ │
│  │  • OHG (General Partnership)                               │ │
│  │  • Einzelunternehmen (Sole Proprietorship)                 │ │
│  │                                                             │ │
│  │  Industry Sector *                                          │ │
│  │  ┌───────────────────────────────────────────────────────┐ │ │
│  │  │ Automotive                                        ▼   │ │ │
│  │  └───────────────────────────────────────────────────────┘ │ │
│  │  • Automotive                                              │ │
│  │  • Machinery & Equipment                                   │ │
│  │  • Chemical & Pharmaceutical                               │ │
│  │  • Food & Beverage                                         │ │
│  │  • Textiles & Apparel                                      │ │
│  │  • Electronics & Technology                                │ │
│  │  • Energy & Utilities                                      │ │
│  │  • Construction                                            │ │
│  │  • Other                                                   │ │
│  │                                                             │ │
│  │  Country of Registration *                                  │ │
│  │  ┌───────────────────────────────────────────────────────┐ │ │
│  │  │ Germany                                           ▼   │ │ │
│  │  └───────────────────────────────────────────────────────┘ │ │
│  │  • Germany                                                 │ │
│  │  • Austria                                                 │ │
│  │  • Switzerland                                             │ │
│  │                                                             │ │
│  │  * Required fields                                          │ │
│  └─────────────────────────────────────────────────────────────┘ │
│                                                                   │
│  ┌─────────────────────────────────────────────────────────────┐ │
│  │  [Cancel]                                          [Save]   │ │
│  └─────────────────────────────────────────────────────────────┘ │
│                                                                   │
└───────────────────────────────────────────────────────────────────┘
```

**Components:**
- `CompanyEditForm.tsx` - Edit form
- `Input.tsx` - Text inputs
- `Select.tsx` - Dropdown selects
- `Button.tsx` - Cancel/Save buttons

**Validation:**
- Company name: 2-200 chars, unique
- Legal entity: Required selection
- Industry: Required selection
- Country: Required selection

**Save Flow:**
1. Validate all fields
2. Check company name uniqueness (if changed)
3. Update company record
4. Set updatedBy to current user
5. Show success toast
6. Redirect to company profile

---

#### 4.3 Company Delete Confirmation Dialog

**Component:** `CompanyDeleteDialog.tsx`

```
┌─────────────────────────────────────────────────────────┐
│  ⚠️  Delete Company                                     │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  Are you absolutely sure you want to delete             │
│  Acme Manufacturing GmbH?                               │
│                                                         │
│  This action will permanently delete:                   │
│                                                         │
│  • All 5 team members and their data                   │
│  • All sites and facilities                            │
│  • All emissions data and calculations                 │
│  • All reports (environmental, social, governance)     │
│  • All taxonomy and assurance records                  │
│                                                         │
│  ⚠️  This action CANNOT be undone!                      │
│                                                         │
│  To confirm, type the company name exactly:             │
│  ┌───────────────────────────────────────────────────┐ │
│  │                                                   │ │
│  └───────────────────────────────────────────────────┘ │
│                                                         │
│  [Cancel]                  [Delete Company Forever]    │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

**Validation:**
- Company name must match exactly (case-sensitive)
- Delete button disabled until valid input

**Delete Flow:**
1. User types company name
2. Enable delete button when match
3. Click delete
4. Show loading state
5. Soft delete: Set deletedAt, deletedBy
6. Cascade delete all users
7. Sign out current user
8. Redirect to login
9. Show message: "Company deleted successfully"

---

### 5. USER MANAGEMENT PAGES

#### 5.1 Users List Page

**File:** `src/app/(dashboard)/users/page.tsx`

```
┌───────────────────────────────────────────────────────────────────┐
│  User Management                             [+ Invite User]      │
├───────────────────────────────────────────────────────────────────┤
│                                                                   │
│  [🔍 Search by name or email...]     Filter: [All Roles ▼]       │
│                                                                   │
│  ┌─────────────────────────────────────────────────────────────┐ │
│  │ Avatar │ Name        │ Email          │ Role    │ Status  │ │ │
│  ├────────┼─────────────┼────────────────┼─────────┼─────────┼─┤ │
│  │   👤   │ John        │ john@acme.de   │ [Admin] │ ✓Active │•││ │
│  │        │ Müller      │                │         │         │ │ │
│  │        │ Joined Jan  │                │         │         │ │ │
│  ├────────┼─────────────┼────────────────┼─────────┼─────────┼─┤ │
│  │   👤   │ Sarah       │ sarah@acme.de  │ [Mngr]  │ ✓Active │•││ │
│  │        │ Schmidt     │                │         │         │ │ │
│  │        │ Joined Jan  │                │         │         │ │ │
│  ├────────┼─────────────┼────────────────┼─────────┼─────────┼─┤ │
│  │   👤   │ Thomas      │ thomas@acme.de │ [User]  │ ⚠️Pend  │•││ │
│  │        │ Weber       │                │         │         │ │ │
│  │        │ Invited Feb │                │         │         │ │ │
│  ├────────┼─────────────┼────────────────┼─────────┼─────────┼─┤ │
│  │   👤   │ Lisa        │ lisa@acme.de   │ [Audit] │ ✓Active │•││ │
│  │        │ Becker      │                │         │         │ │ │
│  │        │ Joined Feb  │                │         │         │ │ │
│  ├────────┼─────────────┼────────────────┼─────────┼─────────┼─┤ │
│  │   👤   │ Michael     │ mike@acme.de   │ [User]  │ ✓Active │•││ │
│  │        │ Fischer     │                │         │         │ │ │
│  │        │ Joined Feb  │                │         │         │ │ │
│  └─────────────────────────────────────────────────────────────┘ │
│                                                                   │
│  Showing 5 of 5 users                              [1] 2 3 Next  │
│                                                                   │
└───────────────────────────────────────────────────────────────────┘
```

**Components:**
- `UserTable.tsx` - Table container
- `UserRow.tsx` - Individual user row
- `UserRoleBadge.tsx` - Role badge
- `UserStatusBadge.tsx` - Status indicator
- `UserActionsMenu.tsx` - Three-dot menu
- `Input.tsx` - Search input
- `Select.tsx` - Role filter

**Role Badges:**
- **Admin** - Red badge
- **Manager** - Blue badge
- **Auditor** - Purple badge
- **User** - Gray badge

**Status Indicators:**
- **✓ Active** - Green
- **⚠️ Pending** - Yellow (invitation sent, not accepted)
- **⏸️ Deactivated** - Gray

**Actions Menu (Three Dots):**
```
┌─────────────────────────────┐
│  View Profile               │
│  Edit User                  │
│  Change Role                │
├─────────────────────────────┤
│  Resend Invitation          │ (if pending)
│  Reset Password             │
├─────────────────────────────┤
│  Deactivate User            │
│  Delete User                │
└─────────────────────────────┘
```

**Search & Filter:**
- Search: Real-time filter by name or email
- Role Filter: All Roles, Admin, Manager, Auditor, User
- Clear filters button

**Pagination:**
- 20 users per page
- Page numbers with next/previous
- Jump to page input

**Empty State (No Users):**
```
┌─────────────────────────────────────────────────────────┐
│                                                         │
│                      👥                                 │
│                                                         │
│              No Team Members Yet                        │
│                                                         │
│         Start building your team by inviting            │
│              your first team member.                    │
│                                                         │
│              [+ Invite Team Member]                     │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

---

#### 5.2 Invite User Dialog

**Component:** `InviteUserDialog.tsx`

```
┌─────────────────────────────────────────────────────────┐
│  Invite New User                                   [×]  │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  Email Address *                                        │
│  ┌───────────────────────────────────────────────────┐ │
│  │ newuser@acme.de                                   │ │
│  └───────────────────────────────────────────────────┘ │
│  They'll receive an invitation email                   │
│                                                         │
│  Full Name *                                            │
│  ┌───────────────────────────────────────────────────┐ │
│  │ Thomas Weber                                      │ │
│  └───────────────────────────────────────────────────┘ │
│                                                         │
│  Role *                                                 │
│  ┌───────────────────────────────────────────────────┐ │
│  │ User                                          ▼   │ │
│  └───────────────────────────────────────────────────┘ │
│                                                         │
│  ┌─────────────────────────────────────────────────┐   │
│  │ Role Permissions                                │   │
│  │                                                 │   │
│  │ User can:                                       │   │
│  │ • View company data                             │   │
│  │ • Enter activity data (Phase 3+)                │   │
│  │ • Create draft reports (Phase 4+)               │   │
│  │                                                 │   │
│  │ User cannot:                                    │   │
│  │ • Manage users                                  │   │
│  │ • Approve reports                               │   │
│  │ • Delete company data                           │   │
│  └─────────────────────────────────────────────────┘   │
│                                                         │
│  [Cancel]                         [Send Invitation]    │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

**Role Permission Descriptions:**

**Admin:**
- Full system access
- Manage all users and roles
- Edit company settings
- Delete company
- Approve/reject all reports

**Manager:**
- View all company data
- Invite and manage users (except admins)
- Edit sites and data
- Approve reports
- Cannot delete company

**Auditor:**
- Read-only access to all data
- View all reports and calculations
- Export data for review
- Cannot edit or approve anything

**User:**
- View company data
- Enter activity data
- Create draft reports
- Cannot approve or manage others

**Invitation Flow:**
1. Admin/Manager fills form
2. System validates email (format, not already registered)
3. Creates user with "pending" status
4. Generates invitation token
5. Sends invitation email
6. Shows success message
7. Closes dialog
8. Refreshes user list

**Invitation Email Content:**
```
Subject: You've been invited to ESG Platform

Hi Thomas Weber,

John Müller has invited you to join Acme Manufacturing GmbH 
on ESG Platform.

Role: User

Click the link below to accept the invitation and set your password:
[Accept Invitation Button] 

This link expires in 7