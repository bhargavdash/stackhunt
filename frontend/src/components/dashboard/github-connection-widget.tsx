// StackHunt - GitHub Connection Widget
// Phase 2.5: Dynamic Dashboard Implementation

"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Github, ExternalLink, Clock, CheckCircle } from "lucide-react"
import { DashboardGitHub } from "@/types/dashboard"

interface GitHubConnectionWidgetProps {
  github: DashboardGitHub
  onConnect?: () => void
  onDisconnect?: () => void
  onResync?: () => void
}

export function GitHubConnectionWidget({ 
  github, 
  onConnect,
  onDisconnect,
  onResync 
}: GitHubConnectionWidgetProps) {
  
  if (github.connected) {
    return (
      <Card className="border-0 shadow-lg bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center text-xl">
            <div className="p-2 bg-gradient-to-br from-green-500 to-green-600 rounded-lg mr-3">
              <CheckCircle className="h-5 w-5 text-white" />
            </div>
            GitHub Connected
          </CardTitle>
          <CardDescription>Your GitHub account is linked and active</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 rounded-lg bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800">
              <div className="flex items-center space-x-3 mb-3">
                <Github className="h-5 w-5 text-green-600 dark:text-green-400" />
                <span className="font-medium text-green-900 dark:text-green-100">
                  @{github.username}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-green-700 dark:text-green-300 font-medium">Repositories Found</p>
                  <p className="text-green-600 dark:text-green-400">{github.repositoriesFound}</p>
                </div>
                <div>
                  <p className="text-green-700 dark:text-green-300 font-medium">Last Sync</p>
                  <p className="text-green-600 dark:text-green-400">
                    {github.lastSync ? new Date(github.lastSync).toLocaleDateString() : 'Never'}
                  </p>
                </div>
              </div>
            </div>

            {github.syncInProgress && (
              <div className="p-3 rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4 text-blue-600 dark:text-blue-400 animate-spin" />
                  <span className="text-sm text-blue-700 dark:text-blue-300">
                    Syncing repositories...
                  </span>
                </div>
              </div>
            )}

            <div className="flex space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={onResync}
                disabled={github.syncInProgress}
                className="flex-1"
              >
                <Github className="h-4 w-4 mr-2" />
                Resync
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={onDisconnect}
                className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"
              >
                Disconnect
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  // Not connected state
  return (
    <Card className="border-0 shadow-lg bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center text-xl">
          <div className="p-2 bg-gradient-to-br from-gray-700 to-gray-800 rounded-lg mr-3">
            <Github className="h-5 w-5 text-white" />
          </div>
          Connect GitHub
        </CardTitle>
        <CardDescription>Link your GitHub account to discover relevant issues</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="p-4 rounded-lg bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-800 dark:to-blue-900/20 border border-gray-200 dark:border-gray-700">
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-blue-100 dark:bg-blue-900/40 rounded-lg">
                  <span className="text-lg">🔍</span>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-gray-100">Discover Issues</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Find issues matching your tech stack automatically
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-green-100 dark:bg-green-900/40 rounded-lg">
                  <span className="text-lg">⚡</span>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-gray-100">Real-time Updates</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Get notified when new issues are posted
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-purple-100 dark:bg-purple-900/40 rounded-lg">
                  <span className="text-lg">🎯</span>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-gray-100">Smart Matching</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Issues filtered by your skill level and interests
                  </p>
                </div>
              </div>
            </div>
          </div>

          <Button 
            onClick={onConnect}
            className="w-full bg-gradient-to-r from-gray-700 to-gray-800 hover:from-gray-800 hover:to-gray-900 text-white"
          >
            <Github className="h-4 w-4 mr-2" />
            Connect GitHub Account
            <ExternalLink className="h-4 w-4 ml-2" />
          </Button>

          <div className="text-center">
            <p className="text-xs text-gray-500 dark:text-gray-400">
              We only access public repositories and issues.{' '}
              <span className="text-blue-600 dark:text-blue-400 hover:underline cursor-pointer">
                Learn more about permissions
              </span>
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}