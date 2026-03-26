package com.lexware.customer_management.rest;

import com.lexware.customer_management.service.CustomerService;
import com.lexware.customer_management.service.CustomerServiceImpl;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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

  @GetMapping
  public List<CustomerDto> findAll() {
    final var customers = customerService.findAll();
    return customers.stream().map(customerDtoMapper::entityToDto).toList();
  }

  @GetMapping("/{id}")
  public CustomerDto findCustomer(@PathVariable final long id) {
    final var customer = customerService.findById(id);
    return customerDtoMapper.entityToDto(customer);
  }

  @PostMapping
  public ResponseEntity<CustomerDto> create(@Valid @RequestBody final CustomerDto customerDto) {
    // setting id to null will lead to DB creating new id from sequence
    customerDto.setId(null);
    var customerEntity = customerDtoMapper.dtoToEntity(customerDto);
    customerEntity = customerService.save(customerEntity);
    final var result = customerDtoMapper.entityToDto(customerEntity);
    return new ResponseEntity<>(result, HttpStatus.CREATED);
  }
}
