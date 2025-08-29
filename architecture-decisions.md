# StackHunt - Architecture & Strategic Decisions

## 📋 Document Overview

This document captures critical architectural decisions and strategic brainstorming sessions that shaped the StackHunt application. These decisions will guide development across all phases and ensure consistency in our approach.

---

## 🔐 Authentication Strategy: Database Sessions vs JWT

### Decision: Database Sessions (Chosen)

**Date:** Phase 1 Implementation  
**Context:** Choosing authentication strategy for NextAuth.js integration

### Analysis

#### Database Sessions (Selected)
```typescript
// Configuration chosen
export const authOptions: NextAuthOptions = {
  session: {
    strategy: "database", // ← Our choice
  },
  adapter: PrismaAdapter(prisma),
  // ...
}
```

**Advantages:**
1. **Instant Session Revocation**
   ```typescript
   // Can immediately invalidate sessions
   await prisma.session.delete({ where: { sessionToken } })
   ```

2. **Multi-Device Management**
   ```typescript
   // See all active sessions for a user
   const userSessions = await prisma.session.findMany({
     where: { userId: user.id },
     include: { user: true }
   })
   ```

3. **OAuth Integration Excellence**
   - Seamless refresh token handling
   - Account linking across providers
   - Token expiration management

4. **Enhanced Security Features**
   - Server-side session control
   - Audit trails for security events
   - Force logout capabilities

**Trade-offs Accepted:**
- Database query on each auth check (acceptable for user-centric app)
- Slightly more complex than JWT (worth it for security features)

#### JWT Sessions (Rejected)
**Pros:** Stateless, faster for high-scale read operations  
**Cons:** Cannot revoke, no multi-device visibility, complex OAuth handling

### Implementation Benefits Realized
- Perfect integration with OAuth providers (Google)
- Foundation for user activity tracking (Phase 4+)
- Essential for email notification preferences (Phase 5)
- Support for GitHub token management (Phase 3+)

---

## 🎯 Core Application Logic: Issue Discovery Strategy

### Decision: Hybrid Approach (Technology-First + Repository Enhancement)

**Date:** Phase 1-2 Transition Planning  
**Context:** Determining how users discover and track GitHub issues

### Problem Statement
*"Should users discover issues by first selecting repositories to monitor, or should the system automatically find relevant issues based on their technology interests?"*

### Approaches Evaluated

#### 1. Repository-First Approach (Rejected)
```
User sets technologies → Discover repositories → User subscribes → Monitor repos → Notifications
```

**Analysis:**
- ✅ User has explicit control
- ✅ Lower initial API usage
- ❌ Requires users to understand repository landscape
- ❌ May miss excellent issues in unknown repositories
- ❌ Extra friction in user onboarding

#### 2. Issue-First Approach (Considered)
```
User sets technologies → Auto-discover ALL relevant issues → Smart filtering → Notifications
```

**Analysis:**
- ✅ Zero additional user effort
- ✅ Discovers unknown gems
- ✅ Technology-focused (matches user intent)
- ❌ Higher API usage
- ❌ Less user control

#### 3. Hybrid Approach (Selected) 🏆
```
User sets technologies → 
Auto-discover issues (immediate value) → 
Show source repositories in issues → 
Allow repository subscriptions (power user feature) → 
Weighted notification system
```

### Strategic Implementation Plan

#### Phase 2-3: Immediate Value
```typescript
// Auto-discovery based on user technologies
async function discoverIssuesForUser(userId: string) {
  const technologies = await getUserTechnologies(userId)
  
  for (const tech of technologies) {
    const issues = await github.searchIssues({
      q: `is:open is:issue label:"good first issue" ${tech.name}`,
      sort: 'created',
      per_page: 10
    })
    
    await processIssuesForUser(userId, issues, tech)
  }
}
```

#### Phase 4: Smart Repository Tracking
```typescript
// Auto-subscribe to high-quality repositories
if (issueScore > 0.8 && repository.healthScore > 0.7) {
  await subscribeUserToRepository(userId, repositoryId, 'auto-discovered')
}
```

