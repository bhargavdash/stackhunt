// StackHunt - Technologies API
// Phase 2: Technology Interest Management

import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/db'

export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Fetch all technologies with user's selections
    const technologies = await prisma.technology.findMany({
      include: {
        userTechnologies: {
          where: {
            userId: session.user.id
          }
        }
      },
      orderBy: [
        { popularityScore: 'desc' },
        { name: 'asc' }
      ]
    })

    // Transform data to include selection status
    const technologiesWithSelection = technologies.map(tech => ({
      id: tech.id,
      name: tech.name,
      category: tech.category,
      description: tech.description,
      popularityScore: tech.popularityScore,
      iconUrl: tech.iconUrl,
      createdAt: tech.createdAt,
      updatedAt: tech.updatedAt,
      selected: tech.userTechnologies.length > 0,
      skillLevel: tech.userTechnologies[0]?.skillLevel || null
    }))

    return NextResponse.json({ technologies: technologiesWithSelection })
  } catch (error) {
    console.error('Error fetching technologies:', error)
    return NextResponse.json(
      { error: 'Failed to fetch technologies' },
      { status: 500 }
    )
  }
}