# 🚀 ArkeeLabs Enterprise — Operational Intelligence & CRM System

A responsive, multi-module CRM and Employee Task Management System (ETMS) admin dashboard built with **React**, **TypeScript**, **Tailwind CSS**, **Recharts**, and **Framer Motion**.

Inspired by modern architectural design systems (Space Grotesk + DM Sans typography, crisp zero-radius square aesthetics, and electric blue styling).

---

## ✨ Features

- **📊 Comprehensive Dashboard**: Real-time telemetry, 5 key stat metrics, Recharts task status donut breakdown, top employee bar chart, daily task velocity trends, and live activity feeds.
- **👥 Employee Performance Roster**: Complete staff directory with attendance rates, green points earned, performance index ratings, department filters, and employee creation modal.
- **📋 Task Management Workspace**: Dual-view mode (Kanban Board & Tabular Data View), status filters (`Pending`, `Submitted`, `Approved`, `Overdue`, `Rejected`), priority badges, and interactive task drawer with workflow status updates.
- **📅 Attendance & Shift Matrix**: 15-day employee check-in log matrix with punctuality scorecards.
- **📑 Operational Intelligence Reports**: Downloadable report cards (PDF, CSV, XLSX) with simulated export downloads and embedded analytics summaries.
- **🏢 Multi-Site Facility Selector**: Switch context between corporate HQ, branch offices, and logistics centers dynamically.
- **⚡ Framer Motion Animations**: Smooth page transitions and subtle hover micro-interactions.
- **📐 Architectural Square Design**: 100% square edges (`rounded-none`) across all cards, modals, tables, and buttons.

---

## 🛠️ Tech Stack

- **Framework**: [React 18](https://react.dev/) + [Vite](https://vitejs.dev/) + [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Charts**: [Recharts](https://recharts.org/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Fonts**: [Space Grotesk](https://fonts.google.com/specimen/Space+Grotesk) & [DM Sans](https://fonts.google.com/specimen/DM+Sans)

---

## 📁 Project Structure

```text
CRM website/
├── public/
├── src/
│   ├── components/
│   │   ├── charts/        # Recharts wrappers (Donut, Bar, Area)
│   │   ├── layout/        # Sidebar, Topbar navigation
│   │   └── ui/            # StatCard, StatusBadge
│   ├── context/           # AppContext state (Tasks, Employees, Search)
│   ├── data/              # Mock datasets (properties, employees, tasks, attendance, reports)
│   ├── pages/             # Dashboard, Employees, Tasks, Attendance, Reports, StubPage
│   ├── types/             # TypeScript type declarations
│   ├── App.tsx            # React Router setup
│   ├── index.css          # Design tokens & Tailwind imports
│   └── main.tsx
├── index.html
├── package.json
└── vite.config.ts
```

---

## 🚦 Getting Started

### Prerequisites
- Node.js 18+ and npm installed.

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/arkeelabs-enterprise-crm.git
   cd arkeelabs-enterprise-crm
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```
   Open `http://localhost:5173/` in your browser.

4. **Build for production**:
   ```bash
   npm run build
   ```

---

## 📄 License
MIT License © ArkeeLabs Enterprise
