import { useEffect, useState } from 'react';
import type { Customer } from '../types/customer.ts';
import { getCustomers } from '../services/customersApi.ts';

/**
 * utilty function wrapping REST API calls to load customers
 *
 * handles loading indicator and error message as well
 *
 * using useEffect hook to run on component mounting
 */
export function useCustomers() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const loadCustomers = async () => {
    setLoading(true);
    try {
      const response = await getCustomers();
      setCustomers(response);
    } catch (error) {
      console.error('Exception on loading customers from backend', error);
      setError('Error when fetching customer data, check logs for details.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCustomers();
  }, []);

  return { customers, loading, error, loadCustomers };
}
