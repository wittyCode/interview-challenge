package com.interview.customer_management.customer.rest.validation;

/** response sent to caller when errors on validating a customer occur */
public record CustomerValidationErrorResponse(
    CustomerValidationErrorCode message, long timestamp) {}
