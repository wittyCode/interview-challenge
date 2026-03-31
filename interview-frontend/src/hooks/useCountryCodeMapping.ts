import { countries } from '../types/customer.ts';

export default function useCountryCodeToNameMapping(isoCode: string) {
  const country = countries.find((country) => country.isoCode === isoCode);
  if (country) {
    return country.name;
  }
  return '';
}
