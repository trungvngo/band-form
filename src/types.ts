import { z } from 'zod';

export const ticketTypeOptions = z.union([z.literal('general'), z.literal('vip'), z.literal('meet-and-greet')]);

export const ticketTypeSchema = z.object({
    type: ticketTypeOptions,
    name: z.string(),
    description: z.string(),
    cost: z.number()
})

export type TicketType = z.infer<typeof ticketTypeSchema>

const bandDataSchema = z.object({
    name: z.string(),
    id: z.string(),
    date: z.number(),
    location: z.string(),
    description_blurb: z.string(),
    imgUrl: z.string().url(),
    ticketTypes: z.array(ticketTypeSchema)
})

export type BandData = z.infer<typeof bandDataSchema>

export const bandDataListSchema = z.array(bandDataSchema)
