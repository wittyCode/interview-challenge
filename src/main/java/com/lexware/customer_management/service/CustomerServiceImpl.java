package com.lexware.customer_management.service;

import com.lexware.customer_management.entity.Customer;
import com.lexware.customer_management.entity.CustomerRepository;
import com.lexware.customer_management.errorhandling.CustomerNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

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
  @Transactional
  public Customer save(final Customer entity) {
    return customerRepository.save(entity);
  }

  @Override
  public void deleteById(long id) {
    customerRepository.deleteById(id);
  }
}
