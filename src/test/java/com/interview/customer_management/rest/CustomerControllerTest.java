package com.interview.customer_management.rest;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.interview.customer_management.customer.entity.Countries;
import com.interview.customer_management.customer.rest.CustomerController;
import com.interview.customer_management.customer.rest.CustomerDto;
import com.interview.customer_management.customer.rest.CustomerDtoMapper;
import com.interview.customer_management.customer.service.CustomerService;
import java.time.Instant;
import java.util.stream.Stream;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.Arguments;
import org.junit.jupiter.params.provider.MethodSource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.webmvc.test.autoconfigure.WebMvcTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.MockMvc;
import tools.jackson.databind.ObjectMapper;

@ExtendWith(SpringExtension.class)
@WebMvcTest(controllers = CustomerController.class)
class CustomerControllerTest {

  private static final String TOO_LONG_DESCRIPTION =
      "12345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901";
  private static final String FIRST_NAME = "firstName";
  private static final String LAST_NAME = "lastName";

  @Autowired private MockMvc mockMvc;

  @Autowired private ObjectMapper objectMapper;

  @MockitoBean private CustomerService customerService;

  @MockitoBean private CustomerDtoMapper customerDtoMapper;

  @ParameterizedTest
  @MethodSource("provideInvalidCustomerDtos")
  void whenInputIsInvalid_return400(final CustomerDto input) throws Exception {
    final var body = objectMapper.writeValueAsString(input);
    mockMvc
        .perform(post("/api/customers").contentType(MediaType.APPLICATION_JSON).content(body))
        .andExpect(status().isBadRequest());
  }

  @Test
  void whenInputInvalid_return200() throws Exception {
    final var body = objectMapper.writeValueAsString(validCustomerDto());
    mockMvc
        .perform(post("/api/customers").contentType(MediaType.APPLICATION_JSON).content(body))
        .andExpect(status().isOk());
  }

  private static Stream<Arguments> provideInvalidCustomerDtos() {
    return Stream.of(
        Arguments.of(
            new CustomerDto(0, null, LAST_NAME, null, null, null, null, null, null, null, null)),
        Arguments.of(
            new CustomerDto(0, FIRST_NAME, null, null, null, null, null, null, null, null, null)),
        Arguments.of(
            new CustomerDto(
                0,
                FIRST_NAME,
                LAST_NAME,
                TOO_LONG_DESCRIPTION,
                null,
                null,
                null,
                null,
                null,
                null,
                null)));
  }

  private CustomerDto validCustomerDto() {
    return new CustomerDto(
        0,
        FIRST_NAME,
        LAST_NAME,
        "foo",
        "home 123",
        "01234",
        "hometown",
        Countries.GB,
        "DE123456788",
        Instant.now(),
        Instant.now());
  }
}
