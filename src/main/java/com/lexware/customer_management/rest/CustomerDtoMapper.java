package com.lexware.customer_management.rest;

import com.lexware.customer_management.entity.Customer;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface CustomerDtoMapper {
  CustomerDto entityToDto(final Customer customer);

  Customer dtoToEntity(final CustomerDto customerDto);
}
