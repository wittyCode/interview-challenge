import type { Customer } from '../types/customer.ts';
import Input from './Input.tsx';
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

export default function CustomerEditDialog({ closeFn, customer, isEditing }: CustomerEditDialogProps) {
  const [editingCustomer, setEditingCustomer] = useState<Customer>(customer);
  const [errors, setErrors] = useState<ErrorContainer>(new ErrorContainer());

  const handleChange = (name: string, value: string) => {
    setErrors(new ErrorContainer());
    setEditingCustomer((prev: Customer) => ({
      ...prev,
      [name]: value,
    }));
  };

  /**
   * frontend validations, correct sales tax Id syntax is validated on backend to avoid code duplication
   */
  const validate = () => {
    const errorsFound = new ErrorContainer();
    if (!editingCustomer.firstName.trim()) {
      errorsFound.firstName = 'Bitte gib einen Vornamen ein.';
    }
    if (!editingCustomer.lastName.trim()) {
      errorsFound.lastName = 'Bitte gib einen Nachnamen ein.';
    }
    if (editingCustomer.description.length > 100) {
      errorsFound.description = 'Maximal 100 Zeichen erlaubt';
    }
    if (editingCustomer.zipCode?.trim() && !/^\d{5}$/.test(editingCustomer.zipCode)) {
      errorsFound.zipCode = 'Gib eine gültige fünfstellige Postleitzahl ein';
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
    // workaround to make sure spring boot validation does not throw validation error on empty string
    if (editingCustomer.zipCode == '') {
      editingCustomer.zipCode = undefined;
    }
    if (isEditing) {
      try {
        await putCustomer(editingCustomer);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          const errorMsg = error.response?.data.message;
          if (errorMsg === 'SALES_TAX_ID_VALIDATION_ERROR') {
            const salesTaxError = new ErrorContainer();
            salesTaxError.salesTaxId = 'Gib eine gülige Umsatzsteuer-ID ein.';
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
          if (errorMsg === 'SALES_TAX_ID_VALIDATION_ERROR') {
            const salesTaxError = new ErrorContainer();
            salesTaxError.salesTaxId = 'Gib eine gülige Umsatzsteuer-ID ein.';
            setErrors(salesTaxError);
          }
        }
        return;
      }
    }
    closeFn();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div id="background" className="absolute inset-0 bg-black/50" onClick={closeFn}></div>
      <div id="editDialog" className="relative z-10 w-full max-w-md rounded-2xl bg-white p-6 shadow-lg">
        <div id="closeButtonBar" className="flex min-w-auto items-center justify-end">
          <button className="p-2 hover:cursor-pointer" onClick={closeFn}>
            X
          </button>
        </div>

        <h2 className="mb-4 text-xl font-semibold">Kunden {isEditing ? 'bearbeiten ' : 'anlegen'}</h2>

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
