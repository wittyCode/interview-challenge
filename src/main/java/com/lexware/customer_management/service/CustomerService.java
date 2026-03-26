package com.lexware.customer_management.service;

import com.lexware.customer_management.entity.Customer;

import java.util.List;

// TODO DOC
public interface CustomerService {

  List<Customer> findAll();

  Customer findById(final long id);

  Customer save(final Customer customer);

  void deleteById(final long id);
}
