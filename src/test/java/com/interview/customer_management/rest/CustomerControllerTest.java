package com.interview.customer_management.rest;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

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
public class CustomerControllerTest {

  private static final String TOO_LONG_DESCRIPTION =
      "12345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901";
  private static final String FIRST_NAME = "firstName";
  private static final String LAST_NAME = "lastName";
  private static final String TOO_SHORT_ZIPCODE = "0123";
  private static final String TOO_LONG_ZIPCODE = "012345";
  private static final String ZIP_CODE_WITH_LETTER = "0123A";

  @Autowired private MockMvc mockMvc;

  @Autowired private ObjectMapper objectMapper;

  @MockitoBean private CustomerService customerService;

  @MockitoBean private CustomerDtoMapper customerDtoMapper;

  @ParameterizedTest
  @MethodSource("provideInvalidCustomerDtos")
  void whenInputIsInvalid_return400(CustomerDto input) throws Exception {
    String body = objectMapper.writeValueAsString(input);
    mockMvc
        .perform(post("/api/customers").contentType(MediaType.APPLICATION_JSON).content(body))
        .andExpect(status().isBadRequest());
  }

  @Test
  void whenInputInvalid_return200() throws Exception {
    String body = objectMapper.writeValueAsString(validCustomerDto());
    mockMvc
        .perform(post("/api/customers").contentType(MediaType.APPLICATION_JSON).content(body))
        .andExpect(status().isOk());
  }

  private static Stream<Arguments> provideInvalidCustomerDtos() {
    return Stream.of(
        Arguments.of(new CustomerDto(0, null, LAST_NAME, null, null, null, null, null, null, null)),
        Arguments.of(
            new CustomerDto(0, FIRST_NAME, null, null, null, null, null, null, null, null)),
        Arguments.of(
            new CustomerDto(
                0, FIRST_NAME, LAST_NAME, null, null, TOO_SHORT_ZIPCODE, null, null, null, null)),
        Arguments.of(
            new CustomerDto(
                0, FIRST_NAME, LAST_NAME, null, null, TOO_LONG_ZIPCODE, null, null, null, null)),
        Arguments.of(
            new CustomerDto(
                0,
                FIRST_NAME,
                LAST_NAME,
                null,
                null,
                ZIP_CODE_WITH_LETTER,
                null,
                null,
                null,
                null)),
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
        "DE123456788",
        Instant.now(),
        Instant.now());
  }
}
