package com.interview.customer_management.customer.rest.validation;

import java.util.List;
import java.util.regex.Pattern;

/** enumeration of allowed country codes in valid sales tax ids. */
public enum ValidCountryCodes {
  // DE + 9 digits
  DE(List.of("DE[0-9]{9}")),
  // AT + "U" followed by 8 characters or digits
  AT(List.of("ATU[0-9a-zA-Z]{8}")),
  // FR + 2 characters or digits + 9 digits
  FR(List.of("FR[0-9a-zA-Z]{2}[0-9]{9}")),
  // GB + 12 digits OR GB + 9 digits OR GBGD + 3 digits + GBHA + 3 digits
  GB(List.of("GB[0-9]{12}", "GB[0-9]{9}", "GBGD[0-9]{3}", "GBHA[0-9]{3}")),
  // DK + 8 digits
  DK(List.of("DK[0-9]{8}")),
  // NL + 12 characters, digits or the signs "+" and "*"
  NL(List.of("NL[0-9a-zA-Z+*]{12}"));

  final List<Pattern> validRegexPatterns;

  ValidCountryCodes(final List<String> validRegexPatterns) {
    this.validRegexPatterns = validRegexPatterns.stream().map(Pattern::compile).toList();
  }

  /**
   * find correct country code for given search String
   *
   * <p>returns null if none found
   */
  public static ValidCountryCodes findByString(final String searchString) {
    for (ValidCountryCodes value : ValidCountryCodes.values()) {
      if (value.name().equals(searchString)) {
        return value;
      }
    }
    return null;
  }

  /**
   * checks country code validity based on given RegExes for that country
   *
   * @throws SalesTaxIdValidationException when invalid
   */
  public boolean checkValidity(final String salesTaxIdToValidate) {
    final var isValid =
        this.validRegexPatterns.stream().anyMatch(it -> it.matcher(salesTaxIdToValidate).matches());
    if (!isValid) {
      throw new SalesTaxIdValidationException(
          "Sales tax id is not in a valid format for country code " + this.name());
    }
    return true;
  }
}
