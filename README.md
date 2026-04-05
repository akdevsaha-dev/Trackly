# Trackly 🚀

Trackly is a premium, best-in-class uptime monitoring platform designed to provide highly reliable monitoring without false positives. Built with a modern tech stack, it offers a seamless and responsive experience for managing your service health.

## ✨ Features

- **Reliable Monitoring**: High-accuracy uptime checks with zero false positives.
- **Real-time Notifications**: Get alerted instantly when your services go down.
- **Comprehensive Dashboards**: Visualize your service performance with intuitive charts and metrics.
- **Secure Authentication**: Multi-provider login support (GitHub, Google, and Email/Password).
- **Automated Cron Jobs**: Scheduled monitoring tasks to ensure constant vigilance.

## 🛠️ Tech Stack

- **Framework**: [Next.js 15+](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Database**: [PostgreSQL](https://www.postgresql.org/) with [Prisma ORM](https://www.prisma.io/)
- **Authentication**: [NextAuth.js v5 (Beta)](https://authjs.dev/)
- **API**: [tRPC](https://trpc.io/) for end-to-end typesafe APIs
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/) & [Framer Motion](https://www.framer.com/motion/)
- **Email**: [Resend](https://resend.com/)
- **State Management**: [TanStack Query](https://tanstack.com/query/latest)

## 🚀 Getting Started

### Prerequisites

- Node.js (v20 or higher recommended)
- PostgreSQL database
- A [Resend](https://resend.com/) API key for email notifications

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/trackly.git
   cd trackly
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   Copy the dummy values from `.env` or create a new one:
   ```bash
   cp .env.example .env # If an example file existed, otherwise just edit the .env created by the setup
   ```
   Fill in the required values in your `.env` file (see [Environment Variables](#environment-variables) section below).

4. **Initialize the database:**
   ```bash
   npx prisma generate
   npx prisma db push
   ```

5. **Run the development server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) with your browser to see the results.

## 🔑 Environment Variables

The following environment variables are required for the application to function correctly:

| Variable | Description |
| :--- | :--- |
| `DATABASE_URL` | PostgreSQL connection string |
| `AUTH_SECRET` | Secret key for NextAuth.js (generate with `openssl rand -base64 32`) |
| `AUTH_GITHUB_ID` | Client ID for GitHub OAuth |
| `AUTH_GITHUB_SECRET` | Client Secret for GitHub OAuth |
| `AUTH_GOOGLE_ID` | Client ID for Google OAuth |
| `AUTH_GOOGLE_SECRET` | Client Secret for Google OAuth |
| `RESEND_API_KEY` | API key from Resend for sending emails |
| `CRON_SECRET` | Secret key to protect your cron job endpoints |

## 📜 Available Scripts

- `npm run dev`: Starts the development server with Turbopack.
- `npm run build`: Creates an optimized production build.
- `npm run start`: Starts the production server.
- `npm run lint`: Runs ESLint to check for code quality issues.
- `postinstall`: Automatically generates the Prisma client after installs.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is private and all rights are reserved.
