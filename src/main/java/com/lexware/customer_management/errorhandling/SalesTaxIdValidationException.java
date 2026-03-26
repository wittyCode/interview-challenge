package com.lexware.customer_management.errorhandling;

public class SalesTaxIdValidationException extends RuntimeException {

  public SalesTaxIdValidationException(String message) {
    super(message);
  }
}
