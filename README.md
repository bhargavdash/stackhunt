# 🎯 StackHunt

> Automated GitHub issue discovery and notification system for developers

StackHunt helps developers find relevant open source contribution opportunities based on their technical interests and skill level. No more manual monitoring of repositories - let StackHunt do the hunting for you!

## ✨ Features

### 🚀 Phase 1 (Completed)
- **Google OAuth Authentication** - Secure sign-in with your Google account
- **Dark/Light Theme System** - Adaptive themes with system detection
- **Responsive Dashboard** - Beautiful UI that works on all devices
- **User Profile Management** - Manage your account settings

### 🛠️ Phase 2 (In Progress)
- **Technology Interest Management** - Select your preferred technologies and skill levels
- **Smart Onboarding** - Multi-step setup to personalize your experience
- **Technology Database** - Comprehensive database of programming languages, frameworks, and tools

### 🔮 Coming Soon
- **Intelligent Issue Discovery** - Auto-discover relevant GitHub issues
- **Smart Notifications** - Get notified about issues that match your interests
- **Repository Health Scoring** - Only see issues from active, well-maintained projects
- **Advanced Analytics** - Track your contribution journey

## 🏗️ Tech Stack

### Frontend
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **Shadcn/ui** - High-quality, accessible React components
- **NextAuth.js** - Authentication for Next.js
- **Framer Motion** - Animation library

### Backend
- **Node.js + Express** - Server runtime and web framework
- **PostgreSQL** - Relational database
- **Prisma ORM** - Type-safe database client
- **Bull Queue + Redis** - Background job processing
- **SendGrid** - Email delivery service

### Infrastructure
- **Vercel** - Frontend hosting
- **Google Cloud Run** - Backend hosting
- **Google Cloud SQL** - Managed PostgreSQL
- **Upstash Redis** - Managed Redis service

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- PostgreSQL database
- Google OAuth credentials

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/stackhunt.git
   cd stackhunt
   ```

2. **Install frontend dependencies**
   ```bash
   cd frontend
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   # Fill in your environment variables
   ```

4. **Set up database**
   ```bash
   npx prisma migrate dev
   npx prisma generate
   ```

5. **Start development server**
   ```bash
   npm run dev
   ```

Visit `http://localhost:3000` to see the application.

## 📁 Project Structure

```
stackhunt/
├── frontend/                 # Next.js application
│   ├── app/                 # App Router (Next.js 14)
│   ├── components/          # Reusable UI components
│   ├── lib/                 # Utility functions
│   └── prisma/              # Database schema & migrations
├── backend/                 # Express API server (Phase 3+)
├── docs/                    # Documentation
├── architecture-decisions.md # Key architectural decisions
├── procedure.md             # Detailed development procedure
└── todos.md                 # Project progress tracking
```

## 🎯 Development Phases

### ✅ Phase 1: Foundation & Authentication
- [x] Next.js setup with TypeScript and Tailwind
- [x] Google OAuth authentication
- [x] Database setup with Prisma
- [x] Theme system implementation
- [x] Responsive dashboard layout

### 🚧 Phase 2: Technology Interest Management
- [ ] Technology database creation
- [ ] Multi-step onboarding flow
- [ ] Technology search and selection
- [ ] Skill level management

### 📍 Phase 3: Repository Discovery Engine
- [ ] GitHub API integration
- [ ] Repository search and filtering
- [ ] Health scoring algorithm
- [ ] Auto-discovery system

### 🔄 Phase 4: Issue Monitoring & Background Jobs
- [ ] Background job system setup
- [ ] Issue monitoring and discovery
- [ ] Rate limit management
- [ ] Job processing pipeline

### 🎯 Phase 5: Intelligent Matching & Notifications
- [ ] Issue matching algorithm
- [ ] Email notification system
- [ ] User preference management
- [ ] Notification analytics

### 📊 Phase 6: Dashboard & Analytics
- [ ] Enhanced dashboard with analytics
- [ ] Issue management interface
- [ ] User behavior insights
- [ ] Performance optimization

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

### Development Workflow
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 Documentation

- [Architecture Decisions](architecture-decisions.md) - Key technical decisions and rationale
- [Development Procedure](procedure.md) - Detailed development phases and tasks
- [API Documentation](docs/api.md) - Backend API reference (Phase 3+)

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- UI components from [Shadcn/ui](https://ui.shadcn.com/)
- Icons from [Lucide](https://lucide.dev/)
- Styling with [Tailwind CSS](https://tailwindcss.com/)

---

**StackHunt** - Hunt for the perfect stack, one issue at a time! 🎯