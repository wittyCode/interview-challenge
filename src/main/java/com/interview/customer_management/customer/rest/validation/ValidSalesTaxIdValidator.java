package com.interview.customer_management.customer.rest.validation;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

/**
 * Custom validator for Sales Tax Ids. Checks whether given sales tax ids conform to the rules
 * defined in
 *
 * @see <a
 *     href="https://www.bzst.de/SharedDocs/Downloads/DE/Merkblaetter/ust_idnr_aufbau.pdf?__blob=publicationFile&v=4">Bundeszentralamt
 *     für Steuern</a> for GB @see <a
 *     href="https://de.wikipedia.org/wiki/Umsatzsteuer-Identifikationsnummer#Aufbau_der_Identifikationsnummer">Wikipedia</a>
 */
public class ValidSalesTaxIdValidator implements ConstraintValidator<ValidSalesTaxId, String> {

  private static final int COUNTRY_CODE_MIN_LENGTH = 2;

  @Override
  public void initialize(final ValidSalesTaxId constraintAnnotation) {
    ConstraintValidator.super.initialize(constraintAnnotation);
  }

  @Override
  public boolean isValid(
      final String salesTaxIdToValidate,
      final ConstraintValidatorContext constraintValidatorContext) {
    // since sales tax id is not mandatory, can return early if field is null / not set
    if (salesTaxIdToValidate == null) {
      return true;
    }
    // given value is not long enough to even extract country code -
    // return false instead of provoking IndexOutOfBoundException that would need to be caught
    if (salesTaxIdToValidate.length() < COUNTRY_CODE_MIN_LENGTH) {
      throw new SalesTaxIdValidationException("Sales tax id too short");
    }
    final var countryCode = ValidCountryCodes.findByString(salesTaxIdToValidate.substring(0, 2));
    // country code not found in allowed values
    if (countryCode == null) {
      throw new SalesTaxIdValidationException("Invalid country code");
    }

    if (countryCode == ValidCountryCodes.DE) {
      return checkGermanUstIdNr(salesTaxIdToValidate);
    }

    return countryCode.checkValidity(salesTaxIdToValidate);
  }

  private boolean checkGermanUstIdNr(final String salesTaxIdToValidate) {
    final var syntaxMatch = ValidCountryCodes.DE.checkValidity(salesTaxIdToValidate);
    return syntaxMatch && checkIsoIec7604Compliance(salesTaxIdToValidate);
  }

  /**
   * German Ust-IdNr. must comply to ISO/IEC 7604 MOD 11,10
   *
   * @param salesTaxIdToValidate the Ust-IdNr. we check for validity
   * @return whether given id complies to ISO/IEC 7604
   *     <p>Produkt := 10; for i := 1 to n do begin Summe := (Zeichenkette[i] + Produkt) MOD 10; if
   *     Summe = 0 then Summe := 10; Produkt := (Summe * 2) MOD 11; end; (* Prüfzeichenwert
   *     berechnen *) Prüfzeichenwert := 11 - Produkt; if Prüfzeichenwert = 10 then Prüfzeichenwert
   *     := 0;
   */
  private boolean checkIsoIec7604Compliance(final String salesTaxIdToValidate) {
    final var digitsInString = salesTaxIdToValidate.substring(2, 11);
    var product = 10;
    // the first 8 digits are relevant for calculating the checksum
    for (int i = 0; i < 8; i++) {
      var sum = (Integer.parseInt(digitsInString.substring(i, i + 1)) + product) % 10;
      if (sum == 0) {
        sum = 10;
      }
      product = (sum * 2) % 11;
    }
    var checksum = 11 - product;
    if (checksum == 10) {
      checksum = 0;
    }
    // length 9, so we get last digit by substring(8)
    final var lastDigit = Integer.parseInt(digitsInString.substring(8));
    if (lastDigit != checksum) {
      throw new SalesTaxIdValidationException("Sales tax id not compliant to ISO/IEC 7604");
    }
    return true;
  }
}
