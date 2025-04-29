# ⚽ Replay Admin Dashboard

This is the **admin interface** for managing clubs, competitions, matches, and users (players & coaches) for the [SVE Replay](https://github.com/your-repo) platform.

Built with:
- [Next.js](https://nextjs.org/) 15 (App Router)
- [Supabase](https://supabase.com/) (PostgreSQL, Auth, RLS)
- [Material UI](https://mui.com/) + TailwindCSS
- [SWR](https://swr.vercel.app/) for data fetching
- [Day.js](https://day.js.org/) for dates
- [React Toastify](https://fkhadra.github.io/react-toastify/) for notifications

---

## 🚀 Features

### 🏟 Club-Based Admin Dashboard
- Secure login via Supabase Auth
- Fully protected admin-only routes (`/administrator/*`)
- Responsive sidebar navigation with dark/light mode toggle

### 🏆 Competitions
- Create / Edit / Delete competitions
- Automatically links competitions to the admin's club
- Stored and retrieved via Supabase + RPC functions

### 🎮 Matches
- Create / Edit / Delete matches
- Attach matches to competitions & clubs
- Optional scores (editable only after match is played)
- Pagination, search & sort supported

### 👥 Players & Coaches *(coming soon)*
- Role-based user filtering
- Approve/reject users from the admin panel
- Role switching: player ↔ coach
- Clean, role-limited access via Supabase RLS

---

## 🧪 Technologies

| Tech         | Purpose                    |
|--------------|----------------------------|
| Next.js      | App & routing              |
| Supabase     | Auth, DB, RLS              |
| MUI + Tailwind | UI components + layout   |
| SWR          | Data fetching & cache      |
| Day.js       | Date handling              |
| React Toastify | Feedback notifications  |

---

## 🛠 Setup

```bash
# 1. Clone this repo
git clone https://github.com/your-username/replay-dashboard.git
cd replay-dashboard

# 2. Install dependencies
npm install

# 3. Create a `.env.local` file with your Supabase keys
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
SUPABASE_SERVICE_ROLE_KEY=...

# 4. Run locally
npm run dev
