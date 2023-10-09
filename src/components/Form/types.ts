import { z } from "zod";
import { ticketTypeSchema, ticketTypeOptions, TicketType } from "../../types";

export const userDataSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  address: z.string().min(1),
  cardNumber: z.string().regex(/^\d{4}\s\d{4}\s\d{4}\s\d{4}$/),
  expiration: z.string().regex(/^\d{2}\/\d{2}$/),
  cvv: z.string().regex(/^\d{3,4}$/),
});

export const cartSchema = z.record(
  ticketTypeOptions,
  z.object({
    quantity: z.number().min(0),
    metadata: ticketTypeSchema,
  })
);

export const formSchema = z.object({
  userData: userDataSchema,
  cart: cartSchema,
});

export type FormValues = z.infer<typeof formSchema>;

export type CartEntry = {
  quantity: number;
  metadata: TicketType;
};

export type Cart = Record<string, CartEntry>;