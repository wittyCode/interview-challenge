package com.interview.customer_management.customer.rest.validation;

import jakarta.validation.Constraint;
import jakarta.validation.Payload;
import java.lang.annotation.*;

/**
 * annotation to mark dto fields that sales tax id validation should be applied on
 */
@Target({ElementType.FIELD})
@Retention(RetentionPolicy.RUNTIME)
@Constraint(validatedBy = ValidSalesTaxIdValidator.class)
@Documented
public @interface ValidSalesTaxId {

  Class<?>[] groups() default {};

  Class<? extends Payload>[] payload() default {};

  String message() default "{ValidSalesTaxId.message}";
}
