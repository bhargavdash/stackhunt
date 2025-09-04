"use client"

import { useState, useMemo } from 'react'
import { Search, Check, X, Filter } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  Technology, 
  TechnologyWithSelection, 
  SkillLevel, 
  TechnologyCategory,
  CATEGORY_INFO,
  SKILL_LEVELS,
  TechnologySelection 
} from '@/types/technology'

interface TechnologySelectorProps {
  technologies: Technology[]
  selectedTechnologies: TechnologySelection[]
  onSelectionChange: (selections: TechnologySelection[]) => void
  maxSelections?: number
}

export function TechnologySelector({
  technologies,
  selectedTechnologies,
  onSelectionChange,
  maxSelections = 10
}: TechnologySelectorProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<TechnologyCategory | 'all'>('all')
  const [showOnlySelected, setShowOnlySelected] = useState(false)

  // Create technologies with selection state
  const technologiesWithSelection = useMemo(() => {
    return technologies.map(tech => ({
      ...tech,
      selected: selectedTechnologies.some(s => s.technologyId === tech.id),
      skillLevel: selectedTechnologies.find(s => s.technologyId === tech.id)?.skillLevel
    }))
  }, [technologies, selectedTechnologies])

  // Filter and search technologies
  const filteredTechnologies = useMemo(() => {
    return technologiesWithSelection
      .filter(tech => {
        // Search filter
        if (searchTerm && !tech.name.toLowerCase().includes(searchTerm.toLowerCase()) && 
            !tech.description?.toLowerCase().includes(searchTerm.toLowerCase())) {
          return false
        }
        
        // Category filter
        if (selectedCategory !== 'all' && tech.category !== selectedCategory) {
          return false
        }
        
        // Show only selected filter
        if (showOnlySelected && !tech.selected) {
          return false
        }
        
        return true
      })
      .sort((a, b) => {
        // Sort by: selected first, then popularity
        if (a.selected && !b.selected) return -1
        if (!a.selected && b.selected) return 1
        return b.popularityScore - a.popularityScore
      })
  }, [technologiesWithSelection, searchTerm, selectedCategory, showOnlySelected])

  // Group technologies by category for display
  const groupedTechnologies = useMemo(() => {
    const groups: Record<TechnologyCategory, TechnologyWithSelection[]> = {
      language: [],
      framework: [],
      tool: [],
      domain: []
    }
    
    filteredTechnologies.forEach(tech => {
      groups[tech.category].push(tech)
    })
    
    return groups
  }, [filteredTechnologies])

  const handleTechnologyToggle = (technology: Technology) => {
    const isSelected = selectedTechnologies.some(s => s.technologyId === technology.id)
    
    if (isSelected) {
      // Remove technology
      onSelectionChange(selectedTechnologies.filter(s => s.technologyId !== technology.id))
    } else if (selectedTechnologies.length < maxSelections) {
      // Add technology with default skill level
      onSelectionChange([
        ...selectedTechnologies,
        { technologyId: technology.id, skillLevel: 'intermediate' }
      ])
    }
  }

  const handleSkillLevelChange = (technologyId: string, skillLevel: SkillLevel) => {
    onSelectionChange(
      selectedTechnologies.map(selection =>
        selection.technologyId === technologyId
          ? { ...selection, skillLevel }
          : selection
      )
    )
  }

  const categories = Object.keys(CATEGORY_INFO) as TechnologyCategory[]

  return (
    <div className="space-y-6">
      {/* Search and Filters */}
      <div className="space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search technologies..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <div className="flex flex-wrap items-center gap-2">
          <Button
            variant={selectedCategory === 'all' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedCategory('all')}
          >
            <Filter className="h-4 w-4 mr-2" />
            All
          </Button>
          
          {categories.map(category => (
            <Button
              key={category}
              variant={selectedCategory === category ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedCategory(category)}
            >
              <span className="mr-2">{CATEGORY_INFO[category].icon}</span>
              {CATEGORY_INFO[category].name}
            </Button>
          ))}
          
          <Button
            variant={showOnlySelected ? 'default' : 'outline'}
            size="sm"
            onClick={() => setShowOnlySelected(!showOnlySelected)}
          >
            <Check className="h-4 w-4 mr-2" />
            Selected ({selectedTechnologies.length})
          </Button>
        </div>
      </div>

      {/* Selection Summary */}
      {selectedTechnologies.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">
              Selected Technologies ({selectedTechnologies.length}/{maxSelections})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {selectedTechnologies.map(selection => {
                const tech = technologies.find(t => t.id === selection.technologyId)
                if (!tech) return null
                
                return (
                  <div key={selection.technologyId} className="flex items-center gap-2">
                    <Badge variant="secondary" className="flex items-center gap-2">
                      <span>{tech.name}</span>
                      <div className="flex">
                        {(['beginner', 'intermediate', 'advanced'] as SkillLevel[]).map(level => (
                          <button
                            key={level}
                            onClick={() => handleSkillLevelChange(selection.technologyId, level)}
                            className={`px-1 py-0.5 text-xs rounded transition-colors ${
                              selection.skillLevel === level
                                ? 'bg-blue-500 text-white'
                                : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-300 dark:hover:bg-gray-600'
                            }`}
                            title={SKILL_LEVELS[level].description}
                          >
                            {SKILL_LEVELS[level].icon}
                          </button>
                        ))}
                      </div>
                      <button
                        onClick={() => handleTechnologyToggle(tech)}
                        className="text-gray-500 hover:text-red-500 transition-colors"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Technology Grid by Category */}
      {selectedCategory === 'all' ? (
        <div className="space-y-8">
          {categories.map(category => {
            const categoryTechs = groupedTechnologies[category]
            if (categoryTechs.length === 0) return null
            
            return (
              <TechnologyCategorySection
                key={category}
                category={category}
                technologies={categoryTechs}
                onTechnologyToggle={handleTechnologyToggle}
                onSkillLevelChange={handleSkillLevelChange}
                maxSelections={maxSelections}
                currentSelections={selectedTechnologies.length}
              />
            )
          })}
        </div>
      ) : (
        <TechnologyCategorySection
          category={selectedCategory}
          technologies={groupedTechnologies[selectedCategory]}
          onTechnologyToggle={handleTechnologyToggle}
          onSkillLevelChange={handleSkillLevelChange}
          maxSelections={maxSelections}
          currentSelections={selectedTechnologies.length}
        />
      )}
      
      {filteredTechnologies.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 dark:text-gray-400">
            No technologies found matching your criteria
          </p>
        </div>
      )}
    </div>
  )
}

interface TechnologyCategorySectionProps {
  category: TechnologyCategory
  technologies: TechnologyWithSelection[]
  onTechnologyToggle: (technology: Technology) => void
  onSkillLevelChange: (technologyId: string, skillLevel: SkillLevel) => void
  maxSelections: number
  currentSelections: number
}

function TechnologyCategorySection({
  category,
  technologies,
  onTechnologyToggle,
  onSkillLevelChange,
  maxSelections,
  currentSelections
}: TechnologyCategorySectionProps) {
  if (technologies.length === 0) return null
  
  const categoryInfo = CATEGORY_INFO[category]
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span>{categoryInfo.icon}</span>
          {categoryInfo.name}
          <Badge variant="outline">{technologies.length}</Badge>
        </CardTitle>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          {categoryInfo.description}
        </p>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {technologies.map(tech => (
            <TechnologyCard
              key={tech.id}
              technology={tech}
              onToggle={onTechnologyToggle}
              onSkillLevelChange={onSkillLevelChange}
              disabled={!tech.selected && currentSelections >= maxSelections}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

interface TechnologyCardProps {
  technology: TechnologyWithSelection
  onToggle: (technology: Technology) => void
  onSkillLevelChange: (technologyId: string, skillLevel: SkillLevel) => void
  disabled?: boolean
}

function TechnologyCard({ 
  technology, 
  onToggle, 
  onSkillLevelChange, 
  disabled 
}: TechnologyCardProps) {
  return (
    <div
      className={`p-3 border rounded-lg cursor-pointer transition-all ${
        technology.selected
          ? 'border-blue-500 bg-blue-50 dark:bg-blue-950/50'
          : disabled
          ? 'border-gray-200 dark:border-gray-800 opacity-50 cursor-not-allowed'
          : 'border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700'
      }`}
      onClick={() => !disabled && onToggle(technology)}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h3 className="font-medium text-sm truncate">
              {technology.name}
            </h3>
            {technology.selected && (
              <Check className="h-4 w-4 text-blue-500 flex-shrink-0" />
            )}
          </div>
          {technology.description && (
            <p className="text-xs text-gray-600 dark:text-gray-400 mt-1 line-clamp-2">
              {technology.description}
            </p>
          )}
        </div>
        
        <Badge 
          variant="outline" 
          className="text-xs flex-shrink-0 ml-2"
        >
          {technology.popularityScore}
        </Badge>
      </div>
      
      {technology.selected && technology.skillLevel && (
        <div className="mt-3 pt-2 border-t border-gray-200 dark:border-gray-700">
          <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">Skill Level:</p>
          <div className="flex gap-1">
            {(['beginner', 'intermediate', 'advanced'] as SkillLevel[]).map(level => (
              <button
                key={level}
                onClick={(e) => {
                  e.stopPropagation()
                  onSkillLevelChange(technology.id, level)
                }}
                className={`px-2 py-1 text-xs rounded transition-colors ${
                  technology.skillLevel === level
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-300 dark:hover:bg-gray-600'
                }`}
                title={SKILL_LEVELS[level].description}
              >
                {SKILL_LEVELS[level].icon} {SKILL_LEVELS[level].name}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}