package com.interview.customer_management.customer.service;

import com.interview.customer_management.customer.entity.Customer;
import java.util.List;

/**
 * Customer service interface that contains all methods necessary for CRUD operations on Customer
 * entities
 */
public interface CustomerService {

  /**
   * @return all customers, ordered by Id
   */
  List<Customer> findAllOrderById();

  Customer findById(final long id);

  Customer save(final Customer customer);

  void deleteById(final long id);
}
