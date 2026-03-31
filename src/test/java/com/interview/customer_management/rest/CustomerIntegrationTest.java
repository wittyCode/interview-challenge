package com.interview.customer_management.rest;

import static io.restassured.RestAssured.given;
import static io.restassured.RestAssured.when;
import static org.hamcrest.Matchers.equalTo;
import static org.hamcrest.Matchers.hasSize;

import com.interview.customer_management.customer.entity.Countries;
import com.interview.customer_management.customer.rest.CustomerDto;
import io.restassured.RestAssured;
import io.restassured.http.ContentType;
import java.time.Instant;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.server.LocalServerPort;
import org.springframework.test.context.ActiveProfiles;
import org.testcontainers.junit.jupiter.Testcontainers;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@Testcontainers
@ActiveProfiles("test-containers")
public class CustomerIntegrationTest {

  private static final String FIRST_NAME = "firstName";
  private static final String LAST_NAME = "lastName";
  private static final int EXPECTED_ID = 1;
  private static final String FOO = "foo";
  private static final String FOO_UPDATED = "fooUpdated";
  public static final String API_PATH = "/api/customers";

  @LocalServerPort private Integer port;

  @BeforeEach
  void setUp() {
    RestAssured.baseURI = "http://localhost:" + port;
  }

  @Test
  void givenEmptyDB_whenDoingCRUD_operationsWork() {
    given()
        .body(validCustomerDto())
        .contentType(ContentType.JSON)
        .when()
        .post(API_PATH)
        .then()
        .statusCode(200)
        .body("id", equalTo(EXPECTED_ID))
        .body("description", equalTo(FOO));

    given()
        .contentType(ContentType.JSON)
        .when()
        .get(API_PATH)
        .then()
        .statusCode(200)
        .body(".", hasSize(1));

    given()
        .body(updatedCustomerDto())
        .contentType(ContentType.JSON)
        .when()
        .put(API_PATH)
        .then()
        .statusCode(200)
        .body("id", equalTo(EXPECTED_ID))
        .body("description", equalTo(FOO_UPDATED));

    when().delete(API_PATH + "/" + EXPECTED_ID).then().statusCode(200);

    given()
        .contentType(ContentType.JSON)
        .when()
        .get(API_PATH)
        .then()
        .statusCode(200)
        .body(".", hasSize(0));
  }

  private CustomerDto updatedCustomerDto() {
    return new CustomerDto(
        EXPECTED_ID,
        FIRST_NAME,
        LAST_NAME,
        FOO_UPDATED,
        "home 123",
        "01234",
        "hometown",
        Countries.AT,
        "DE123456788",
        Instant.now(),
        Instant.now());
  }

  private CustomerDto validCustomerDto() {
    return new CustomerDto(
        0,
        FIRST_NAME,
        LAST_NAME,
        FOO,
        "home 123",
        "01234",
        "hometown",
        Countries.AT,
        "DE123456788",
        Instant.now(),
        Instant.now());
  }
}
