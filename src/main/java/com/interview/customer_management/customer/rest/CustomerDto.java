package com.interview.customer_management.customer.rest;

import com.interview.customer_management.customer.rest.validation.ValidSalesTaxId;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

import java.time.Instant;

// TODO doc and decide whether to create toString / equals / hashCode

/**
 * DTO containing necessary data to sync data between our Customer interface and REST API consumers.
 * Simple Java Bean supplemented by validation constraints for automated input validation on REST endpoint
 */
public class CustomerDto {

  private Long id;

  @NotBlank(message = "First name is mandatory")
  private String firstName;

  @NotBlank(message = "Last name is mandatory")
  private String lastName;

  @Size(max = 100, message = "Description may only be up to 100 characters")
  private String description;

  private String address;

  @Pattern(regexp = "[0-9]{5}", message = "ZIP codes must be exactly 5 digits long")
  private String zipCode;

  private String city;

  @ValidSalesTaxId(message = "Sales tax id invalid")
  private String salesTaxId;

  private Instant createdAtUtc;
  private Instant updatedAtUtc;

  public CustomerDto() {}

  public CustomerDto(
      final Long id,
      final String firstName,
      final String lastName,
      final String description,
      final String address,
      final String zipCode,
      final String city,
      final String salesTaxId,
      final Instant createdAtUtc,
      final Instant updatedAtUtc) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.description = description;
    this.address = address;
    this.zipCode = zipCode;
    this.city = city;
    this.salesTaxId = salesTaxId;
    this.createdAtUtc = createdAtUtc;
    this.updatedAtUtc = updatedAtUtc;
  }

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public String getFirstName() {
    return firstName;
  }

  public void setFirstName(String firstName) {
    this.firstName = firstName;
  }

  public String getLastName() {
    return lastName;
  }

  public void setLastName(String lastName) {
    this.lastName = lastName;
  }

  public String getDescription() {
    return description;
  }

  public void setDescription(String description) {
    this.description = description;
  }

  public String getAddress() {
    return address;
  }

  public void setAddress(String address) {
    this.address = address;
  }

  public String getZipCode() {
    return zipCode;
  }

  public void setZipCode(String zipCode) {
    this.zipCode = zipCode;
  }

  public String getCity() {
    return city;
  }

  public void setCity(String city) {
    this.city = city;
  }

  public String getSalesTaxId() {
    return salesTaxId;
  }

  public void setSalesTaxId(String salesTaxId) {
    this.salesTaxId = salesTaxId;
  }

  public Instant getCreatedAtUtc() {
    return createdAtUtc;
  }

  public void setCreatedAtUtc(Instant createdAtUtc) {
    this.createdAtUtc = createdAtUtc;
  }

  public Instant getUpdatedAtUtc() {
    return updatedAtUtc;
  }

  public void setUpdatedAtUtc(Instant updatedAtUtc) {
    this.updatedAtUtc = updatedAtUtc;
  }
}
