import { countries } from '../types/customer.ts';

/**
 * utilty function to map from an isoCode of a CountyOption to it's display name
 */
export default function useCountryCodeToNameMapping(isoCode: string) {
  const country = countries.find((country) => country.isoCode === isoCode);
  if (country) {
    return country.name;
  }
  return '';
}
