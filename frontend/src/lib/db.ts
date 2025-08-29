import { PrismaClient } from '@prisma/client'

declare global {
  var prisma: PrismaClient | undefined
}

// Singleton pattern for Prisma client
// Prevents multiple instances in development due to hot reloading
export const prisma =
  globalThis.prisma ??
  new PrismaClient({
    log: ['query'],
  })

if (process.env.NODE_ENV !== 'production') globalThis.prisma = prisma

export default prisma