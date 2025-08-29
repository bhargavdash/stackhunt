# StackHunt - Development Todos

## 📋 Project Progress Tracker

### ✅ Phase 1: Foundation & Authentication (COMPLETED)
- [x] **Project Setup**
  - [x] Next.js 14 with TypeScript and Tailwind CSS
  - [x] PostgreSQL database with Prisma ORM
  - [x] Shadcn/ui component library integration
  - [x] Project structure organization

- [x] **Authentication System**
  - [x] Google OAuth integration with NextAuth.js
  - [x] Database session strategy implementation
  - [x] Protected routes middleware
  - [x] User model with Google profile data
  - [x] Session management and callbacks

- [x] **Database Schema**
  - [x] User, Account, Session, VerificationToken tables
  - [x] UserPreferences table with theme/notification settings
  - [x] Database migrations and Prisma client generation

- [x] **UI Foundation**
  - [x] Theme system (light/dark/system) with persistence
  - [x] Responsive dashboard layout
  - [x] Theme toggle component
  - [x] Sign-in page with Google OAuth
  - [x] Dashboard with user profile display

- [x] **User Experience**
  - [x] Loading states and error handling
  - [x] Smooth theme transitions
  - [x] Mobile-responsive design
  - [x] Accessible components (WCAG compliance)

---

### 🚧 Phase 2: Technology Interest Management (NEXT)
- [ ] **Technology Database**
  - [ ] Create technologies table with categories
  - [ ] Add user_technologies junction table with skill levels
  - [ ] Seed database with popular technologies
  - [ ] Technology icon/logo integration

- [ ] **Onboarding Flow**
  - [ ] Multi-step onboarding wizard
  - [ ] Technology search and selection interface
  - [ ] Skill level selection (beginner/intermediate/advanced)
  - [ ] Onboarding progress tracking

- [ ] **Technology Management**
  - [ ] Technology search with fuzzy matching
  - [ ] Category-based filtering (language/framework/tool/domain)
  - [ ] Add/remove technologies from user profile
  - [ ] Update skill levels
  - [ ] Visual indicators for selected technologies

- [ ] **User Preferences Enhancement**
  - [ ] Save technology preferences to database
  - [ ] Update user preferences UI
  - [ ] Technology management page
  - [ ] User onboarding completion status

---

### 📍 Phase 3: Repository Discovery Engine (UPCOMING)
- [ ] **GitHub API Integration**
  - [ ] GitHub REST API client setup
  - [ ] Rate limit management system
  - [ ] Repository search functionality
  - [ ] GitHub token management for users

- [ ] **Repository Database**
  - [ ] Repositories table with GitHub data
  - [ ] User-repository subscriptions
  - [ ] Repository health scoring algorithm
  - [ ] Repository metadata tracking

- [ ] **Discovery Logic**
  - [ ] Auto-discovery based on user technologies
  - [ ] Repository recommendation engine
  - [ ] Health score calculation
  - [ ] Manual repository addition feature

- [ ] **Repository Management**
  - [ ] Repository search and browse interface
  - [ ] Subscribe/unsubscribe to repositories
  - [ ] Repository health indicators
  - [ ] Repository management dashboard

---

### 🔄 Phase 4: Issue Monitoring & Background Jobs (UPCOMING)
- [ ] **Background Job System**
  - [ ] Bull Queue setup with Redis
  - [ ] Job processor architecture
  - [ ] Repository monitoring jobs
  - [ ] Issue processing jobs

- [ ] **Issue Database**
  - [ ] Issues table with GitHub data
  - [ ] Job logs for monitoring
  - [ ] Issue metadata extraction
  - [ ] Issue status tracking

- [ ] **Monitoring System**
  - [ ] Scheduled repository checks (every 15 minutes)
  - [ ] New issue detection
  - [ ] Issue processing pipeline
  - [ ] Job failure handling and retries

---

### 🎯 Phase 5: Intelligent Matching & Notifications (UPCOMING)
- [ ] **Matching Algorithm**
  - [ ] Multi-factor issue matching logic
  - [ ] User-issue match scoring
  - [ ] Technology keyword matching
  - [ ] Skill level compatibility checking

- [ ] **Email System**
  - [ ] SendGrid integration
  - [ ] Email templates (immediate/daily/weekly)
  - [ ] Email verification system
  - [ ] Notification preferences management

- [ ] **User Matching**
  - [ ] User-issue matches table
  - [ ] Match reason tracking
  - [ ] User feedback collection
  - [ ] Match accuracy improvement

---

### 📊 Phase 6: Dashboard & Analytics (UPCOMING)
- [ ] **Enhanced Dashboard**
  - [ ] Issue feed with matches
  - [ ] Repository activity overview
  - [ ] User statistics and insights
  - [ ] Contribution tracking

- [ ] **Issue Management**
  - [ ] Mark issues as interested/not interested
  - [ ] Issue bookmarking
  - [ ] Application status tracking
  - [ ] Issue history

- [ ] **Analytics**
  - [ ] Match accuracy analytics
  - [ ] User engagement metrics
  - [ ] System performance monitoring
  - [ ] User behavior insights

---

## 🔄 Current Sprint (Phase 2 Focus)

### This Week's Priorities:
1. **Database Schema Update** - Add technologies and user_technologies tables
2. **Technology Seeding** - Populate database with popular technologies
3. **Onboarding UI** - Create multi-step technology selection flow
4. **Technology Search** - Implement search and filtering functionality

### Next Week's Goals:
1. **Complete Onboarding** - Finish technology selection flow
2. **User Preferences** - Enhance preferences management
3. **Testing** - Add unit tests for new features
4. **Phase 2 Completion** - Wrap up technology management

---

## 🚨 Technical Debt & Improvements
- [ ] Add comprehensive error boundaries
- [ ] Implement loading skeletons for better UX
- [ ] Add proper logging system
- [ ] Set up monitoring and alerting
- [ ] Add API documentation
- [ ] Implement proper caching strategy
- [ ] Add database indexing optimization
- [ ] Set up CI/CD pipeline

---

## 🎯 Success Metrics Tracking
- [ ] Authentication conversion rate
- [ ] Onboarding completion rate
- [ ] User retention after technology setup
- [ ] Technology selection diversity
- [ ] User engagement with recommendations

---

## 🔧 Development Environment
- [x] Local PostgreSQL setup
- [x] Prisma migrations
- [x] Environment variables configuration
- [x] Google OAuth credentials
- [ ] Redis setup (for Phase 4)
- [ ] SendGrid setup (for Phase 5)
- [ ] GitHub API tokens (for Phase 3)

---

*Last Updated: $(date)*
*Current Phase: Phase 1 Complete → Phase 2 Starting*