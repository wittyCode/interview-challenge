package com.interview.customer_management.customer.service;

import com.interview.customer_management.customer.entity.Customer;
import com.interview.customer_management.customer.entity.CustomerRepository;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * @see CustomerService
 */
@Service
public class CustomerServiceImpl implements CustomerService {

  private final CustomerRepository customerRepository;

  @Autowired
  public CustomerServiceImpl(final CustomerRepository customerRepository) {
    this.customerRepository = customerRepository;
  }

  @Override
  public List<Customer> findAll() {
    return customerRepository.findAll();
  }

  @Override
  public Customer findById(long id) {
    return customerRepository
        .findById(id)
        .orElseThrow(
            () -> new CustomerNotFoundException("Customer with id " + id + " not found in DB."));
  }

  @Override
  public Customer save(final Customer entity) {
    return customerRepository.save(entity);
  }

  @Override
  public void deleteById(long id) {
    customerRepository.deleteById(id);
  }
}
