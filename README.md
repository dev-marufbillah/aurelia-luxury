# AURELIA — Luxury E-Commerce & Super Admin

A complete, production-ready premium luxury e-commerce platform built with React, Vite, and Tailwind CSS. Features a cinematic storefront, working shopping cart, full checkout with multiple Bangladesh payment methods, and a secure Super Admin panel.

## Features

### 🛍️ Customer Storefront
- Cinematic hero with editorial typography
- Featured categories with hover-zoom effects
- New Arrivals & Best Sellers product grids
- Signature Collection editorial section
- Customer testimonials & Instagram gallery
- Newsletter signup & premium footer
- Fully responsive (desktop, tablet, mobile)

### 🛒 Shopping Cart & Checkout
- Slide-in cart drawer with quantity controls
- Full checkout flow (Shipping → Payment → Review → Confirmation)
- **Payment Methods:**
  - 💳 Credit / Debit Card (Visa, Mastercard, AMEX)
  - 🅱️ bKash (with number & TrxID)
  - 🟠 Nagad (with number & TrxID)
  - 🚀 Rocket / DBBL (with number & TrxID)
  - 💵 Cash on Delivery
- Dhaka area selection (Gulshan, Banani, Baridhara, etc.)
- Order confirmation with Order ID
- Free delivery on orders above ৳5,000

### 🛡️ Super Admin Dashboard
- Role-based access (Super Admin, Admin, Manager, Staff)
- Revenue analytics & charts
- Product management (CRUD)
- Order tracking with status filters
- Customer management with tier system
- Admin user management with permissions
- Store settings & security configuration

## Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

## Deployment

### Vercel (Recommended)
1. Push to GitHub
2. Go to [vercel.com](https://vercel.com) → New Project → Import repo
3. Click Deploy ✅

### Netlify
1. Push to GitHub
2. Go to [netlify.com](https://netlify.com) → Add new site → Import repo
3. Build command: `npm run build`
4. Publish directory: `dist`
5. Deploy ✅

## How to Access Admin Panel
1. Click the **User icon (👤)** in top-right navigation
2. Email: `marufsalauddinofficial@gmail.com`
3. Password: Type anything
4. Click **Sign In**

## Tech Stack
- [React 19](https://react.dev/)
- [Vite 7](https://vitejs.dev/)
- [Tailwind CSS v4](https://tailwindcss.com/)
- [Lucide React](https://lucide.dev/) (Icons)
- [TypeScript](https://www.typescriptlang.org/)

## Easy Customization Guide

If you want to change design, fonts, colors, or homepage sections later, use these files:

### Change Fonts
- **File:** `index.html`
  - Google Fonts are loaded here.
- **File:** `src/index.css`
  - `--font-playfair` = heading font
  - `--font-inter` = body font
  - `body {}` controls the main body font
  - `.font-playfair {}` controls the luxury serif heading style

### Change Brand Colors
- **File:** `src/index.css`
- Main color tokens:
  - `--color-aurelia-black`
  - `--color-aurelia-ivory`
  - `--color-aurelia-gold`
  - `--color-aurelia-white`

### Change Homepage Design / Sections
- **File:** `src/components/Storefront.tsx`
- This file contains:
  - Announcement bar
  - Navbar
  - Hero section
  - Featured categories
  - New arrivals
  - Signature collection
  - Testimonials
  - Newsletter
  - Footer

### Change Admin Panel Design
- **Files:** `src/components/Sidebar.tsx`, `src/components/Header.tsx`, `src/components/Dashboard.tsx`, and other files inside `src/components/`

### Change Products / Demo Data
- **File:** `src/data.ts`
- Update product names, prices, images, orders, users, and dashboard stats here.

### Change Main App Flow
- **File:** `src/App.tsx`
- This controls:
  - Storefront view
  - Login screen
  - Admin panel
  - Cart drawer
  - Checkout flow

## Design System
| Token | Value |
|-------|-------|
| Deep Black | `#0B0B0B` |
| Warm Ivory | `#F5F1E8` |
| Champagne Gold | `#C6A15B` |
| White | `#FFFFFF` |
| Max Width | `1200px` |
| Navbar Height | `80px` |
| Hero Height | `620px` |
| Section Spacing | `96px` |

---
© 2026 AURELIA. All Rights Reserved.
