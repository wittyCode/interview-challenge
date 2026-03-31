import { apiClient } from './apiClient.ts';
import type { Customer } from '../types/customer.ts';

/**
 * axios based CRUD REST API calls
 */
export const getCustomers = async (): Promise<Customer[]> => {
  const response = await apiClient().get('/customers');
  return response.data;
};

export const postCustomer = async (customer: Customer): Promise<Customer> => {
  const response = await apiClient().post('/customers', customer);
  return response.data;
};

export const putCustomer = async (customer: Customer): Promise<Customer> => {
  const response = await apiClient().put('/customers', customer);
  return response.data;
};

export const deleteCustomer = async (customer: Customer): Promise<Customer> => {
  const response = await apiClient().delete(`/customers/${customer.id}`);
  return response.data;
};
