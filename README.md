# Job Tracker — Frontend

A clean and responsive web application to manage and track job applications, built with React, TypeScript, Redux Toolkit, and Tailwind CSS.

**Live Repo:** [github.com/mahedihsharif/job-tracker-client](https://github.com/mahedihsharif/job-tracker-client)

**Backend Repo:** [github.com/mahedihsharif/job-tracker-backend](https://github.com/mahedihsharif/job-tracker-backend)

---

## Tech Stack

- **Framework:** React 19
- **Language:** TypeScript
- **Build Tool:** Vite
- **State Management:** Redux Toolkit + RTK Query
- **Styling:** Tailwind CSS v4
- **UI Components:** Shadcn/UI
- **Form Handling:** React Hook Form
- **HTTP Client:** Axios (with interceptors)
- **Icons:** Lucide React
- **Date Formatting:** date-fns
- **Notifications:** Sonner

---

## Features

- User registration and login with cookie-based authentication
- Protected routes — unauthorized users redirected to login
- Public routes — logged-in users redirected to dashboard
- Automatic token refresh with Axios response interceptor
- Dashboard with summary cards — Total, Applied, Pending, Shortlisted
- Add, update, and delete job applications
- Advanced filtering — search, status, apply date range, last date range
- Pagination
- Skeleton loading states
- Toast notifications for success and error feedback

---

## Project Structure

```
src/
├── components/
│   ├── add-job-dialog/
│   ├── job-filters/
│   ├── job-table/
│   ├── profile/
│   ├── skeleton/
│   ├── summary-card/
│   └── ui/
├── hoc/
│   ├── withAuth.tsx
│   └── withPublic.tsx
├── lib/
│   └── utils.ts
├── pages/
│   ├── home/
│   ├── login/
│   └── register/
├── redux/
│   ├── baseApi.ts
│   ├── store.ts
│   ├── hook.ts
│   └── features/
│       ├── auth/
│       └── job/
├── routes/
│   └── router.tsx
└── types/
```

---

## Getting Started

### Prerequisites

- Node.js >= 18

### Installation

```bash
git clone https://github.com/mahedihsharif/job-tracker-client.git
cd job-tracker-client
npm install
```

### Environment Variables

Create a `.env` file in the root:

```env
VITE_BASE_URL=http://localhost:5000/api/v1
```

### Run

```bash
# Development
npm run dev

# Production build
npm run build
```

---

## Key Implementation Details

### Axios Interceptor

Handles automatic token refresh when access token expires. Uses a queue system to avoid multiple simultaneous refresh calls.

### RTK Query

All API calls are managed via RTK Query with automatic caching. Same endpoint called in multiple components triggers only one API request.

### Protected Routes

`withAuth` HOC wraps protected pages. `withPublic` HOC wraps login/register pages to redirect already logged-in users.

---

## Author

**Mahedi H Sharif** — [github.com/mahedihsharif](https://github.com/mahedihsharif)
