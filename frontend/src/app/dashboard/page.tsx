"use client"

import { useSession, signOut } from "next-auth/react"
import { redirect } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { LogOut, Settings, Github } from "lucide-react"
import { ThemeToggle } from "@/components/theme/theme-toggle"

export default function DashboardPage() {
  const { data: session, status } = useSession()

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    )
  }

  if (status === "unauthenticated") {
    redirect("/auth/signin")
  }

  const handleSignOut = () => {
    signOut({ callbackUrl: "/" })
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
            Welcome back, {session?.user?.name}!
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Your personalized open source contribution dashboard
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Getting Started Card */}
          <Card className="border-0 shadow-lg bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center text-xl">
                <div className="p-2 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg mr-3">
                  <Settings className="h-5 w-5 text-white" />
                </div>
                Getting Started
              </CardTitle>
              <CardDescription className="text-base">
                Set up your preferences to start discovering relevant issues
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-sm">
                <div className="flex items-center space-x-3 p-2 rounded-lg bg-blue-50 dark:bg-blue-900/20">
                  <span className="text-lg">📝</span>
                  <span className="text-gray-700 dark:text-gray-300">Define your technical interests</span>
                </div>
                <div className="flex items-center space-x-3 p-2 rounded-lg bg-green-50 dark:bg-green-900/20">
                  <span className="text-lg">🔗</span>
                  <span className="text-gray-700 dark:text-gray-300">Link your GitHub account</span>
                </div>
                <div className="flex items-center space-x-3 p-2 rounded-lg bg-purple-50 dark:bg-purple-900/20">
                  <span className="text-lg">🎯</span>
                  <span className="text-gray-700 dark:text-gray-300">Customize notification preferences</span>
                </div>
                <div className="flex items-center space-x-3 p-2 rounded-lg bg-orange-50 dark:bg-orange-900/20">
                  <span className="text-lg">📊</span>
                  <span className="text-gray-700 dark:text-gray-300">Start tracking issues</span>
                </div>
              </div>
              <Button className="w-full mt-6 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white border-0 shadow-lg" disabled>
                Complete Setup
                <span className="ml-2 text-sm opacity-75">(Phase 2)</span>
              </Button>
            </CardContent>
          </Card>

          {/* User Info Card */}
          <Card className="border-0 shadow-lg bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center text-xl">
                <Avatar className="h-8 w-8 mr-3">
                  <AvatarImage src={session?.user?.image || ""} alt={session?.user?.name || ""} />
                  <AvatarFallback className="bg-gradient-to-br from-green-500 to-green-600 text-white">
                    {session?.user?.name?.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                Your Profile
              </CardTitle>
              <CardDescription className="text-base">Account information and settings</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-3 rounded-lg bg-gray-50 dark:bg-gray-800">
                  <p className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-1">Email</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{session?.user?.email}</p>
                </div>
                <div className="p-3 rounded-lg bg-gray-50 dark:bg-gray-800">
                  <p className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-1">Name</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{session?.user?.name}</p>
                </div>
                <div className="p-3 rounded-lg bg-gray-50 dark:bg-gray-800">
                  <p className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-1">GitHub</p>
                  <p className="text-sm text-orange-600 dark:text-orange-400">Not linked yet</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Coming Soon Card */}
          <Card className="border-0 shadow-lg bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center text-xl">
                <div className="p-2 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg mr-3">
                  <Github className="h-5 w-5 text-white" />
                </div>
                Issue Feed
              </CardTitle>
              <CardDescription className="text-base">Relevant issues will appear here</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <div className="p-4 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 rounded-2xl w-fit mx-auto mb-4">
                  <Github className="h-12 w-12 text-gray-400 dark:text-gray-500" />
                </div>
                <p className="font-medium text-gray-900 dark:text-gray-100 mb-2">No issues yet</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">Complete setup to start discovering issues</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}