package com.interview.customer_management.customer.entity;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * Customer repository that contains all methods necessary for CRUD operations on Customer entities
 * based on Spring Data JPA - provides all necessary database operations out of the box and makes
 * sure transactional context is defined and handled
 */
public interface CustomerRepository extends JpaRepository<Customer, Long> {

  List<Customer> findAllByOrderById();
}