#### Phase 5: Intelligent Notification Prioritization
```typescript
const notificationPriority = {
  subscribedRepos: 1.0,      // Explicit user interest
  autoDiscovered: 0.8,       // High-quality matches
  technologyMatch: 0.6,      // General technology relevance
  skillLevelFit: 0.4         // Skill-appropriate complexity
}
```

### User Experience Journey

#### Week 1: Immediate Gratification
- User signs up and selects technologies (React, TypeScript, Node.js)
- **Instant result:** Dashboard shows 15 relevant open issues
- **No additional setup required**

#### Week 2: Automated Discovery
- Daily digest emails with new issues
- Issues from repositories user didn't know existed
- **Zero configuration effort from user**

#### Week 3-4: Progressive Enhancement
- User clicks on interesting issues
- Discovers high-quality repositories
- **Optional:** Can subscribe to specific repositories for priority notifications

#### Month 1+: Power User Features
- Manual repository management
- Advanced filtering and preferences
- **Full control while maintaining automation**

### Technical Architecture Benefits

#### 1. Scalable API Usage
```typescript
interface DiscoveryStrategy {
  technologyBased: boolean    // Primary: search by technologies
  repositoryBased: boolean    // Secondary: monitor subscriptions
  behaviorBased: boolean      // Future: ML-based learning
}
```

#### 2. Progressive Data Collection
- **Phase 3:** Technology-based issue discovery
- **Phase 4:** Repository health scoring and auto-subscriptions
- **Phase 6:** User behavior analysis for improved matching

#### 3. Flexible Notification System
```typescript
// Supports multiple discovery methods
interface IssueMatch {
  issueId: string
  userId: string
  matchScore: number
  discoveryMethod: 'technology' | 'repository' | 'behavior'
  notificationPriority: number
}
```

---

## 📧 Email Verification Strategy

### Decision: Progressive Email Verification

**Context:** When to verify user email addresses for optimal user experience

### Chosen Approach: Just-in-Time Verification

#### Timing Strategy
```typescript
const emailVerificationStrategy = {
  immediate: false,           // Don't block initial signup
  onFirstNotification: true,  // Verify when enabling notifications
  gracePeriod: 7,            // Days to verify before limiting features
}
```

#### Implementation Flow
```
User completes Google OAuth signup (trusted email) →
User explores app and sets up technologies →
User enables email notifications →
"Verify email to receive notifications" prompt →
Verification link sent (not OTP) →
Email verified = notifications activated
```

#### Rationale
1. **No Signup Friction:** Users can immediately explore the application
2. **Clear Value Exchange:** Verification only required when user wants email features
3. **Trusted Source:** Google OAuth emails are already verified by Google
4. **User-Friendly Method:** Email link verification instead of OTP codes

---

## 🏗️ Database Schema Evolution

### Current State (Phase 1)
```sql
-- Core authentication tables (NextAuth.js)
User, Account, Session, VerificationToken

-- Application-specific tables
UserPreferences (theme, notifications)
```

### Planned Evolution

#### Phase 2: Technology Management
```sql
CREATE TABLE technologies (
  technology_id UUID PRIMARY KEY,
  name TEXT UNIQUE NOT NULL,
  category TEXT NOT NULL, -- 'language', 'framework', 'tool', 'domain'
  popularity_score INTEGER DEFAULT 0
);

CREATE TABLE user_technologies (
  user_technology_id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(user_id),
  technology_id UUID REFERENCES technologies(technology_id),
  skill_level TEXT NOT NULL -- 'beginner', 'intermediate', 'advanced'
);
```

#### Phase 3-4: Repository & Issue Management
```sql
CREATE TABLE repositories (
  repository_id UUID PRIMARY KEY,
  github_id BIGINT UNIQUE NOT NULL,
  health_score DECIMAL(3,2) -- Calculated repository quality
);

CREATE TABLE issues (
  issue_id UUID PRIMARY KEY,
  github_id BIGINT UNIQUE NOT NULL,
  repository_id UUID REFERENCES repositories(repository_id)
);
```

