package com.interview.customer_management.customer.rest;

import com.interview.customer_management.customer.entity.Customer;
import org.mapstruct.Mapper;

/**
 * mapper between CustomerDto and Customer entities, based on MapStruct
 */
@Mapper(componentModel = "spring")
public interface CustomerDtoMapper {
  CustomerDto entityToDto(final Customer customer);

  Customer dtoToEntity(final CustomerDto customerDto);
}
