import { generateAtom } from '@/lib/feed'
import type { APIContext } from 'astro'

export const GET = (context: APIContext) => generateAtom(context)
