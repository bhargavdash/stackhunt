// StackHunt - Dashboard Types
// Phase 2.5: Dynamic Dashboard Implementation

import { UserTechnology } from './technology'

export interface DashboardUser {
  id: string
  name: string | null
  email: string | null
  image: string | null
  onboardingCompleted: boolean
}

export interface DashboardTechnologies {
  selected: UserTechnology[]
  count: number
  lastUpdated: number | null
}

export interface DashboardGitHub {
  connected: boolean
  username?: string | null
  repositoriesFound?: number
  lastSync?: Date | null
  syncInProgress: boolean
}

export interface DashboardIssue {
  id: string
  title: string
  url: string
  repository: {
    name: string
    url: string
    language: string | null
    stars: number
  }
  labels: Array<{name: string, color: string}>
  matchScore: number
  matchReasons: string[]
  isGoodFirstIssue: boolean
  difficulty: number
  createdAt: string
  discoveredAt: string
}

export interface DashboardIssues {
  items: DashboardIssue[]
  total: number
  hasMore: boolean
  loading: boolean
}

export interface DashboardState {
  user: DashboardUser
  technologies: DashboardTechnologies
  github: DashboardGitHub
  issues: DashboardIssues
  dashboardState: 'initial' | 'discovering' | 'active' // Phase 3 state tracking
}

// Dashboard Layout States
export type DashboardLayoutState = 
  | 'onboarding_incomplete'
  | 'post_onboarding' 
  | 'github_connecting'
  | 'active'

// Dashboard Widget Types
export interface DashboardWidget {
  id: string
  title: string
  size: 'small' | 'medium' | 'large' | 'full'
  priority: number
  visible: boolean
}

export interface StatusBannerConfig {
  state: DashboardLayoutState
  message: string
  metrics?: {
    technologiesSelected?: number
    repositoriesFound?: number
    issuesAvailable?: number
  }
  nextAction?: {
    label: string
    href: string
  }
}

export interface DashboardLayout {
  statusBanner: StatusBannerConfig
  mainContent: string[]
  sidebar: string[]
}