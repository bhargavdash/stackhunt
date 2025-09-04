// StackHunt - Technology Types
// Phase 2: Technology Interest Management

export interface Technology {
  id: string
  name: string
  category: 'language' | 'framework' | 'tool' | 'domain'
  description?: string
  popularityScore: number
  iconUrl?: string
  createdAt: Date
  updatedAt: Date
}

export interface UserTechnology {
  id: string
  userId: string
  technologyId: string
  skillLevel: 'beginner' | 'intermediate' | 'advanced'
  technology?: Technology
  createdAt: Date
  updatedAt: Date
}

export type SkillLevel = 'beginner' | 'intermediate' | 'advanced'
export type TechnologyCategory = 'language' | 'framework' | 'tool' | 'domain'

export interface TechnologySelection {
  technologyId: string
  skillLevel: SkillLevel
}

export interface TechnologyWithSelection extends Technology {
  selected?: boolean
  skillLevel?: SkillLevel
}

// Category metadata for UI display
export const CATEGORY_METADATA = {
  language: {
    label: 'Programming Languages',
    icon: '💻',
    description: 'Core programming languages you work with',
    color: 'blue'
  },
  framework: {
    label: 'Frameworks & Libraries', 
    icon: '🔧',
    description: 'Frameworks, libraries, and development tools',
    color: 'green'
  },
  tool: {
    label: 'Tools & Platforms',
    icon: '⚡',
    description: 'Development tools, databases, and platforms',
    color: 'purple'
  },
  domain: {
    label: 'Domains & Specializations',
    icon: '🎯',
    description: 'Areas of expertise and specialization',
    color: 'orange'
  }
} as const

// Skill level metadata
export const SKILL_LEVELS = {
  beginner: {
    display: 'Beginner',
    description: 'Learning the basics, comfortable with tutorials',
    color: 'text-green-600 dark:text-green-400',
    icon: '🌱'
  },
  intermediate: {
    display: 'Intermediate', 
    description: 'Can build projects, some production experience',
    color: 'text-blue-600 dark:text-blue-400',
    icon: '🚀'
  },
  advanced: {
    display: 'Advanced',
    description: 'Expert level, can architect and lead projects',
    color: 'text-purple-600 dark:text-purple-400',
    icon: '🏆'
  }
} as const

// Backward compatibility alias for CATEGORY_INFO
export const CATEGORY_INFO = CATEGORY_METADATA