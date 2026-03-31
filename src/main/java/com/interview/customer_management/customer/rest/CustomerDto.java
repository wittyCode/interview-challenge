package com.interview.customer_management.customer.rest;

import com.interview.customer_management.customer.entity.Countries;
import com.interview.customer_management.customer.rest.validation.ValidSalesTaxId;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import java.time.Instant;

/**
 * DTO containing necessary data to sync data between our Customer interface and REST API consumers.
 * Simple Java Bean supplemented by validation constraints for automated input validation on REST
 * endpoint
 */
public record CustomerDto(
    long id,
    @NotBlank(message = "First name is mandatory.") String firstName,
    @NotBlank(message = "Last name is mandatory.") String lastName,
    @Size(max = 100, message = "Description may only be up to 100 characters") String description,
    String address,
    String zipCode,
    String city,
    Countries country,
    @ValidSalesTaxId(message = "Sales tax id invalid") String salesTaxId,
    Instant createdAtUtc,
    Instant updatedAtUtc) {}
