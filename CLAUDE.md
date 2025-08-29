# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 🎯 Project Overview

**StackHunt** - An automated GitHub issue discovery and notification system that helps developers find relevant open source contribution opportunities based on their technical interests.

### Tech Stack
- **Frontend**: Next.js 14 + TypeScript + Tailwind CSS + Shadcn/ui
- **Backend**: Node.js + Express + TypeScript  
- **Database**: PostgreSQL + Prisma ORM
- **Background Jobs**: Bull Queue + Redis
- **Authentication**: NextAuth.js (Google OAuth + GitHub linking)
- **Email**: SendGrid
- **Hosting**: Vercel (frontend) + Google Cloud Run (backend)

## 📋 Development Commands

### Frontend (Next.js)
```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Type checking
npm run type-check

# Linting
npm run lint
npm run lint:fix

# Testing
npm run test
npm run test:watch
npm run test:coverage
```

### Backend (Express API)
```bash
# Start development server
npm run dev:api

# Build TypeScript
npm run build:api

# Start production server
npm run start:api

# Database operations
npm run db:migrate
npm run db:seed
npm run db:reset
npm run db:studio

# Background jobs
npm run jobs:dev
npm run jobs:prod
```

### Full Stack Development
```bash
# Start everything (frontend + backend + jobs)
npm run dev:all

# Build everything
npm run build:all

# Run all tests
npm run test:all
```

## 🏗️ Project Structure

```
github-oss/
├── frontend/                   # Next.js application
│   ├── app/                   # App Router (Next.js 14)
│   │   ├── (auth)/           # Auth route group
│   │   ├── dashboard/        # Dashboard pages
│   │   ├── api/              # API routes
│   │   └── globals.css       # Global styles
│   ├── components/           # Reusable UI components
│   │   ├── ui/              # Shadcn/ui components
│   │   ├── auth/            # Authentication components
│   │   ├── dashboard/       # Dashboard components
│   │   └── theme/           # Theme provider & toggle
│   ├── lib/                 # Utility functions
│   │   ├── auth.ts          # NextAuth configuration
│   │   ├── db.ts            # Database connection
│   │   └── utils.ts         # General utilities
│   └── types/               # TypeScript type definitions
│
├── backend/                   # Express API server
│   ├── src/
│   │   ├── routes/          # API route handlers
│   │   ├── middleware/      # Express middleware
│   │   ├── services/        # Business logic
│   │   ├── jobs/           # Background job processors
│   │   ├── utils/          # Helper functions
│   │   └── types/          # TypeScript types
│   └── tests/              # Backend tests
│
├── prisma/                   # Database schema & migrations
│   ├── schema.prisma        # Database schema
│   ├── migrations/          # Database migrations
│   └── seed.ts              # Database seed data
│
├── shared/                   # Shared types & utilities
│   └── types/               # Common TypeScript types
│
├── docs/                     # Documentation
├── procedure.md              # Complete development procedure
├── hld.txt                   # High-level design document
└── CLAUDE.md                # This file
```

## 📅 Development Phases

This project follows a 6-phase development approach:

### Phase 1: Foundation & Authentication (Current)
- ✅ Next.js + TypeScript setup
- ✅ PostgreSQL + Prisma configuration
- ✅ Google OAuth implementation
- ✅ Theme system (dark/light/system)
- ✅ Basic dashboard layout

### Phase 2: Technology Interest Management
- Technology database and seeding
- Multi-step onboarding flow
- Technology search and selection interface
- Skill level management

### Phase 3: Repository Discovery Engine
- GitHub API integration
- Repository search and filtering
- Health scoring algorithm
- Manual repository addition

### Phase 4: Issue Monitoring & Background Jobs
- Bull Queue + Redis setup
- GitHub issue monitoring system
- Rate limit management
- Job processing dashboard

### Phase 5: Intelligent Matching & Notifications
- Issue matching algorithm
- SendGrid email integration
- Notification preferences
- Email templates

### Phase 6: Dashboard & Analytics
- Comprehensive dashboard
- Issue tracking and management
- Analytics and insights
- Performance optimization

## 🗄️ Database Schema

