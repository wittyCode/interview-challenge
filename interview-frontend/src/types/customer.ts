export interface Customer {
  id: number;
  firstName: string;
  lastName: string;
  description: string;
  salesTaxId: string;
  address: string;
  zipCode?: string;
  city: string;
  country?: string;
  createdAtUtc?: Date;
  updatedAtUtc?: Date;
}

export type CountryOption = {
  isoCode: string;
  name: string;
};

export const countries: CountryOption[] = [
  { isoCode: 'DE', name: 'Deutschland' },
  { isoCode: 'AT', name: 'Österreich' },
  { isoCode: 'FR', name: 'Frankreich' },
  { isoCode: 'GB', name: 'Großbritannien' },
  { isoCode: 'DK', name: 'Dänemark' },
  { isoCode: 'NL', name: 'Niederlande' },
];
