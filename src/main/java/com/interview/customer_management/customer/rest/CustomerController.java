package com.interview.customer_management.customer.rest;

import com.interview.customer_management.customer.service.CustomerService;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/customers")
public class CustomerController {

  private final CustomerService customerService;
  private final CustomerDtoMapper customerDtoMapper;

  @Autowired
  public CustomerController(
      final CustomerService customerService, final CustomerDtoMapper customerDtoMapper) {
    this.customerService = customerService;
    this.customerDtoMapper = customerDtoMapper;
  }

  @Tag(name = "Read", description = "Find customers in DB")
  @GetMapping
  public List<CustomerDto> findAll() {
    final var customers = customerService.findAll();
    return customers.stream().map(customerDtoMapper::entityToDto).toList();
  }

  @Tag(name = "Read")
  @GetMapping("/{id}")
  public CustomerDto findCustomer(@PathVariable final long id) {
    final var customer = customerService.findById(id);
    return customerDtoMapper.entityToDto(customer);
  }

  @Tag(name = "Create", description = "Create new customer in DB")
  @PostMapping
  public CustomerDto create(@Valid @RequestBody final CustomerDto customerDto) {
    // setting id to null will lead to DB creating new id from sequence, which is what we want on
    // POST endpoint
    customerDto.setId(null);
    return saveToDB(customerDto);
  }

  @Tag(name = "Update", description = "Update customer in DB")
  @PutMapping
  public CustomerDto update(@Valid @RequestBody final CustomerDto customerDto) {
    return saveToDB(customerDto);
  }

  @Tag(name = "Delete", description = "Delete customer from DB")
  @DeleteMapping("/{id}")
  public ResponseEntity<String> deleteById(@PathVariable final long id) {
    customerService.deleteById(id);
    final var message = "Successfully deleted customer with id " + id;
    return new ResponseEntity<>(message, HttpStatus.OK);
  }

  private CustomerDto saveToDB(final CustomerDto customerDto) {
    var customerEntity = customerDtoMapper.dtoToEntity(customerDto);
    customerEntity = customerService.save(customerEntity);
    // resulting entity contains all updated fields, mostly important for ID field after creation
    return customerDtoMapper.entityToDto(customerEntity);
  }
}
