# Lumière Bakery & Café - Multi-Branch Management System

Lumière is a sophisticated, artisanal bakery management system designed for multi-location operations. It features an elegant customer-facing landing page alongside a secure, tiered dashboard for staff and management.

## 🌟 Key Features

- **Multi-Branch Isolation**: Support for multiple locations (e.g., Heritage District, Riverside).
- **Tiered Role Access**:
  - **Staff**: View only their personal transactions and branch-specific items.
  - **Manager**: View all transactions and logistics for their assigned branch.
  - **Admin**: Global visibility across all branches and full database management.
- **Real-time POS**: Instant order placement and transaction recording.
- **Supply Logistics**: Interactive checklist for branch-specific inventory management.
- **Offline-First Resilience**: Data is cached locally per-user to ensure smooth operation even during network interruptions.
- **Responsive Design**: Elegant UI that transitions seamlessly from mobile ordering to desktop management.

## 🛠️ Tech Stack

- **Frontend**: React 18, Vite, TypeScript.
- **Styling**: Tailwind CSS, Framer Motion (for elegant animations).
- **Backend/Database**: Supabase (PostgreSQL, Auth, RLS).
- **Icons**: Lucide React.

## 🗄️ Database Schema & Security

The system uses [Supabase](https://supabase.com/) with Row Level Security (RLS) to ensure data privacy.

### Tables
- `branches`: Defines physical bakery locations.
- `profiles`: Connects Auth users to specific roles and branches.
- `items`: Manages menu offerings per branch.
- `orders`: Stores secure transaction data.

### Security (RLS Policies)
- The system enforces "Tiered Order Access":
  - `Staff` user_id must match the authenticated user.
  - `Manager` branch_id must match the user's profile branch.
  - `Admin` has unconditional access.

## 🚀 Setup & Installation

### 1. Supabase Initialization
Run the provided full-stack SQL script (located in your conversation history) in the Supabase SQL Editor. This will set up:
- All required tables.
- RLS Policies.
- Automatic profile creation via Database Triggers.

### 2. Environment Variables
Ensure the following variables are set in your environment:
- `NEXT_PUBLIC_SUPABASE_URL`: Your Supabase Project URL.
- `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`: Your Supabase Anon Key.

### 3. Running Locally
```bash
npm install
npm run dev
```

## 👩‍💼 Admin Management
For maximum security and simplicity, all intensive management tasks (adding new branches, editing staff roles, updating menu prices) are performed directly through the **Supabase Table Editor**. The web app remains clean and focused on daily operations.

---
*Lumière - Crafting moments of light and sweetness across every branch.*
