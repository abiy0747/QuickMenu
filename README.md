# QuickMenu

**Instant restaurant menus — no app, no wait. Just scan and browse.**

QuickMenu is a modern QR-code-based digital menu platform. Customers scan a QR code at their table and instantly view a restaurant's live menu — no downloads, no logins. Restaurant owners manage everything from a simple admin dashboard.

🔗 **Live Demo:** [quick-menu-one.vercel.app](https://quick-menu-one.vercel.app)
🔗 **Admin Login:** [quick-menu-one.vercel.app/admin/login](https://quick-menu-one.vercel.app/admin/login)

![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)

---

## ✨ Features

- 📱 **Instant QR Discovery** — Customers scan a QR code and land directly on the restaurant's live menu, no app install required
- ⚡ **Fast, Modern UI** — Clean, mobile-first menu experience built for quick browsing
- 🔐 **Admin Dashboard** — Secure login for restaurant owners/staff to manage their menu
- 📝 **Menu CRUD** — Full create, read, update, and delete functionality for categories and menu items
- 🖼️ **Image Upload** — Add photos to menu items for a richer customer experience
- 🗄️ **Type-Safe Data Layer** — Prisma ORM with PostgreSQL for reliable, schema-driven data management

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Framework | [Next.js](https://nextjs.org/) (App Router) |
| Language | TypeScript |
| Database | PostgreSQL |
| ORM | [Prisma](https://www.prisma.io/) |
| Styling | [Tailwind CSS](https://tailwindcss.com/) |
| Hosting | [Vercel](https://vercel.com/) |

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- A PostgreSQL database (local or hosted, e.g. [Neon](https://neon.tech/), [Supabase](https://supabase.com/))

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/abiy0747/QuickMenu.git
   cd QuickMenu
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**

   Create a `.env` file in the root directory:
   ```env
   DATABASE_URL="postgresql://user:password@host:port/database"
   NEXTAUTH_SECRET="your-secret-here"
   NEXTAUTH_URL="http://localhost:3000"
   ```

4. **Run database migrations**
   ```bash
   npx prisma migrate dev
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) to view the app.

---

## 📁 Project Structure

```
QuickMenu/
├── app/                  # Next.js App Router pages & routes
│   ├── admin/            # Admin dashboard & auth
│   └── (menu)/           # Public customer-facing menu pages
├── components/           # Reusable UI components
├── lib/                  # Utilities, helpers, Prisma client
├── prisma/
│   └── schema.prisma     # Database schema
├── public/                # Static assets
└── styles/                # Global styles
```

---

## 🗺️ Roadmap

- [ ] Online ordering & payment integration
- [ ] Multi-language menu support
- [ ] Allergen / dietary tags & filters
- [ ] Analytics for restaurant owners (views, popular items)
- [ ] Table-specific QR codes for direct ordering

---

## 👤 Author

**Abiy**
GitHub: [@abiy0747](https://github.com/abiy0747)

---

## 📄 License

This project is licensed under the MIT License.
