// StackHunt - User Technologies API
// Phase 2: Technology Interest Management

import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/db'
import { z } from 'zod'

// Validation schema
const updateUserTechnologiesSchema = z.object({
  selections: z.array(z.object({
    technologyId: z.string(),
    skillLevel: z.enum(['beginner', 'intermediate', 'advanced'])
  }))
})

export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Fetch user's technology selections
    const userTechnologies = await prisma.userTechnology.findMany({
      where: {
        userId: session.user.id
      },
      include: {
        technology: true
      }
    })

    return NextResponse.json({ userTechnologies })
  } catch (error) {
    console.error('Error fetching user technologies:', error)
    return NextResponse.json(
      { error: 'Failed to fetch user technologies' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const validation = updateUserTechnologiesSchema.safeParse(body)
    
    if (!validation.success) {
      return NextResponse.json(
        { error: 'Invalid request data', details: validation.error.issues },
        { status: 400 }
      )
    }

    const { selections } = validation.data

    // Use transaction to update user technologies
    await prisma.$transaction(async (tx) => {
      // First, delete all existing user technology selections
      await tx.userTechnology.deleteMany({
        where: {
          userId: session.user.id
        }
      })

      // Then create new selections
      if (selections.length > 0) {
        await tx.userTechnology.createMany({
          data: selections.map(selection => ({
            userId: session.user.id!,
            technologyId: selection.technologyId,
            skillLevel: selection.skillLevel
          }))
        })
      }

      // Mark onboarding as completed when user selects technologies
      await tx.userPreferences.upsert({
        where: {
          userId: session.user.id!
        },
        create: {
          userId: session.user.id!,
          onboardingCompleted: true
        },
        update: {
          onboardingCompleted: true
        }
      })
    })

    // Fetch updated user technologies with technology details
    const updatedUserTechnologies = await prisma.userTechnology.findMany({
      where: {
        userId: session.user.id
      },
      include: {
        technology: true
      }
    })

    return NextResponse.json({ 
      success: true,
      userTechnologies: updatedUserTechnologies 
    })
  } catch (error) {
    console.error('Error updating user technologies:', error)
    return NextResponse.json(
      { error: 'Failed to update user technologies' },
      { status: 500 }
    )
  }
}