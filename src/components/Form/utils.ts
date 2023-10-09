import { BandData, TicketType } from "../../types";
import { Cart, FormValues } from "./types";

export const formatCost = (cost: number) => {
  const dollars = cost / 100;
  return `$${dollars.toFixed(0)}`;
};

export const initializeCart = (ticketTypes: BandData["ticketTypes"]): Cart =>
  ticketTypes.reduce((acc, cur) => {
    return {
      ...acc,
      [cur.type]: {
        quantity: 0,
        metadata: {
          ...cur,
        },
      },
    };
  }, {});

export const getInitialState = (ticketTypes: TicketType[]): FormValues => {
  return {
    userData: {
      firstName: "",
      lastName: "",
      address: "",
      cardNumber: "",
      expiration: "",
      cvv: "",
    },
    cart: initializeCart(ticketTypes),
  };
};

export const calcTotal = (cart: Cart): number =>
  Object.values(cart).reduce((acc, { quantity, metadata }) => {
    const amount = quantity * (metadata.cost / 100);
    return acc + amount;
  }, 0);