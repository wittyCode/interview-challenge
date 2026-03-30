import { useEffect, useState } from 'react';
import type { Customer } from '../types/customer.ts';
import { getCustomers } from '../services/customersApi.ts';

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
