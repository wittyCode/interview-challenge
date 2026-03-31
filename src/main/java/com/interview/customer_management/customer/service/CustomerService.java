package com.interview.customer_management.customer.service;

import com.interview.customer_management.customer.entity.Customer;
import java.util.List;

/**
 * Customer service interface that contains all methods necessary for CRUD operations on Customer
 * entities
 */
public interface CustomerService {

  /**
   * @return all customers in DB
   */
  List<Customer> findAll();

  /**
   * @return customer entity with given ID in DB
   */
  Customer findById(final long id);

  /**
   * save automatically creates new entity when given id is 0, else updates existing entity
   *
   * @return updated entity from DB
   */
  Customer save(final Customer customer);

  /** delete customer with given ID in DB if customer did not exist, silently aknowledge */
  void deleteById(final long id);
}
