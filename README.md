<div align="center">

# 🚗 Piyush Travels — Luxury Car & Bus Rental Platform

**A full-stack, production-ready enterprise mobility & travel reservation platform.**  
*From foundational HTML, CSS & JavaScript beginnings to an enterprise Next.js & Node.js ecosystem.*

[![Next.js](https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-blue?style=for-the-badge&logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Node.js](https://img.shields.io/badge/Node.js-20+-339933?style=for-the-badge&logo=node.js)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-5-000000?style=for-the-badge&logo=express)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?style=for-the-badge&logo=mongodb)](https://www.mongodb.com/)
[![Razorpay](https://img.shields.io/badge/Razorpay-Payment_Gateway-0C2340?style=for-the-badge&logo=razorpay)](https://razorpay.com/)
[![SEO / GEO / LLMO Ready](https://img.shields.io/badge/LLMO_%26_AISEO-100%25_Optimized-success?style=for-the-badge)](https://llmstxt.org/)

[Live Demo](https://www.piyush-travels.com) • [Fleet Catalog](https://www.piyush-travels.com/vehicles) • [Services](https://www.piyush-travels.com/services) • [LLM Docs (llms.txt)](https://www.piyush-travels.com/llms.txt)

---

</div>

## 🌟 Project Evolution & Background

> **Origin Story**: **Piyush Travels** began as a foundational web development project built with pure **HTML5, CSS3, and Vanilla JavaScript** to understand DOM manipulation, responsive layouts, and basic booking workflows.
> 
> Recognizing the demands of modern web performance, scalability, search engine visibility, and AI-driven conversational search, the project was re-architected and elevated into a modern **Next.js (App Router) + Node.js/Express + MongoDB full-stack architecture** with real-time payments, administrative analytics, and industry-leading **GEO, SEO, LLMO, AISEO & E-E-A-T** optimizations.

---

## ✨ Key Features

### 🚘 Fleet & Rental Booking Experience
- **Diverse Luxury Fleet**: Sedans (Mercedes E-Class, BMW 5 Series, Audi A6), Premium SUVs (Toyota Fortuner, Innova Hycross), Executive Tempo Travellers (9–26 Seater), and Volvo Tourist Coaches (35–55 Seater).
- **Interactive Vehicle Showcase**: Real-time filtering by category, passenger capacity, pricing, and transmission.
- **Smart Booking Flow**: Dynamic date range validation, price calculation (daily + hourly estimates), passenger details collection, and secure checkout.

### 💳 Payments & Digital Invoicing
- **Razorpay Integration**: End-to-end secure online payment processing supporting UPI, Credit/Debit Cards, Net Banking, and Wallets.
- **Automated PDF Invoices**: Programmatic invoice generation with detailed fare breakdowns, GST tax calculations, and booking credentials.

### 🔐 Authentication & Role-Based Access
- **Dual Authentication**: Secure Email/Password registration with JWT tokens + Google OAuth 2.0 single-click sign-in.
- **Client & Admin Dashboards**: Customer ride histories, active bookings, and an Admin Portal for fleet updates and transaction monitoring.

---

## 🤖 SEO, GEO, LLMO, AISEO & E-E-A-T Architecture

Piyush Travels is built with advanced discovery engineering for both traditional search engines (Google, Bing) and AI search agents (ChatGPT, Claude, Perplexity, Gemini, SearchGPT).

```
┌────────────────────────────────────────────────────────────────────────┐
│                        DISCOVERY & AI ECOSYSTEM                        │
├──────────────────┬──────────────────┬─────────────────┬────────────────┤
│    Local GEO     │  LLMO & AISEO    │    E-E-A-T      │  Standard SEO  │
│  (Delhi NCR)     │   (llms.txt)     │ (Trust Signals) │ (SERP Snippets)│
├──────────────────┼──────────────────┼─────────────────┼────────────────┤
│ • GeoCoordinates │ • /llms.txt      │ • Verified Certs│ • Canonical URL│
│ • LocalBusiness  │ • /llms-full.txt │ • Chauffeur KYC │ • OpenGraph    │
│ • AreaServed     │ • AI Bot Rules   │ • 4.9/5 Reviews │ • Twitter Card │
│ • ICBM Meta      │ • Semantic Facts │ • SOS Protocols │ • XML Sitemap  │
└──────────────────┴──────────────────┴─────────────────┴────────────────┘
```

### 1. 🤖 LLMO (LLM Optimization) & AISEO
- **`public/llms.txt`**: Standardized Markdown file adhering to [llmstxt.org](https://llmstxt.org/) providing structured context, core URLs, fleet specs, and rates for LLM scrapers.
- **`public/llms-full.txt`**: In-depth knowledge base detailing safety policies, luggage limits, chauffeur screening, and outstation routes for conversational AI agents.
- **AI-Friendly `robots.txt`**: Explicitly permissions GPTBot, ClaudeBot, PerplexityBot, Applebot, CCBot, and OAI-SearchBot for clean ingestion.

### 2. 📍 GEO & Local SEO
- **Schema.org `AutoRental` & `LocalBusiness` JSON-LD**: Embedded geo-coordinates (`28.6304° N, 77.2177° E`), Connaught Place address, 24/7 operating hours, price ranges, and telephone endpoints.
- **Local Meta Tags**: Configured with `geo.region: IN-DL`, `geo.placename: New Delhi`, and `ICBM` coordinates for local map pack dominance.

### 3. 🛡️ E-E-A-T (Experience, Expertise, Authoritativeness, Trustworthiness)
- **Organization & FAQ Schemas**: Direct JSON-LD structured FAQs for rich Google SERP results.
- **Aggregate Rating Schema**: Verified 4.9/5 star ratings with 1,200+ customer reviews.
- **Trust Elements**: Verified commercial licenses, 24/7 GPS telematics, speed-governed fleet, and transparent refund policies.

---

## 🛠️ Technology Stack

| Layer | Technologies |
| :--- | :--- |
| **Frontend Framework** | [Next.js 16 (App Router)](https://nextjs.org/), [React 19](https://reactjs.org/) |
| **Styling & UI** | [Tailwind CSS v4](https://tailwindcss.com/), [Framer Motion](https://www.framer.com/motion/), [Lucide React](https://lucide.dev/) |
| **Backend API** | [Node.js](https://nodejs.org/), [Express 5](https://expressjs.com/), TypeScript |
| **Database & ODM** | [MongoDB Atlas](https://www.mongodb.com/), [Mongoose 9](https://mongoosejs.com/) |
| **Authentication** | [JWT (JSON Web Tokens)](https://jwt.io/), [Google OAuth 2.0](https://developers.google.com/identity) |
| **Payments & Media** | [Razorpay](https://razorpay.com/), [Cloudinary](https://cloudinary.com/), [PDFKit](https://pdfkit.org/) |
| **Search & Discovery** | Schema.org JSON-LD, Dynamic `sitemap.ts`, Dynamic `robots.ts`, `llms.txt` |

---

## 📂 Project Structure

```bash
piyush-travels/
├── frontend/                     # Next.js 16 Client & App Router
│   ├── public/
│   │   ├── llms.txt              # Standard LLM context file (llmstxt.org)
│   │   ├── llms-full.txt         # Comprehensive AI knowledge base
│   │   ├── robots.txt            # Static robots fallback
│   │   └── sitemap.xml           # Static sitemap fallback
│   ├── src/
│   │   ├── app/
│   │   │   ├── layout.tsx        # Root layout with SEO, GEO & OpenGraph
│   │   │   ├── page.tsx          # Landing page
│   │   │   ├── robots.ts         # Next.js dynamic robots.txt
│   │   │   ├── sitemap.ts        # Next.js dynamic sitemap.xml
│   │   │   ├── vehicles/         # Fleet catalog & booking
│   │   │   ├── services/         # Transport solutions & rates
│   │   │   └── about/            # Trust & E-E-A-T credentials
│   │   ├── components/
│   │   │   ├── landing/          # Hero, Fleet showcase, Testimonials
│   │   │   ├── seo/              # Typed Schema.org JSON-LD components
│   │   │   └── ui/               # Reusable UI component library
│   │   └── context/              # Auth & Global state providers
│   └── package.json
│
├── backend/                      # Express & Node.js API Service
│   ├── src/
│   │   ├── controllers/          # Business logic & request handlers
│   │   ├── models/               # MongoDB Mongoose schemas
│   │   ├── routes/               # API endpoints (auth, bookings, vehicles)
│   │   ├── middleware/           # JWT auth & error handlers
│   │   └── server.ts             # Express application entrypoint
│   └── package.json
│
└── README.md                     # Root project documentation
```

---

## 🚀 Getting Started Locally

### Prerequisites
- **Node.js**: v18.0 or higher
- **npm** or **yarn** / **pnpm**
- **MongoDB**: Local instance or MongoDB Atlas URI

---

### 1. Clone the Repository
```bash
git clone https://github.com/ArchanaGupta2205/piyush-travels.git
cd "piyush travels"
```

---

### 2. Backend Setup
```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create environment configuration
cp .env.example .env   # (or configure .env)
```

#### Sample Backend `.env`:
```env
PORT=5000
MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/piyush_travels
JWT_SECRET=your_super_secret_jwt_key
RAZORPAY_KEY_ID=rzp_test_xxxxxxx
RAZORPAY_KEY_SECRET=your_razorpay_secret
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

```bash
# Run backend in development mode
npm run dev
```
*Backend runs at `http://localhost:5000`*

---

### 3. Frontend Setup
```bash
# Open a new terminal and navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Create environment configuration
cp .env.local.example .env.local
```

#### Sample Frontend `.env.local`:
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_test_xxxxxxx
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your_google_client_id.apps.googleusercontent.com
```

```bash
# Start Next.js development server
npm run dev
```
*Frontend runs at `http://localhost:3000`*

---

## 📡 API Endpoints Overview

| Method | Endpoint | Description | Access |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/auth/register` | Register new user account | Public |
| `POST` | `/api/auth/login` | Email/Password login | Public |
| `POST` | `/api/auth/google` | Google OAuth verification | Public |
| `GET` | `/api/vehicles` | Fetch all available vehicles | Public |
| `POST` | `/api/bookings` | Create a new vehicle reservation | User / Auth |
| `POST` | `/api/payments/verify` | Verify Razorpay payment signature | User / Auth |
| `GET` | `/api/admin/analytics` | View revenue, fleet usage & bookings | Admin Only |

---

## 📄 License & Attribution

This project is licensed under the **ISC License**.  
Developed with ❤️ by **Piyush Travels Team**.

---

<div align="center">
  <sub>⭐️ If you found this project helpful or inspiring, please consider giving it a star on GitHub! ⭐️</sub>
</div>