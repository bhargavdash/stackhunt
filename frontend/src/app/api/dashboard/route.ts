// StackHunt - Dashboard State API
// Phase 2.5: Dynamic Dashboard Implementation

import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/db'

export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Fetch user preferences to check onboarding completion
    const userPreferences = await prisma.userPreferences.findUnique({
      where: {
        userId: session.user.id
      }
    })

    // Fetch user's technology selections with technology details
    const userTechnologies = await prisma.userTechnology.findMany({
      where: {
        userId: session.user.id
      },
      include: {
        technology: true
      }
    })

    // Determine dashboard state
    // Consider onboarding complete if user has selected technologies OR explicitly marked as complete
    const onboardingCompleted = userPreferences?.onboardingCompleted || userTechnologies.length > 0
    const technologiesSelected = userTechnologies.length > 0
    
    // Phase 2.5: No discovered issues yet (Phase 3 not implemented)
    const issueMatchesCount = 0
    const recentIssues: any[] = []
    const uniqueRepos = 0

    // Determine dashboard state
    let dashboardState = 'initial'
    let discoveryStatus = 'pending'

    if (!technologiesSelected) {
      dashboardState = 'initial'
    } else if (issueMatchesCount === 0) {
      dashboardState = 'ready' // Ready for discovery, not discovering
      discoveryStatus = 'ready' // Ready for discovery
    } else {
      dashboardState = 'active'
      discoveryStatus = 'completed'
    }
    
    return NextResponse.json({
      user: {
        id: session.user.id,
        name: session.user.name,
        email: session.user.email,
        image: session.user.image,
        onboardingCompleted
      },
      technologies: {
        selected: userTechnologies,
        count: userTechnologies.length,
        lastUpdated: userTechnologies.length > 0 ? 
          Math.max(...userTechnologies.map(ut => new Date(ut.updatedAt).getTime())) : null
      },
      github: {
        connected: false, // Phase 2.5: GitHub integration not implemented yet
        apiStatus: 'not_implemented',
        repositoriesDiscovered: uniqueRepos,
        repositoriesFound: uniqueRepos,
        lastSync: null
      },
      discovery: {
        status: discoveryStatus, // 'pending', 'ready', 'in_progress', 'completed'
        issuesFound: issueMatchesCount,
        repositoriesFound: uniqueRepos,
        canTrigger: technologiesSelected && discoveryStatus === 'ready'
      },
      issues: {
        items: recentIssues,
        total: issueMatchesCount,
        hasMore: issueMatchesCount > recentIssues.length
      },
      dashboardState // 'initial', 'discovering', 'active'
    })
  } catch (error) {
    console.error('Error fetching dashboard state:', error)
    return NextResponse.json(
      { error: 'Failed to fetch dashboard state' },
      { status: 500 }
    )
  }
}