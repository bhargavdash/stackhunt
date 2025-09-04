// StackHunt - Dashboard State Management Hook
// Phase 2.5: Dynamic Dashboard Implementation

"use client"

import { useState, useEffect } from 'react'
import { DashboardState, DashboardLayoutState, StatusBannerConfig, DashboardLayout } from '@/types/dashboard'

export function useDashboard() {
  const [dashboardState, setDashboardState] = useState<DashboardState | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchDashboardState = async () => {
    try {
      setLoading(true)
      setError(null)
      
      const response = await fetch('/api/dashboard')
      if (!response.ok) {
        throw new Error('Failed to fetch dashboard state')
      }
      
      const data = await response.json()
      setDashboardState(data)
    } catch (err) {
      console.error('Dashboard fetch error:', err)
      setError(err instanceof Error ? err.message : 'Unknown error')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchDashboardState()
  }, [])

  // Determine dashboard layout state  
  const getLayoutState = (state: DashboardState): DashboardLayoutState => {
    if (!state.user.onboardingCompleted || state.technologies.count === 0) {
      return 'onboarding_incomplete'
    }
    
    // Phase 3: Check discovery status instead of GitHub connection
    if (state.dashboardState === 'discovering') {
      return 'github_connecting' // Reuse for loading state
    }
    
    if (state.dashboardState === 'active' && state.issues.total > 0) {
      return 'active'
    }
    
    if (state.dashboardState === 'ready') {
      return 'post_onboarding' // Show the discover button
    }
    
    // Ready for discovery
    return 'post_onboarding'
  }

  // Generate status banner configuration
  const getStatusBannerConfig = (state: DashboardState): StatusBannerConfig => {
    const layoutState = getLayoutState(state)
    
    switch (layoutState) {
      case 'onboarding_incomplete':
        return {
          state: layoutState,
          message: 'Complete your setup to start discovering issues',
          nextAction: {
            label: 'Complete Setup',
            href: '/onboarding'
          }
        }
      
      case 'post_onboarding':
        return {
          state: layoutState,
          message: '🚀 Ready to Discover Issues',
          metrics: {
            technologiesSelected: state.technologies.count
          },
          nextAction: {
            label: 'Discover My Issues',
            href: '#discover-issues'
          }
        }
      
      case 'github_connecting':
        return {
          state: layoutState,
          message: '🔄 Finding perfect issues for you... This may take a few seconds',
          metrics: {
            technologiesSelected: state.technologies.count,
            repositoriesFound: state.github?.repositoriesDiscovered || 0
          }
        }
      
      case 'active':
        return {
          state: layoutState,
          message: `📈 ${state.issues.total} issues discovered • ${state.github.repositoriesFound} repositories monitored`,
          metrics: {
            technologiesSelected: state.technologies.count,
            repositoriesFound: state.github.repositoriesFound,
            issuesAvailable: state.issues.total
          }
        }
      
      default:
        return {
          state: 'onboarding_incomplete',
          message: 'Getting started...'
        }
    }
  }

  // Generate dashboard layout configuration
  const getDashboardLayout = (state: DashboardState): DashboardLayout => {
    const layoutState = getLayoutState(state)
    
    switch (layoutState) {
      case 'onboarding_incomplete':
        return {
          statusBanner: getStatusBannerConfig(state),
          mainContent: ['getting-started-card', 'user-info-card'],
          sidebar: ['progress-tracker']
        }
      
      case 'post_onboarding':
        return {
          statusBanner: getStatusBannerConfig(state),
          mainContent: ['technology-profile-widget', 'github-connection-widget'],
          sidebar: ['user-info-card']
        }
      
      case 'github_connecting':
        return {
          statusBanner: getStatusBannerConfig(state),
          mainContent: ['repository-discovery-feed'],
          sidebar: ['technologies-collapsed', 'github-status']
        }
      
      case 'active':
        return {
          statusBanner: getStatusBannerConfig(state),
          mainContent: ['issues-feed'],
          sidebar: ['technologies-widget', 'stats-widget', 'filters-widget']
        }
      
      default:
        return {
          statusBanner: getStatusBannerConfig(state),
          mainContent: ['getting-started-card'],
          sidebar: []
        }
    }
  }

  return {
    dashboardState,
    loading,
    error,
    layoutState: dashboardState ? getLayoutState(dashboardState) : 'onboarding_incomplete',
    statusBannerConfig: dashboardState ? getStatusBannerConfig(dashboardState) : null,
    dashboardLayout: dashboardState ? getDashboardLayout(dashboardState) : null,
    refreshDashboard: fetchDashboardState
  }
}