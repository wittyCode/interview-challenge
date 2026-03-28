package com.interview.customer_management.customer.entity;

import jakarta.persistence.*;

import java.time.Instant;

/** Entity representing a customer in the database */
@Entity
@Table(name = "customers")
public class Customer {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(name = "first_name")
  private String firstName;

  @Column(name = "last_name")
  private String lastName;

  @Column private String description;

  @Column(name = "sales_tax_id")
  private String salesTaxId;

  @Column private String address;

  @Column(name = "zip_code")
  private String zipCode;

  @Column private String city;

  @Column(name = "created_at_utc")
  private Instant createdAtUtc;

  @Column(name = "updated_at_utc")
  private Instant updatedAtUtc;

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

  public String getSalesTaxId() {
    return salesTaxId;
  }

  public void setSalesTaxId(String salesTaxId) {
    this.salesTaxId = salesTaxId;
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

  @PrePersist
  public void initAuditTimestamps() {
      this.createdAtUtc = Instant.now();
      this.updatedAtUtc = Instant.now();
  }

  @PreUpdate
  public void updateAuditTimestamp() {
      this.updatedAtUtc = Instant.now();
  }

  @Override
  public String toString() {
    return "Customer{"
        + "id="
        + id
        + ", firstName='"
        + firstName
        + '\''
        + ", lastName='"
        + lastName
        + '\''
        + ", description='"
        + description
        + '\''
        + ", salesTaxId='"
        + salesTaxId
        + '\''
        + ", address='"
        + address
        + '\''
        + ", zipCode='"
        + zipCode
        + '\''
        + ", city='"
        + city
        + '\''
        + '}';
  }
}
