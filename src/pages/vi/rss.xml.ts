import { generateRSS } from '@/lib/feed'
import type { APIContext } from 'astro'

export const GET = (context: APIContext) => generateRSS(context)
