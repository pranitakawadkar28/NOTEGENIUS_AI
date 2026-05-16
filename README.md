# NoteGenius AI: Premium Study Intelligence Platform 🧠✨

NoteGenius AI is a high-performance MERN stack SaaS application that transforms study materials into structured, visual intelligence. Leveraging Google's **Gemini AI**, it automates the creation of high-retention notes, conceptual diagrams, and data visualizations.

---

## 💎 Premium Features

### 🤖 AI-Driven Content Generation
- **Intelligent Synthesis**: Generates exam-oriented notes with tailored complexity (Class Level, Exam Type).
- **Revision Mode**: Creates ultra-concise facts and formulas for rapid learning.
- **Auto-Diagrams**: Generates **Mermaid.js** flowcharts to visualize complex relationships.
- **Smart Charts**: Injects realistic data visualizations (Bar, Line, Pie) into notes.

### 📄 Advanced Document Engineering
- **PDF Mastering**: One-click export to professional PDF study guides.
- **Cloud Storage**: Secure image and asset hosting via **AWS S3**.
- **Email Systems**: Reliable transactional emails (OTP, Alerts) via **AWS SES**.

### 💳 Enterprise-Grade Infrastructure
- **Payment Orchestration**: Full-cycle credit system integrated with **Razorpay**.
- **Real-time Caching**: Optimized performance using **Redis** for state and session management.
- **Hybrid Auth**: Secure Email/Password + Google OAuth2.0 integration.

---

## 🏗️ Architectural Overview

The project follows a **Modular Monolith** pattern for the backend (Separation of Concerns) and a **Feature-Based Redux** architecture for the frontend.

### 📂 Folder Structure

```text
.
├── backend
│   ├── src
│   │   ├── config/          # Configuration (DB, S3, SES, Passport, Redis)
│   │   ├── controllers/     # Controller Layer (Request processing)
│   │   ├── middlewares/     # Middleware Layer (Auth, Validation, Rate Limit)
│   │   ├── models/          # Data Layer (Mongoose/MongoDB Schemas)
│   │   ├── routes/          # Routing Layer (API Endpoint Definitions)
│   │   ├── services/        # Business Logic Layer (AI, PDF, Payments, SES)
│   │   ├── utils/           # Shared Utilities (Prompt Builders, JWT, Cookies)
│   │   └── validator/       # Schema Validation (Zod)
│   ├── app.js               # Express Application Setup
│   └── server.js            # Entry Point & Server Initialization
│
└── frontend
    ├── src
    │   ├── app/             # Redux Global Store Setup
    │   ├── components/      # Component Library
    │   │   ├── layout/      # Navbar, Sidebar, Protected Layouts
    │   │   ├── notes/       # Specialized Note/Diagram/Chart Renderers
    │   │   └── ui/          # Generic UI Primitives (Buttons, Cards, Inputs)
    │   ├── features/        # Feature-based State Management (Slices & Services)
    │   ├── hooks/           # Custom Logic (Theme, Mermaid, Auth Hooks)
    │   ├── lib/             # Third-party Library Wrappers (Axios, Utils)
    │   ├── pages/           # High-level View Components (Dashboard, Billing)
    │   ├── routes/          # App Routing & Guards (Private/Public Routes)
    │   └── services/        # Centralized API Interceptors & Fetching
    ├── vite.config.js       # Vite Configuration
    └── package.json         # Frontend Dependencies
```

---

## 🛠️ Technology Stack

| Layer | Technologies |
|---|---|
| **Frontend** | React 19, Vite, Tailwind CSS, Redux Toolkit, Recharts, Mermaid.js |
| **Backend** | Node.js, Express, MongoDB (Mongoose), Redis |
| **Intelligence** | Google Gemini AI (Generative AI SDK) |
| **Cloud Infrastructure** | AWS S3 (Storage), AWS SES (Email), Razorpay (Payments) |
| **DevOps/Tools** | Zod, Passport.js, JWT, Axios, PDFKit |

---

## 🚀 Getting Started

### 1️⃣ Environment Configuration
Both `backend/` and `frontend/` folders contain a `.env.example` file. Copy these to `.env` and fill in your credentials.

### 2️⃣ Installation
```bash
# Install Backend dependencies
cd backend && npm install

# Install Frontend dependencies
cd ../frontend && npm install
```

### 3️⃣ Running the Application
```bash
# Start Backend (Port 5000)
cd backend && npm run dev

# Start Frontend (Port 5173)
cd frontend && npm run dev
```

---

## 🛡️ Security & Performance
- **Rate Limiting**: Protection against brute-force and API spam.
- **JWT Authentication**: Stateless, secure sessions with auto-refresh mechanism.
- **Secure Headers**: CORS and Cookie-parser integration.
- **Validated Input**: Strict Zod schemas for every incoming request.

---
Built by [Pranita Kawadkar] | **NoteGenius AI © 2026**