The database follows entity-specific primary key conventions:

```sql
-- Example table structure
users (
  user_id UUID PRIMARY KEY,
  google_id TEXT UNIQUE,
  email TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  github_username TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

technologies (
  technology_id UUID PRIMARY KEY,
  name TEXT UNIQUE NOT NULL,
  category TEXT NOT NULL,
  popularity_score INTEGER DEFAULT 0
);

user_technologies (
  user_technology_id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(user_id),
  technology_id UUID REFERENCES technologies(technology_id),
  skill_level TEXT NOT NULL,
  UNIQUE(user_id, technology_id)
);
```

### Naming Conventions
- Primary keys: `{entity}_id` (e.g., `user_id`, `technology_id`)
- Foreign keys: `{referenced_entity}_id`
- Timestamps: `{action}_at` (e.g., `created_at`, `updated_at`)
- Booleans: `is_{state}` (e.g., `is_active`, `is_processed`)

## 🎨 UI/UX Guidelines

### Theme System
- **Themes**: Light, Dark, System (auto-detect)
- **Implementation**: CSS custom properties + React Context
- **Persistence**: localStorage with system detection fallback

### Component Library
- **Base**: Shadcn/ui components for consistency
- **Icons**: Lucide React icons
- **Animations**: Framer Motion for smooth transitions
- **Typography**: Inter font for readability

### Responsive Design
- **Mobile-first** approach with Tailwind CSS
- **Breakpoints**: sm (640px), md (768px), lg (1024px), xl (1280px)
- **Touch-friendly** interfaces with proper tap targets

## 🔐 Authentication Flow

### Google OAuth Integration
```typescript
// NextAuth.js configuration
export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    })
  ],
  callbacks: {
    async session({ session, token }) {
      // Add user_id to session
      return session
    }
  }
}
```

### Protected Routes
```typescript
// Middleware for route protection
export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request })
  
  if (!token && request.nextUrl.pathname.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/auth/signin', request.url))
  }
}
```

## 🔄 Background Jobs Architecture

### Job Types
```typescript
interface JobTypes {
  'monitor-repository': MonitorRepositoryJob
  'process-new-issue': ProcessNewIssueJob
  'send-notification': SendNotificationJob
  'update-repository-health': UpdateHealthJob
}

// Example job processor
export async function processMonitorRepository(job: Job<MonitorRepositoryJob>) {
  const { repositoryId } = job.data
  
  try {
    const newIssues = await githubClient.getRepositoryIssues(repositoryId)
    // Process issues and create matching jobs
    
    await job.progress(100)
  } catch (error) {
    throw new Error(`Failed to monitor repository: ${error.message}`)
  }
}
```

### Job Scheduling
- **Repository monitoring**: Every 15 minutes
- **Health score updates**: Every 6 hours
- **Email digests**: Daily at user's preferred time
- **Cleanup jobs**: Weekly maintenance

## 🧪 Testing Strategy

### Testing Tools
- **Unit Tests**: Jest + Testing Library
- **Integration Tests**: Supertest for API testing
- **E2E Tests**: Playwright for user workflows
- **Database Tests**: In-memory SQLite for isolation

### Testing Patterns
```typescript
// Component testing
describe('ThemeToggle', () => {
  test('switches between light and dark themes', async () => {
    render(<ThemeToggle />)
    const toggle = screen.getByRole('button', { name: /theme/i })
    
    await user.click(toggle)
    expect(document.documentElement).toHaveClass('dark')
  })
})

// API testing
describe('POST /api/auth/github-link', () => {
  test('links GitHub account successfully', async () => {
    const response = await request(app)
      .post('/api/auth/github-link')
      .send({ code: 'github-oauth-code' })
      .expect(200)
    
    expect(response.body.success).toBe(true)
  })
})
```

### Test Organization
- Tests live next to the code they test
- Use `describe` blocks for grouping related tests
- Test both happy path and error conditions
- Mock external dependencies (GitHub API, email service)

## 📧 Email System

