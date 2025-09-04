// StackHunt - Status Banner Component
// Phase 2.5: Dynamic Dashboard Implementation

"use client"

import { Button } from "@/components/ui/button"
import { CheckCircle, Clock, Github, Settings } from "lucide-react"
import { StatusBannerConfig } from "@/types/dashboard"

interface StatusBannerProps {
  config: StatusBannerConfig
  onActionClick?: () => void
}

export function StatusBanner({ config, onActionClick }: StatusBannerProps) {
  const getStatusIcon = () => {
    switch (config.state) {
      case 'post_onboarding':
        return <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
      case 'github_connecting':
        return <Clock className="h-5 w-5 text-blue-600 dark:text-blue-400 animate-spin" />
      case 'active':
        return <Github className="h-5 w-5 text-purple-600 dark:text-purple-400" />
      default:
        return <Settings className="h-5 w-5 text-orange-600 dark:text-orange-400" />
    }
  }

  const getBannerStyles = () => {
    switch (config.state) {
      case 'post_onboarding':
        return 'bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 border-green-200 dark:border-green-800'
      case 'github_connecting':
        return 'bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border-blue-200 dark:border-blue-800'
      case 'active':
        return 'bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border-purple-200 dark:border-purple-800'
      default:
        return 'bg-gradient-to-r from-orange-50 to-yellow-50 dark:from-orange-900/20 dark:to-yellow-900/20 border-orange-200 dark:border-orange-800'
    }
  }

  return (
    <div className={`border rounded-lg p-4 mb-6 ${getBannerStyles()}`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          {getStatusIcon()}
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-gray-100">
              {config.message}
            </h3>
            {config.metrics && (
              <div className="flex items-center space-x-4 mt-1 text-sm text-gray-600 dark:text-gray-400">
                {config.metrics.technologiesSelected && (
                  <span className="flex items-center">
                    <CheckCircle className="h-3 w-3 mr-1 text-green-500" />
                    {config.metrics.technologiesSelected} technologies selected
                  </span>
                )}
                {config.metrics.repositoriesFound && (
                  <span className="flex items-center">
                    <Github className="h-3 w-3 mr-1 text-blue-500" />
                    {config.metrics.repositoriesFound} repositories found
                  </span>
                )}
                {config.metrics.issuesAvailable && (
                  <span className="flex items-center">
                    <span className="h-3 w-3 mr-1 text-purple-500">🎯</span>
                    {config.metrics.issuesAvailable} issues available
                  </span>
                )}
              </div>
            )}
          </div>
        </div>
        
        {config.nextAction && (
          <Button
            onClick={onActionClick}
            className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white"
          >
            {config.nextAction.label}
          </Button>
        )}
      </div>
    </div>
  )
}