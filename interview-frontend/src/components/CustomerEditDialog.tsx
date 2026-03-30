import type { Customer } from '../types/customer.ts';
import Input from './Input.tsx';
import * as React from 'react';
import { useState } from 'react';
import { postCustomer, putCustomer } from '../services/customersApi.ts';

type CustomerEditDialogProps = {
  closeFn: () => void;
  customer: Customer;
  isEditing: boolean;
};

export default function CustomerEditDialog({ closeFn, customer, isEditing }: CustomerEditDialogProps) {
  const [editingCustomer, setEditingCustomer] = useState<Customer>(customer);

  const handleChange = (name: string, value: string) => {
    console.log('change', name, value);
    setEditingCustomer((prev: Customer) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(editingCustomer);
    if (isEditing) {
      console.log('updating customer');
      await putCustomer(editingCustomer);
    } else {
      console.log('create new customer');
      await postCustomer(editingCustomer);
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
            label="Vorname"
            placeholder="Vorname"
            name="firstName"
            onChange={handleChange}
          />
          <Input
            value={editingCustomer.lastName}
            label="Nachname"
            placeholder="Nachname"
            name="lastName"
            onChange={handleChange}
          />
          <Input
            value={editingCustomer.description}
            label="Informationen"
            placeholder="Informationen"
            name="description"
            onChange={handleChange}
          />
          <Input
            value={editingCustomer.salesTaxId}
            label="Umsatzsteuer-ID"
            placeholder="Umsatzsteuer-ID"
            name="salesTaxId"
            onChange={handleChange}
          />
          <Input
            value={editingCustomer.address}
            label="Adresse"
            placeholder="Adresse"
            name="address"
            onChange={handleChange}
          />
          <Input value={editingCustomer.zipCode} label="PLZ" placeholder="PLZ" name="zipCode" onChange={handleChange} />
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