### SendGrid Integration
```typescript
class NotificationService {
  async sendIssueDigest(user: User, matches: IssueMatch[]) {
    const template = await this.getEmailTemplate('daily-digest')
    
    await sgMail.send({
      to: user.email,
      from: 'notifications@osstracker.dev',
      templateId: template.id,
      dynamicTemplateData: {
        userName: user.name,
        matchCount: matches.length,
        matches: matches.map(this.formatMatch)
      }
    })
  }
}
```

### Email Templates
- **Immediate**: Single issue notification
- **Daily Digest**: Summary of day's matches  
- **Weekly Digest**: Comprehensive weekly summary
- **Onboarding**: Welcome and setup guidance

## 🔧 Environment Configuration

### Required Environment Variables

#### Frontend (.env.local)
```bash
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-nextauth-secret
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
DATABASE_URL=postgresql://user:pass@localhost:5432/oss_tracker
```

#### Backend (.env)
```bash
PORT=8000
DATABASE_URL=postgresql://user:pass@localhost:5432/oss_tracker
REDIS_URL=redis://localhost:6379
GITHUB_TOKEN=your-github-personal-access-token
SENDGRID_API_KEY=your-sendgrid-api-key
JWT_SECRET=your-jwt-secret
NODE_ENV=development
```

## 🚀 Deployment

### Vercel (Frontend)
```json
// vercel.json
{
  "buildCommand": "npm run build",
  "outputDirectory": ".next",
  "installCommand": "npm install",
  "framework": "nextjs"
}
```

### Google Cloud Run (Backend)
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build:api
EXPOSE 8000
CMD ["npm", "run", "start:api"]
```

### Database Migrations
```bash
# Run migrations on deployment
npm run db:migrate
npm run db:seed
```

## 📊 Monitoring & Analytics

### Application Monitoring
- **Error Tracking**: Sentry integration
- **Performance**: Core Web Vitals monitoring
- **Uptime**: Health check endpoints
- **User Analytics**: Privacy-focused analytics

### Key Metrics
- User sign-up and retention rates
- Email open and click-through rates
- Issue match accuracy
- GitHub API efficiency
- System performance

## 🛡️ Security Best Practices

### Data Protection
- Environment variables for all secrets
- Encrypted GitHub tokens in database
- HTTPS everywhere in production
- CORS configuration for API security

### Input Validation
```typescript
// Using Zod for runtime validation
const createUserSchema = z.object({
  email: z.string().email(),
  name: z.string().min(1).max(100),
  technologies: z.array(z.string().uuid())
})

export function validateCreateUser(data: unknown) {
  return createUserSchema.parse(data)
}
```

## 🔍 Debugging & Development

### Useful Commands
```bash
# Database debugging
npm run db:studio    # Open Prisma Studio

# API debugging
npm run dev:api:debug    # Start API with debugger

# Job queue monitoring
npm run jobs:ui    # Open Bull Dashboard

# Log analysis
tail -f logs/app.log | grep ERROR
```

### Development Tools
- **Prisma Studio**: Database browser
- **Bull Dashboard**: Job queue monitoring
- **React DevTools**: Component debugging
- **VS Code Extensions**: Prisma, Tailwind CSS IntelliSense

## ⚠️ Important Notes

### GitHub API Considerations
- **Rate Limits**: 5000 requests/hour per token
- **Best Practices**: Use conditional requests, batch operations
- **Monitoring**: Track remaining requests and reset times

### Performance Optimization
- Database indexing on frequently queried fields
- Redis caching for expensive computations
- Image optimization for user avatars
- Code splitting for faster page loads

### Accessibility
- WCAG 2.1 AA compliance
- Keyboard navigation support
- Screen reader compatibility
- Color contrast requirements

## 📚 Resources

### Documentation
- [Next.js Docs](https://nextjs.org/docs)
- [Prisma Docs](https://www.prisma.io/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [NextAuth.js](https://next-auth.js.org/getting-started/introduction)

### GitHub APIs
- [GitHub REST API](https://docs.github.com/en/rest)
- [GitHub GraphQL API](https://docs.github.com/en/graphql)
- [GitHub Webhooks](https://docs.github.com/en/developers/webhooks-and-events/webhooks)

---

_This document is updated as the project evolves. See procedure.md for detailed implementation steps._