#### Phase 5: Matching & Notifications
```sql
CREATE TABLE user_issue_matches (
  match_id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(user_id),
  issue_id UUID REFERENCES issues(issue_id),
  match_score DECIMAL(3,2),
  match_reasons JSONB -- Detailed scoring breakdown
);
```

---

## 🎯 Success Metrics & KPIs

### User Experience Metrics
- **Onboarding Completion Rate:** % users who complete technology selection
- **Time to First Value:** Minutes from signup to seeing relevant issues
- **Discovery Success Rate:** % of shown issues user finds relevant
- **Notification Engagement:** Email open rates and click-through rates

### Technical Performance Metrics
- **GitHub API Efficiency:** Requests per valuable issue discovered
- **Match Accuracy:** User feedback on issue relevance
- **System Response Time:** Dashboard load times <2 seconds
- **Notification Delivery:** Email delivery success rates

### Business Success Metrics
- **User Retention:** 30-day and 90-day retention rates
- **Feature Adoption:** % users progressing through features
- **Contribution Success:** Users who actually contribute to discovered issues

---

## 🚀 Implementation Phases Alignment

### Phase 1: Foundation ✅
- **Completed:** Authentication, UI foundation, database setup
- **Validated:** Database session strategy working perfectly

### Phase 2: Technology Interest Management 🚧
- **Focus:** User technology preferences and onboarding
- **Foundation:** For hybrid discovery approach

### Phase 3: Repository Discovery Engine
- **Implementation:** GitHub API integration
- **Strategy:** Technology-based issue discovery

### Phase 4: Issue Monitoring & Background Jobs
- **Implementation:** Automated issue discovery
- **Strategy:** Smart repository tracking

### Phase 5: Intelligent Matching & Notifications
- **Implementation:** Email system with progressive verification
- **Strategy:** Weighted notification system

### Phase 6: Dashboard & Analytics
- **Implementation:** User feedback loops
- **Strategy:** Continuous improvement of matching algorithms

---

## 🔄 Decision Review & Evolution

### Review Schedule
- **Post-Phase Reviews:** After each phase completion
- **User Feedback Integration:** Monthly user research sessions
- **Performance Analysis:** Quarterly technical debt assessment
- **Strategy Evolution:** Semi-annual architecture reviews

### Success Criteria for Strategy Validation
1. **95%+ users** complete technology selection (Phase 2)
2. **80%+ users** find at least 3 relevant issues immediately (Phase 3)
3. **60%+ users** remain active after 30 days (Phase 5)
4. **15%+ email click-through** rate on notifications (Phase 5)

### Contingency Plans
- **Low User Engagement:** Pivot to repository-first approach
- **High API Costs:** Implement more aggressive caching
- **Poor Match Quality:** Enhance filtering algorithms
- **Scalability Issues:** Implement queue-based processing

---

## 📝 Lessons Learned & Best Practices

### Architectural Decisions
1. **Start Simple, Scale Smart:** Database sessions over JWT for user-centric features
2. **User Value First:** Immediate issue discovery over perfect repository curation
3. **Progressive Enhancement:** Build basic features that naturally evolve into advanced ones
4. **Data-Driven Evolution:** Plan for user feedback integration from day one

### Development Philosophy
1. **Validate Early:** Each phase must demonstrate clear user value
2. **Measure Everything:** Success metrics guide feature prioritization
3. **Plan for Change:** Architecture supports multiple discovery strategies
4. **User Experience Focus:** Technical decisions prioritize user journey quality

---

*This document serves as the architectural foundation for StackHunt. All implementation decisions should reference and align with the strategies outlined here.*

**Last Updated:** Phase 1 Completion / Phase 2 Planning  
**Next Review:** Post-Phase 2 Implementation  
**Status:** Strategic Foundation Established ✅