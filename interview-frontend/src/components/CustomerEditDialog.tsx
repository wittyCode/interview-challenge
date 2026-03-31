import { countries, type Customer } from '../types/customer.ts';
import Input from './Input.tsx';
import Select, { type SelectOption } from './Select.tsx';
import * as React from 'react';
import { useState } from 'react';
import { postCustomer, putCustomer } from '../services/customersApi.ts';
import axios from 'axios';

type CustomerEditDialogProps = {
  closeFn: () => void;
  customer: Customer;
  isEditing: boolean;
};

class ErrorContainer {
  firstName?: string;
  lastName?: string;
  salesTaxId?: string;
  zipCode?: string;
  description?: string;

  public hasValidationIssues() {
    return this.firstName || this.lastName || this.salesTaxId || this.zipCode || this.description;
  }
}

const FIRSTNAME_MISSING_ERROR_MSG = 'Bitte gib einen Vornamen ein.';
const LASTNAME_MISSING_ERROR_MSG = 'Bitte gib einen Nachnamen ein.';
const DESCRIPTION_TOO_LONG_ERROR_MSG = 'Maximal 100 Zeichen erlaubt';
const SALES_TAX_ID_WRONG_ERROR_MSG = 'Gib eine gülige Umsatzsteuer-ID ein.';
const SALES_TAX_ID_ERROR_CODE_FROM_API = 'SALES_TAX_ID_VALIDATION_ERROR';

export default function CustomerEditDialog({ closeFn, customer, isEditing }: CustomerEditDialogProps) {
  const [editingCustomer, setEditingCustomer] = useState<Customer>(customer);
  const [errors, setErrors] = useState<ErrorContainer>(new ErrorContainer());

  const handleChange = (name: string, value: string) => {
    setErrors(new ErrorContainer());
    setEditingCustomer((prev: Customer) => ({
      ...prev,
      // this line ensures that spring boot validation for enumeration mapping does not return 400 on empty string
      [name]: value === '' ? undefined : value,
      //   [name]: value,
    }));
  };

  /**
   * frontend validations, correct sales tax Id syntax is validated on backend to avoid code duplication
   */
  const validate = () => {
    const errorsFound = new ErrorContainer();
    if (!editingCustomer.firstName.trim()) {
      errorsFound.firstName = FIRSTNAME_MISSING_ERROR_MSG;
    }
    if (!editingCustomer.lastName.trim()) {
      errorsFound.lastName = LASTNAME_MISSING_ERROR_MSG;
    }
    if (editingCustomer.description.length > 100) {
      errorsFound.description = DESCRIPTION_TOO_LONG_ERROR_MSG;
    }

    return errorsFound;
  };

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validationErrors = validate();
    if (validationErrors.hasValidationIssues()) {
      setErrors(validationErrors);
      return;
    }

    if (isEditing) {
      try {
        await putCustomer(editingCustomer);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          const errorMsg = error.response?.data.message;
          if (errorMsg === SALES_TAX_ID_ERROR_CODE_FROM_API) {
            const salesTaxError = new ErrorContainer();
            salesTaxError.salesTaxId = SALES_TAX_ID_WRONG_ERROR_MSG;
            setErrors(salesTaxError);
          }
        }
        return;
      }
    } else {
      try {
        await postCustomer(editingCustomer);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          const errorMsg = error.response?.data.message;
          if (errorMsg === SALES_TAX_ID_ERROR_CODE_FROM_API) {
            const salesTaxError = new ErrorContainer();
            salesTaxError.salesTaxId = SALES_TAX_ID_WRONG_ERROR_MSG;
            setErrors(salesTaxError);
          }
        }
        return;
      }
    }
    closeFn();
  };

  // map countries to SelectOptions format
  const countryOptions: SelectOption[] = countries.map((c) => ({
    value: c.isoCode,
    label: c.name,
  }));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div id="background" className="absolute inset-0 bg-black/50" onClick={closeFn}></div>
      <div id="editDialog" className="relative z-10 w-full max-w-md rounded-2xl bg-white p-6 shadow-lg">
        <div id="closeButtonBar" className="flex min-w-auto items-center justify-end">
          <button
            className="flex h-8 w-8 items-center justify-center rounded-full p-2 font-bold hover:cursor-pointer hover:bg-gray-200"
            onClick={closeFn}
          >
            X
          </button>
        </div>

        <h2 className="mb-4 text-center text-xl font-semibold">Kunden {isEditing ? 'bearbeiten ' : 'anlegen'}</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            value={editingCustomer.firstName}
            label="Vorname*"
            placeholder="Vorname"
            name="firstName"
            onChange={handleChange}
            error={errors.firstName}
          />
          <Input
            value={editingCustomer.lastName}
            label="Nachname*"
            placeholder="Nachname"
            name="lastName"
            onChange={handleChange}
            error={errors.lastName}
          />
          <Input
            value={editingCustomer.description}
            label="Informationen"
            placeholder="Informationen"
            name="description"
            onChange={handleChange}
            error={errors.description}
          />
          <Input
            value={editingCustomer.salesTaxId}
            label="Umsatzsteuer-ID"
            placeholder="Umsatzsteuer-ID"
            name="salesTaxId"
            onChange={handleChange}
            error={errors.salesTaxId}
          />
          <Input
            value={editingCustomer.address}
            label="Adresse"
            placeholder="Adresse"
            name="address"
            onChange={handleChange}
          />
          <Input
            value={editingCustomer.zipCode || ''}
            label="PLZ"
            placeholder="PLZ"
            name="zipCode"
            onChange={handleChange}
            error={errors.zipCode}
          />
          <Input value={editingCustomer.city} label="Ort" placeholder="Ort" name="city" onChange={handleChange} />

          <Select
            name="country"
            onChange={handleChange}
            options={countryOptions}
            value={editingCustomer.country}
            label="Land"
            placeholder="Bitte Land auswählen..."
          ></Select>

          <div id="editButtonBar" className="flex items-center justify-end p-2">
            <button
              className="bg-btn-primary hover:bg-btn-hover rounded-xl p-4 font-bold text-white hover:cursor-pointer"
              type="submit"
            >
              Speichern
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
