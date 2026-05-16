export const CURRENCY = 'EGP';

export const museumTicketPrices = {
  egyptian_adult: 200,
  egyptian_student: 100,
  egyptian_child: 100,
  foreigner_adult: 1450,
  foreigner_student: 730,
  foreigner_child: 730,
} as const;

export type MuseumTicketCategory = keyof typeof museumTicketPrices;

export const robotTourPrices = {
  standard: 200,
  personalized: 350,
} as const;

export type RobotTourPriceKey = keyof typeof robotTourPrices;

export const ticketPrices = {
  adult: museumTicketPrices.egyptian_adult,
  student: museumTicketPrices.egyptian_student,
  child: museumTicketPrices.egyptian_child,
};

export const formatEgp = (amount: number) => `${amount} ${CURRENCY}`;
