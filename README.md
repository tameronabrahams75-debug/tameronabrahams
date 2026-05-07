# ProductivAI Assistant 🚀

> An AI-Powered Workplace Productivity Assistant that helps professionals, students, and teams automate repetitive tasks, improve efficiency, and make smarter decisions.

![Status](https://img.shields.io/badge/status-active-success)
![License](https://img.shields.io/badge/license-MIT-blue)
![Stack](https://img.shields.io/badge/stack-React%20%7C%20TanStack%20Start%20%7C%20Supabase-purple)

---

## ✨ Overview

**ProductivAI Assistant** is a modern, full-stack web application that brings the power of AI into everyday workplace workflows. From drafting polished emails to summarizing long meetings, planning tasks, conducting research, and answering general work questions — ProductivAI is your always-on productivity copilot.

Built with a clean, professional, and futuristic SaaS-style UI, it works seamlessly across desktop and mobile devices.

---

## 🧠 Key Features

| Feature | Description |
|---|---|
| 📧 **Smart Email Generator** | Draft professional emails with custom tone (formal, friendly, persuasive) and audience targeting. |
| 📝 **Meeting Summarizer** | Convert long transcripts into structured summaries with decisions, action items, and deadlines. |
| ✅ **AI Task Planner** | Generate prioritized, time-blocked daily and weekly schedules. |
| 🔍 **Research Assistant** | Get TL;DRs, key insights, simplified explanations, and recommendations on any topic. |
| 💬 **AI Chat Assistant** | A streaming workplace chatbot for any productivity-related question. |
| 🛡️ **Responsible AI** | Transparent disclaimers, review reminders, and bias-mitigation built-in. |
| 🌗 **Dark / Light Mode** | Beautiful theming with smooth transitions. |

---

## 🛠️ Tech Stack

- **Frontend:** React 19, TanStack Start v1, TanStack Router, Vite 7
- **Styling:** Tailwind CSS v4, OKLCH color system, shadcn/ui components
- **Backend:** Supabase (Lovable Cloud) — Edge Functions, Auth, Database
- **AI:** Lovable AI Gateway — `google/gemini-3-flash-preview` (streaming SSE)
- **Language:** TypeScript (strict mode)
- **Icons:** Lucide React
- **Markdown:** react-markdown

---

## 📁 Project Structure

```
src/
├── components/
│   ├── AppLayout.tsx        # Main authenticated layout
│   ├── AppSidebar.tsx       # Collapsible navigation
│   ├── Markdown.tsx         # AI response renderer
│   └── ui/                  # shadcn/ui primitives
├── lib/
│   ├── ai-stream.ts         # SSE streaming utility
│   └── theme.tsx            # Dark/light theme provider
├── routes/
│   ├── index.tsx            # Landing page
│   ├── dashboard.tsx        # Main dashboard
│   ├── email.tsx            # Email generator
│   ├── summarize.tsx        # Meeting summarizer
│   ├── planner.tsx          # Task planner
│   ├── research.tsx         # Research assistant
│   ├── chat.tsx             # AI chat
│   └── settings.tsx         # Settings & preferences
├── integrations/supabase/   # Auto-generated Supabase client
└── styles.css               # Design tokens & global styles

supabase/
└── functions/
    └── ai-assist/           # AI streaming edge function
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** 20+ or **Bun** 1.0+
- A **Supabase** project (or use Lovable Cloud)
- A **Lovable AI** API key

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/productivai-assistant.git
cd productivai-assistant

# Install dependencies
bun install
# or
npm install
```

### Environment Variables

Create a `.env` file in the project root:

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_PUBLISHABLE_KEY=your_supabase_anon_key
VITE_SUPABASE_PROJECT_ID=your_project_id
```

Set the following secret in your Supabase project:

```env
LOVABLE_API_KEY=your_lovable_ai_key
```

### Run Locally

```bash
bun dev
# or
npm run dev
```

Visit [http://localhost:5173](http://localhost:5173) 🎉

### Build for Production

```bash
bun run build
```

---

## 🤖 AI Architecture

All AI requests flow through a single edge function (`supabase/functions/ai-assist/index.ts`) which:

1. Accepts a `mode` (email, summarize, planner, research, chat) and input/messages
2. Selects a specialized **system prompt** for the mode
3. Streams responses from Lovable AI Gateway via Server-Sent Events (SSE)
4. Returns chunks to the frontend in real-time

This architecture keeps API keys server-side, enables prompt versioning, and provides a uniform streaming UX across all tools.

---

## 🎨 Design Philosophy

- **Minimalist & Professional** — Inspired by modern SaaS products like Linear, Notion, and Vercel.
- **Futuristic** — Glassmorphism, gradient glows, and OKLCH color system.
- **Typography** — Space Grotesk (display) + Inter (body).
- **Accessible** — Semantic HTML, proper contrast, keyboard navigation.

---

## 🛡️ Responsible AI

ProductivAI embraces responsible AI practices:

- ⚠️ Transparent disclaimers on every AI output
- 🔒 No persistent storage of user prompts beyond session
- 🚫 Bias and harmful content filtering
- 👁️ Encourages user review for high-stakes outputs

---

## 📜 License

MIT © 2026

---

## 🙏 Acknowledgements

- Built with [Lovable](https://lovable.dev)
- Powered by [Supabase](https://supabase.com) & [Lovable AI](https://lovable.dev)
- UI components by [shadcn/ui](https://ui.shadcn.com)

---

<p align="center">Made with 💜 to help you work smarter, not harder.</p>
