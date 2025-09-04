// StackHunt - Technology Profile Widget
// Phase 2.5: Dynamic Dashboard Implementation

"use client"

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ChevronDown, ChevronUp, Edit, Plus } from "lucide-react"
import { UserTechnology, SKILL_LEVELS, CATEGORY_METADATA } from "@/types/technology"
import { DashboardTechnologies } from "@/types/dashboard"

interface TechnologyProfileWidgetProps {
  technologies: DashboardTechnologies
  onEditStack?: () => void
  displayMode?: 'expanded' | 'collapsed' | 'preview'
}

export function TechnologyProfileWidget({ 
  technologies, 
  onEditStack,
  displayMode = 'expanded' 
}: TechnologyProfileWidgetProps) {
  const [isExpanded, setIsExpanded] = useState(displayMode === 'expanded')
  
  if (technologies.count === 0) {
    return (
      <Card className="border-0 shadow-lg bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center text-xl">
            <div className="p-2 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg mr-3">
              <span className="text-white text-lg">🛠️</span>
            </div>
            Your Tech Stack
          </CardTitle>
          <CardDescription>Define your technical interests to get started</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <div className="p-4 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 rounded-2xl w-fit mx-auto mb-4">
              <span className="text-4xl">🎯</span>
            </div>
            <p className="font-medium text-gray-900 dark:text-gray-100 mb-2">No technologies selected</p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
              Select your technologies to start discovering relevant issues
            </p>
            <Button 
              onClick={onEditStack}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Technologies
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  // Group technologies by category
  const groupedTechnologies = technologies.selected.reduce((acc, userTech) => {
    const category = userTech.technology.category
    if (!acc[category]) {
      acc[category] = []
    }
    acc[category].push(userTech)
    return acc
  }, {} as Record<string, UserTechnology[]>)

  const renderTechnologyBadge = (userTech: UserTechnology) => {
    const skillLevel = SKILL_LEVELS[userTech.skillLevel as keyof typeof SKILL_LEVELS]
    return (
      <div
        key={userTech.id}
        className="flex items-center space-x-2 p-2 rounded-lg bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
      >
        <Badge variant="secondary" className="text-xs">
          {userTech.technology.name}
        </Badge>
        <Badge 
          variant="outline" 
          className={`text-xs ${skillLevel.color}`}
        >
          {skillLevel.display}
        </Badge>
      </div>
    )
  }

  const previewTechnologies = technologies.selected.slice(0, 6)
  const hasMore = technologies.count > 6

  return (
    <Card className="border-0 shadow-lg bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center justify-between text-xl">
          <div className="flex items-center">
            <div className="p-2 bg-gradient-to-br from-green-500 to-green-600 rounded-lg mr-3">
              <span className="text-white text-lg">🛠️</span>
            </div>
            <div>
              <span>Your Tech Stack</span>
              <span className="ml-2 text-sm font-normal text-gray-500 dark:text-gray-400">
                ({technologies.count})
              </span>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            {displayMode === 'expanded' && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsExpanded(!isExpanded)}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              </Button>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={onEditStack}
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              <Edit className="h-4 w-4" />
            </Button>
          </div>
        </CardTitle>
        <CardDescription>
          Technologies you're interested in contributing to
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        {displayMode === 'preview' || !isExpanded ? (
          // Preview mode or collapsed view
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-2">
              {previewTechnologies.map(renderTechnologyBadge)}
            </div>
            {hasMore && (
              <div className="text-center">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsExpanded(true)}
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                >
                  + {technologies.count - 6} more technologies
                </Button>
              </div>
            )}
          </div>
        ) : (
          // Full expanded view
          <div className="space-y-6">
            {Object.entries(groupedTechnologies).map(([category, techs]) => {
              const categoryMeta = CATEGORY_METADATA[category as keyof typeof CATEGORY_METADATA]
              return (
                <div key={category}>
                  <div className="flex items-center space-x-2 mb-3">
                    <span className="text-lg">{categoryMeta.icon}</span>
                    <h4 className="font-medium text-gray-900 dark:text-gray-100">
                      {categoryMeta.label} ({techs.length})
                    </h4>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {techs.map(renderTechnologyBadge)}
                  </div>
                </div>
              )
            })}
          </div>
        )}

        <div className="mt-6 flex items-center justify-between">
          <p className="text-xs text-gray-500 dark:text-gray-400">
            {technologies.lastUpdated && (
              <>Last updated {new Date(technologies.lastUpdated).toLocaleDateString()}</>
            )}
          </p>
          <div className="flex space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={onEditStack}
              className="text-xs"
            >
              <Edit className="h-3 w-3 mr-1" />
              Edit Stack
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}