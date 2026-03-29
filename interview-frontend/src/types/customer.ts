export interface Customer {
  id: number;
  firstName: string;
  lastName: string;
  description: string;
  salesTaxId: string;
  address: string;
  zipCode: string;
  city: string;
  createdAtUtc: Date;
  updatedAtUtc: Date;
}
