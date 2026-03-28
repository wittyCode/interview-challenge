package com.interview.customer_management.customer.service;

/**
 * Exception signifying when a customer could not be found in DB
 */
public class CustomerNotFoundException extends RuntimeException {

  public CustomerNotFoundException(String message) {
    super(message);
  }
}
