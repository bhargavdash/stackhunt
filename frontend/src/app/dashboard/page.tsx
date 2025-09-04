"use client"

import { useSession, signOut } from "next-auth/react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { LogOut, Settings, Github } from "lucide-react"
import { ThemeToggle } from "@/components/theme/theme-toggle"
import { StatusBanner } from "@/components/dashboard/status-banner"
import { TechnologyProfileWidget } from "@/components/dashboard/technology-profile-widget"
import { useDashboard } from "@/hooks/use-dashboard"
import { useState } from "react"

export default function DashboardPage() {
  const { data: session, status } = useSession()
  const { dashboardState, loading: dashboardLoading, statusBannerConfig, layoutState, refreshDashboard } = useDashboard()
  const router = useRouter()
  const [isDiscovering, setIsDiscovering] = useState(false)

  if (status === "loading" || dashboardLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    )
  }

  if (status === "unauthenticated") {
    router.push("/auth/signin")
    return null
  }

  const handleSignOut = () => {
    signOut({ callbackUrl: "/" })
  }

  const handleEditStack = () => {
    router.push('/onboarding?step=technologies')
  }

  const handleDiscoverIssues = async () => {
    // Phase 3 implementation placeholder
    setIsDiscovering(true)
    
    // Show a message indicating Phase 3 is coming soon
    setTimeout(() => {
      alert('🚧 Issue Discovery Engine Coming Soon!\n\nPhase 3 implementation will include:\n• GitHub API integration\n• Smart repository search\n• Issue matching algorithm\n• Real-time discovery\n\nFor now, you can edit your technology stack and prepare for the upcoming feature!')
      setIsDiscovering(false)
    }, 1000)
  }

  const handleStatusAction = () => {
    if (statusBannerConfig?.nextAction?.href === '/onboarding') {
      router.push('/onboarding')
    } else if (statusBannerConfig?.nextAction?.href === '#discover-issues') {
      handleDiscoverIssues()
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-800">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-black/[0.02] dark:bg-grid-white/[0.02] -z-10" />
      
      {/* Navigation Header */}
      <header className="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg border-b border-gray-200/50 dark:border-gray-700/50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Github className="h-8 w-8 text-gray-800 dark:text-gray-200" />
              <h1 className="ml-2 text-xl font-semibold text-gray-900 dark:text-gray-100">
                StackHunt
              </h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <ThemeToggle />
              
              <Avatar className="h-8 w-8">
                <AvatarImage src={session?.user?.image || ""} alt={session?.user?.name || ""} />
                <AvatarFallback>
                  {session?.user?.name?.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={handleSignOut}
                className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
            {dashboardState?.user.onboardingCompleted 
              ? `Welcome back, ${session?.user?.name}!`
              : `Welcome, ${session?.user?.name}!`
            }
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            {dashboardState?.user.onboardingCompleted
              ? "Your personalized open source contribution dashboard"
              : "Let's set up your personalized issue discovery"
            }
          </p>
        </div>

        {/* Status Banner */}
        {statusBannerConfig && (
          <StatusBanner 
            config={statusBannerConfig} 
            onActionClick={handleStatusAction}
          />
        )}

        {/* Dynamic Dashboard Content */}
        {dashboardState && layoutState === 'github_connecting' ? (
          // Loading State - Beautiful discovery animation
          <div className="max-w-3xl mx-auto">
            <Card className="border-0 shadow-xl bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm">
              <CardContent className="p-8 text-center">
                <div className="mb-6">
                  <div className="relative">
                    <div className="p-6 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full w-24 h-24 mx-auto mb-6 flex items-center justify-center">
                      <div className="animate-spin rounded-full h-8 w-8 border-3 border-white border-t-transparent"></div>
                    </div>
                    <div className="absolute inset-0 rounded-full bg-blue-500/20 animate-ping w-24 h-24 mx-auto"></div>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-3">
                    🔍 Finding Perfect Issues for You
                  </h3>
                  <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
                    Searching GitHub repositories for issues that match your technologies and skill level...
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
                    <div className="text-2xl mb-2">📊</div>
                    <div className="text-sm font-medium text-gray-900 dark:text-gray-100">Analyzing Repositories</div>
                    <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">Checking project health</div>
                  </div>
                  <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-xl">
                    <div className="text-2xl mb-2">🎯</div>
                    <div className="text-sm font-medium text-gray-900 dark:text-gray-100">Matching Technologies</div>
                    <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">{dashboardState.technologies.selected.map(t => t.technology.name).join(', ')}</div>
                  </div>
                  <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-xl">
                    <div className="text-2xl mb-2">⚡</div>
                    <div className="text-sm font-medium text-gray-900 dark:text-gray-100">Scoring Relevance</div>
                    <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">Finding best matches</div>
                  </div>
                </div>

                <div className="text-sm text-gray-500 dark:text-gray-400">
                  ⏱️ This usually takes 5-10 seconds...
                </div>
              </CardContent>
            </Card>
          </div>
        ) : dashboardState && layoutState === 'active' ? (
          // Active State - Show discovered issues
          <div className="max-w-6xl mx-auto">
            <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                  🔥 Your Issue Feed
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {dashboardState.issues.total} issues found • Updated {new Date().toLocaleTimeString()} 
                </p>
              </div>
              <Button 
                variant="outline"
                onClick={handleDiscoverIssues}
                disabled={isDiscovering}
                className="shrink-0"
              >
                🔍 Discover More
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {dashboardState.issues.items.map((issue, index) => (
                <Card key={issue.id} className="border-0 shadow-lg bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="mb-4">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          <div className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">
                            {issue.repository.name}
                          </div>
                          <h4 className="font-semibold text-gray-900 dark:text-gray-100 line-clamp-2 leading-5">
                            {issue.title}
                          </h4>
                        </div>
                        <div className="ml-2 shrink-0">
                          <div className="flex items-center space-x-1 text-xs text-gray-500">
                            <span>⭐</span>
                            <span>{(issue.repository.stars / 1000).toFixed(1)}k</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex flex-wrap gap-2 mb-3">
                        {issue.labels.slice(0, 2).map((label: any, idx: number) => (
                          <span 
                            key={idx}
                            className="px-2 py-1 text-xs rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300"
                          >
                            {label.name}
                          </span>
                        ))}
                        {issue.isGoodFirstIssue && (
                          <span className="px-2 py-1 text-xs rounded-full bg-green-100 dark:bg-green-800 text-green-700 dark:text-green-300">
                            good-first-issue
                          </span>
                        )}
                      </div>

                      <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 mb-4">
                        <span>⚡ {Math.round(issue.matchScore * 100)}% match</span>
                        <span>{issue.repository.language}</span>
                      </div>

                      <div className="flex space-x-2">
                        <Button 
                          size="sm" 
                          className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white border-0"
                          onClick={() => window.open(issue.url, '_blank')}
                        >
                          View on GitHub
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline"
                          className="shrink-0"
                        >
                          💾
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {dashboardState.issues.hasMore && (
              <div className="text-center mt-8">
                <Button variant="outline" size="lg">
                  📖 Load More Issues
                </Button>
              </div>
            )}
          </div>
        ) : dashboardState && layoutState === 'post_onboarding' ? (
          // Phase 3: Ready to discover issues state
          <div className="max-w-4xl mx-auto">
            <Card className="border-0 shadow-xl bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm">
              <CardContent className="p-8">
                <div className="text-center mb-8">
                  <div className="p-4 bg-gradient-to-br from-green-500 to-emerald-600 rounded-3xl w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                    <span className="text-2xl">✅</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                    Technologies Selected: {dashboardState.technologies.selected.map(t => t.technology.name).join(' • ')}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    We're ready to search GitHub for issues that match your technical interests and skill level
                  </p>
                </div>

                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl p-6 mb-8">
                  <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-3">What we'll find:</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="flex items-center space-x-3">
                      <span className="text-blue-500">🔍</span>
                      <span className="text-sm text-gray-700 dark:text-gray-300">Good first issues for beginners</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className="text-green-500">🤝</span>
                      <span className="text-sm text-gray-700 dark:text-gray-300">Help wanted issues needing contributors</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className="text-purple-500">🏘️</span>
                      <span className="text-sm text-gray-700 dark:text-gray-300">Projects with active communities</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className="text-orange-500">🎯</span>
                      <span className="text-sm text-gray-700 dark:text-gray-300">Issues matching your skill level</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button 
                    size="lg"
                    className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white border-0 shadow-lg px-8"
                    onClick={handleDiscoverIssues}
                    disabled={isDiscovering}
                  >
                    {isDiscovering ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Discovering Issues...
                      </>
                    ) : (
                      '🎯 Discover My Issues'
                    )}
                  </Button>
                  <Button 
                    variant="outline"
                    size="lg"
                    className="px-8"
                    onClick={handleEditStack}
                  >
                    📝 Edit Technologies
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        ) : (
          // Clean Welcome State - Single focused call-to-action
          <div className="max-w-2xl mx-auto">
            <Card className="border-0 shadow-xl bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm">
              <CardContent className="p-12 text-center">
                <div className="mb-8">
                  <div className="p-4 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-3xl w-20 h-20 mx-auto mb-6 flex items-center justify-center">
                    <Github className="h-10 w-10 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-3">
                    Find Your Perfect Open Source Issues
                  </h3>
                  <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
                    Tell us about your technical interests and we'll find relevant GitHub issues for you to contribute to
                  </p>
                </div>

                <Button 
                  size="lg"
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white border-0 shadow-lg px-8 py-4 text-lg"
                  onClick={() => router.push('/onboarding')}
                >
                  🚀 Choose Technologies
                </Button>

                <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                    What you'll get:
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
                    <div className="flex items-center space-x-3">
                      <span className="text-green-500">✓</span>
                      <span className="text-sm text-gray-600 dark:text-gray-400">Good first issues for beginners</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className="text-green-500">✓</span>
                      <span className="text-sm text-gray-600 dark:text-gray-400">Help wanted issues needing contributors</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className="text-green-500">✓</span>
                      <span className="text-sm text-gray-600 dark:text-gray-400">Projects with active communities</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className="text-green-500">✓</span>
                      <span className="text-sm text-gray-600 dark:text-gray-400">Issues matching your skill level</span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 text-xs text-gray-400 dark:text-gray-500">
                  💫 Join more developers finding perfect issues
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </main>
    </div>
  )
}