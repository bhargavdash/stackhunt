"use client"

import { useSession } from "next-auth/react"
import { redirect } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Github, Zap, Bell, Target } from "lucide-react"
import Link from "next/link"
import { ThemeToggle } from "@/components/theme/theme-toggle"

export default function HomePage() {
  const { data: session, status } = useSession()

  // Redirect authenticated users to dashboard
  if (session) {
    redirect("/dashboard")
  }

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-800">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-black/[0.02] dark:bg-grid-white/[0.02] -z-10" />
      
      {/* Navigation */}
      <header className="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg border-b border-gray-200/50 dark:border-gray-700/50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Github className="h-8 w-8 text-gray-800 dark:text-gray-200" />
              <span className="ml-2 text-xl font-bold text-gray-900 dark:text-gray-100">
                OSS Issue Tracker
              </span>
            </div>
            
            <div className="flex items-center space-x-4">
              <ThemeToggle />
              <Link href="/auth/signin">
                <Button variant="default">
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-20 relative">
          {/* Floating gradient orbs */}
          <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-300/20 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
          <div className="absolute top-0 -right-4 w-72 h-72 bg-yellow-300/20 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-1000"></div>
          <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300/20 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-500"></div>
          
          <div className="relative z-10">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-gray-100 mb-6 leading-tight">
              Discover Relevant{" "}
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 dark:from-blue-400 dark:via-purple-400 dark:to-indigo-400 bg-clip-text text-transparent">
                Open Source Issues
              </span>
            </h1>
            <p className="text-xl sm:text-2xl text-gray-600 dark:text-gray-400 mb-10 max-w-4xl mx-auto leading-relaxed">
              Stop manually checking GitHub repositories. Get personalized notifications when new issues 
              match your technical interests and skill level.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Link href="/auth/signin">
                <Button size="lg" className="text-lg px-10 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white border-0 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-200">
                  🚀 Start Contributing Today
                </Button>
              </Link>
              <Button variant="outline" size="lg" className="text-lg px-10 py-4 border-2 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-200" disabled>
                🎥 Watch Demo
                <span className="ml-2 text-sm text-gray-500">(Coming Soon)</span>
              </Button>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          <Card className="text-center group hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
            <CardHeader className="pb-8">
              <div className="mx-auto bg-gradient-to-br from-blue-500 to-blue-600 dark:from-blue-400 dark:to-blue-500 p-4 rounded-2xl w-fit mb-6 shadow-lg group-hover:shadow-blue-500/25 group-hover:scale-110 transition-all duration-300">
                <Target className="h-8 w-8 text-white" />
              </div>
              <CardTitle className="text-xl mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">Smart Matching</CardTitle>
              <CardDescription className="text-base leading-relaxed">
                Advanced algorithm matches issues to your technical interests and skill level with precision
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="text-center group hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
            <CardHeader className="pb-8">
              <div className="mx-auto bg-gradient-to-br from-green-500 to-green-600 dark:from-green-400 dark:to-green-500 p-4 rounded-2xl w-fit mb-6 shadow-lg group-hover:shadow-green-500/25 group-hover:scale-110 transition-all duration-300">
                <Bell className="h-8 w-8 text-white" />
              </div>
              <CardTitle className="text-xl mb-3 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">Proactive Notifications</CardTitle>
              <CardDescription className="text-base leading-relaxed">
                Get notified immediately or in daily/weekly digests when relevant issues are opened
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="text-center group hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
            <CardHeader className="pb-8">
              <div className="mx-auto bg-gradient-to-br from-purple-500 to-purple-600 dark:from-purple-400 dark:to-purple-500 p-4 rounded-2xl w-fit mb-6 shadow-lg group-hover:shadow-purple-500/25 group-hover:scale-110 transition-all duration-300">
                <Zap className="h-8 w-8 text-white" />
              </div>
              <CardTitle className="text-xl mb-3 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">Automated Discovery</CardTitle>
              <CardDescription className="text-base leading-relaxed">
                Continuously monitors repositories and discovers new contribution opportunities
              </CardDescription>
            </CardHeader>
          </Card>
        </div>

        {/* How it Works */}
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-8">
            How It Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="flex flex-col items-center">
              <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold mb-4">1</div>
              <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">Sign Up</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Connect with your Google account</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold mb-4">2</div>
              <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">Set Interests</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Define your technical skills and interests</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold mb-4">3</div>
              <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">Get Matched</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Receive personalized issue recommendations</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold mb-4">4</div>
              <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">Contribute</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Start contributing to meaningful projects</p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <Card className="max-w-3xl mx-auto bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-900 border-0 shadow-2xl">
            <CardHeader className="pb-6">
              <CardTitle className="text-3xl font-bold mb-4">Ready to Start Contributing?</CardTitle>
              <CardDescription className="text-lg">
                Join thousands of developers who are already discovering their perfect contribution opportunities
              </CardDescription>
            </CardHeader>
            <CardContent className="pb-8">
              <Link href="/auth/signin">
                <Button size="lg" className="text-lg px-12 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white border-0 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-200">
                  🚀 Sign Up with Google
                </Button>
              </Link>
              <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
                Free forever • No credit card required • Set up in 2 minutes
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
