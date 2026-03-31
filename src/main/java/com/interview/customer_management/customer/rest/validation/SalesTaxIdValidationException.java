package com.interview.customer_management.customer.rest.validation;

/** Exception thrown when Sales Tax IDs are marked as invalid by DTO validator */
public class SalesTaxIdValidationException extends RuntimeException {

  public SalesTaxIdValidationException(String message) {
    super(message);
  }
}
