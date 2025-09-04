"use client"

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { TechnologySelector } from '@/components/technology/technology-selector'
import { Technology, TechnologySelection } from '@/types/technology'
import { ChevronRight, CheckCircle, Loader2, ArrowRight } from 'lucide-react'

interface OnboardingStep {
  id: string
  title: string
  description: string
  icon: string
}

const ONBOARDING_STEPS: OnboardingStep[] = [
  {
    id: 'welcome',
    title: 'Welcome to StackHunt',
    description: 'Let\'s personalize your experience',
    icon: '👋'
  },
  {
    id: 'technologies',
    title: 'Select Your Technologies',
    description: 'Choose the technologies you work with',
    icon: '🛠️'
  },
  {
    id: 'complete',
    title: 'All Set!',
    description: 'Your profile is ready',
    icon: '🎉'
  }
]

export default function OnboardingPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const searchParams = useSearchParams()
  const [currentStep, setCurrentStep] = useState(0)
  const [technologies, setTechnologies] = useState<Technology[]>([])
  const [selectedTechnologies, setSelectedTechnologies] = useState<TechnologySelection[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isSaving, setIsSaving] = useState(false)

  // Handle URL step parameter and redirect if not authenticated
  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin')
      return
    }

    // Check for step parameter in URL
    const stepParam = searchParams?.get('step')
    if (stepParam === 'technologies') {
      setCurrentStep(1) // Technology selection step
    }
  }, [status, router, searchParams])

  // Fetch technologies
  useEffect(() => {
    if (session?.user) {
      fetchTechnologies()
    }
  }, [session])

  const fetchTechnologies = async () => {
    try {
      setIsLoading(true)
      const response = await fetch('/api/technologies')
      if (response.ok) {
        const data = await response.json()
        setTechnologies(data.technologies)
        
        // Set existing selections if any
        const existingSelections = data.technologies
          .filter((tech: any) => tech.selected)
          .map((tech: any) => ({
            technologyId: tech.id,
            skillLevel: tech.skillLevel || 'intermediate'
          }))
        setSelectedTechnologies(existingSelections)
      }
    } catch (error) {
      console.error('Error fetching technologies:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleNext = () => {
    if (currentStep < ONBOARDING_STEPS.length - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleFinishOnboarding = async () => {
    try {
      setIsSaving(true)
      
      // Save technology selections
      const response = await fetch('/api/user-technologies', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          selections: selectedTechnologies
        })
      })

      if (response.ok) {
        // Mark onboarding as complete (will implement in user preferences API)
        // For now, just redirect to dashboard
        router.push('/dashboard?onboarding=complete')
      } else {
        throw new Error('Failed to save selections')
      }
    } catch (error) {
      console.error('Error finishing onboarding:', error)
    } finally {
      setIsSaving(false)
    }
  }

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  if (!session) {
    return null
  }

  const currentStepData = ONBOARDING_STEPS[currentStep]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-800">
      {/* Progress Steps */}
      <div className="w-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg border-b border-gray-200/50 dark:border-gray-700/50">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            {ONBOARDING_STEPS.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                  index <= currentStep
                    ? 'border-blue-500 bg-blue-500 text-white'
                    : 'border-gray-300 dark:border-gray-700 text-gray-400'
                }`}>
                  {index < currentStep ? (
                    <CheckCircle className="h-5 w-5" />
                  ) : (
                    <span className="text-sm font-medium">{index + 1}</span>
                  )}
                </div>
                
                <div className="ml-3 hidden sm:block">
                  <p className={`text-sm font-medium ${
                    index <= currentStep ? 'text-blue-600 dark:text-blue-400' : 'text-gray-400'
                  }`}>
                    {step.title}
                  </p>
                </div>
                
                {index < ONBOARDING_STEPS.length - 1 && (
                  <ChevronRight className="h-5 w-5 text-gray-400 mx-4" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <div className="text-4xl mb-4">{currentStepData.icon}</div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
            {currentStepData.title}
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            {currentStepData.description}
          </p>
        </div>

        <Card className="border-0 shadow-lg">
          <CardContent className="p-8">
            {currentStep === 0 && (
              <WelcomeStep 
                user={session.user}
                onNext={handleNext}
              />
            )}
            
            {currentStep === 1 && (
              <TechnologyStep
                technologies={technologies}
                selectedTechnologies={selectedTechnologies}
                onSelectionChange={setSelectedTechnologies}
                isLoading={isLoading}
                onNext={handleNext}
                onBack={handleBack}
              />
            )}
            
            {currentStep === 2 && (
              <CompleteStep
                selectedTechnologies={selectedTechnologies}
                technologies={technologies}
                onFinish={handleFinishOnboarding}
                onBack={handleBack}
                isSaving={isSaving}
              />
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

interface WelcomeStepProps {
  user: any
  onNext: () => void
}

function WelcomeStep({ user, onNext }: WelcomeStepProps) {
  return (
    <div className="text-center space-y-6">
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">
          Welcome, {user.name?.split(' ')[0]}! 👋
        </h2>
        <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
          StackHunt helps you discover relevant GitHub issues based on your technical interests. 
          Let's set up your profile so we can find the perfect contribution opportunities for you.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-8">
        <div className="text-center p-4">
          <div className="text-2xl mb-2">🎯</div>
          <h3 className="font-medium">Personalized Matching</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Issues matched to your skills and interests
          </p>
        </div>
        <div className="text-center p-4">
          <div className="text-2xl mb-2">📧</div>
          <h3 className="font-medium">Smart Notifications</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Get notified about relevant issues as they're created
          </p>
        </div>
        <div className="text-center p-4">
          <div className="text-2xl mb-2">🚀</div>
          <h3 className="font-medium">Contribution Tracking</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Track your open source contributions and growth
          </p>
        </div>
      </div>
      
      <Button onClick={onNext} size="lg" className="w-full sm:w-auto">
        Let's Get Started
        <ArrowRight className="ml-2 h-4 w-4" />
      </Button>
    </div>
  )
}

interface TechnologyStepProps {
  technologies: Technology[]
  selectedTechnologies: TechnologySelection[]
  onSelectionChange: (selections: TechnologySelection[]) => void
  isLoading: boolean
  onNext: () => void
  onBack: () => void
}

function TechnologyStep({
  technologies,
  selectedTechnologies,
  onSelectionChange,
  isLoading,
  onNext,
  onBack
}: TechnologyStepProps) {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-semibold mb-2">
          What technologies do you work with?
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Select up to 10 technologies that you use or want to contribute to. 
          You can always update these later.
        </p>
      </div>
      
      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin" />
          <span className="ml-2">Loading technologies...</span>
        </div>
      ) : (
        <TechnologySelector
          technologies={technologies}
          selectedTechnologies={selectedTechnologies}
          onSelectionChange={onSelectionChange}
          maxSelections={10}
        />
      )}
      
      <div className="flex justify-between pt-6 border-t">
        <Button variant="outline" onClick={onBack}>
          Back
        </Button>
        <Button 
          onClick={onNext}
          disabled={selectedTechnologies.length === 0}
        >
          Continue ({selectedTechnologies.length} selected)
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}

interface CompleteStepProps {
  selectedTechnologies: TechnologySelection[]
  technologies: Technology[]
  onFinish: () => void
  onBack: () => void
  isSaving: boolean
}

function CompleteStep({ 
  selectedTechnologies, 
  technologies, 
  onFinish, 
  onBack, 
  isSaving 
}: CompleteStepProps) {
  const selectedTechDetails = selectedTechnologies.map(selection => {
    const tech = technologies.find(t => t.id === selection.technologyId)
    return { ...selection, technology: tech }
  }).filter(item => item.technology)

  return (
    <div className="text-center space-y-6">
      <div>
        <h2 className="text-2xl font-semibold mb-2">
          Perfect! You're all set 🎉
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          We'll start finding relevant GitHub issues based on your selected technologies.
        </p>
      </div>
      
      <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
        <h3 className="font-medium mb-4">Your Technology Profile</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {selectedTechDetails.map(item => (
            <div 
              key={item.technologyId}
              className="flex items-center justify-between p-3 bg-white dark:bg-gray-700 rounded-lg"
            >
              <span className="font-medium">{item.technology?.name}</span>
              <span className="text-sm text-gray-600 dark:text-gray-400 capitalize">
                {item.skillLevel}
              </span>
            </div>
          ))}
        </div>
      </div>
      
      <div className="flex justify-between pt-6 border-t">
        <Button variant="outline" onClick={onBack} disabled={isSaving}>
          Back
        </Button>
        <Button onClick={onFinish} disabled={isSaving} size="lg">
          {isSaving ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Setting up your profile...
            </>
          ) : (
            <>
              Complete Setup
              <CheckCircle className="ml-2 h-4 w-4" />
            </>
          )}
        </Button>
      </div>
    </div>
  )
}