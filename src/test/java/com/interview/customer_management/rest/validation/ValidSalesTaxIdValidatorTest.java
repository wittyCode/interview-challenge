package com.interview.customer_management.rest.validation;

import com.interview.customer_management.customer.rest.validation.ValidSalesTaxIdValidator;
import com.interview.customer_management.customer.rest.validation.SalesTaxIdValidationException;
import jakarta.validation.ConstraintValidatorContext;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.ValueSource;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

@ExtendWith(MockitoExtension.class)
class ValidSalesTaxIdValidatorTest {

  private final ValidSalesTaxIdValidator underTest = new ValidSalesTaxIdValidator();

  @Mock private ConstraintValidatorContext constraintValidatorContextMock;

  @Test
  void givenNullString_whenValidated_isValid() {
    Assertions.assertThat(underTest.isValid(null, constraintValidatorContextMock)).isTrue();
  }

  @ParameterizedTest
  @ValueSource(strings = {"   ", "D", "IT123456789"})
  void givenSimpleInvalidStrings_whenValidated_isInvalidValid(final String idToCheck) {
    Assertions.assertThatThrownBy(
            () -> underTest.isValid(idToCheck, constraintValidatorContextMock))
        .isExactlyInstanceOf(SalesTaxIdValidationException.class);
  }

  @ParameterizedTest
  @ValueSource(
      strings = {
        "DE123456788",
        "ATUA234567Z",
        "FR12123456789",
        "FRAB123456789",
        "DK12345678",
        "GB123456789012",
        "GB123456789",
        "GBHA123",
        "GBGD123",
        "NL123456789012",
        "NLA234567890*+"
      })
  void givenValidString_whenValidated_isValid(final String idToCheck) {
    Assertions.assertThat(underTest.isValid(idToCheck, constraintValidatorContextMock)).isTrue();
  }

  @ParameterizedTest
  @ValueSource(
      strings = {"DE123456789", "DE1234567890", "DE12345678", "DE12345678A", "DEA23456789"})
  void givenGermanInvalidString_whenValidated_isInvalid(final String idToCheck) {
    Assertions.assertThatThrownBy(
            () -> underTest.isValid(idToCheck, constraintValidatorContextMock))
        .isExactlyInstanceOf(SalesTaxIdValidationException.class);
  }

  @ParameterizedTest
  @ValueSource(strings = {"AT123456789", "ATU1234567", "ATU123456789"})
  void givenAustrianInvalidString_whenValidated_isInvalid(final String idToCheck) {
    Assertions.assertThatThrownBy(
            () -> underTest.isValid(idToCheck, constraintValidatorContextMock))
        .isExactlyInstanceOf(SalesTaxIdValidationException.class);
  }

  @ParameterizedTest
  @ValueSource(strings = {"FRAB12345678", "FRAB1234567890", "FRABA23456789", "FRAB12345678Z"})
  void givenFrenchInvalidString_whenValidated_isInvalid(final String idToCheck) {
    Assertions.assertThatThrownBy(
            () -> underTest.isValid(idToCheck, constraintValidatorContextMock))
        .isExactlyInstanceOf(SalesTaxIdValidationException.class);
  }

  @ParameterizedTest
  @ValueSource(strings = {"DK1234567", "DK123456789", "DKA2345678", "DK1234567Z"})
  void givenDanishInvalidString_whenValidated_isInvalid(final String idToCheck) {
    Assertions.assertThatThrownBy(
            () -> underTest.isValid(idToCheck, constraintValidatorContextMock))
        .isExactlyInstanceOf(SalesTaxIdValidationException.class);
  }

  @ParameterizedTest
  @ValueSource(
      strings = {
        "GB1234567890",
        "GB12345678",
        "GB1234567890123",
        "GB12345678901",
        "GBHB123",
        "GBHA12",
        "GBHA1234"
      })
  void givenBritishInvalidString_whenValidated_isInvalid(final String idToCheck) {
    Assertions.assertThatThrownBy(
            () -> underTest.isValid(idToCheck, constraintValidatorContextMock))
        .isExactlyInstanceOf(SalesTaxIdValidationException.class);
  }

  @ParameterizedTest
  @ValueSource(strings = {"NL12345678901", "NL1234567890123"})
  void givenDutchInvalidString_whenValidated_isInvalid(final String idToCheck) {
    Assertions.assertThatThrownBy(
            () -> underTest.isValid(idToCheck, constraintValidatorContextMock))
        .isExactlyInstanceOf(SalesTaxIdValidationException.class);
  }
}
