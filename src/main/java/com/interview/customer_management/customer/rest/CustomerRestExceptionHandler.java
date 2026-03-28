package com.interview.customer_management.customer.rest;

import com.interview.customer_management.customer.rest.validation.SalesTaxIdValidationException;
import com.interview.customer_management.customer.rest.validation.SalesTaxValidationErrorCode;
import com.interview.customer_management.customer.rest.validation.SalesTaxValidationErrorResponse;
import com.interview.customer_management.customer.service.CustomerNotFoundException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

/** global exception handler for validations on customer REST API */
@ControllerAdvice
public class CustomerRestExceptionHandler {

  private static final Logger LOGGER = LoggerFactory.getLogger(CustomerRestExceptionHandler.class);

  @ExceptionHandler
  public ResponseEntity<SalesTaxValidationErrorResponse> handleException(
      SalesTaxIdValidationException ex) {
    LOGGER.warn("Error occurred when validating CustomerDto Sales tax id on REST API", ex);

    final var errorResponse =
        new SalesTaxValidationErrorResponse(
            SalesTaxValidationErrorCode.SALES_TAX_ID_VALIDATION_ERROR, System.currentTimeMillis());

    return new ResponseEntity<>(errorResponse, HttpStatus.BAD_REQUEST);
  }

  @ExceptionHandler
  public ResponseEntity<SalesTaxValidationErrorResponse> handleException(
      MethodArgumentNotValidException ex) {
    LOGGER.warn("Error occurred when validating CustomerDto input values on REST API", ex);
    final var errorResponse =
        new SalesTaxValidationErrorResponse(
            SalesTaxValidationErrorCode.BASIC_VALIADATION_ERROR, System.currentTimeMillis());

    return new ResponseEntity<>(errorResponse, HttpStatus.BAD_REQUEST);
  }

  @ExceptionHandler
  public ResponseEntity<String> handleException(CustomerNotFoundException ex) {
    LOGGER.warn("Customer could not be found in DB on REST API call", ex);
    return new ResponseEntity<>("Customer not found for given ID", HttpStatus.NOT_FOUND);
  }
}
