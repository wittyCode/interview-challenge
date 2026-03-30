import * as React from 'react';
import { useState } from 'react';
import type { Customer } from '@/types/customer';
import CustomerEditDialog from './components/CustomerEditDialog.tsx';
import CustomerTable from './components/CustomerTable.tsx';

const EMPTY_CUSTOMER: Customer = {
  firstName: '',
  lastName: '',
  description: '',
  salesTaxId: '',
  address: '',
  zipCode: '',
  city: '',
  createdAtUtc: null,
  updatedAtUtc: null,
};

function App() {
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState<Customer | null>(null);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [customers, setCustomers] = useState<Customer[]>(initialCustomers);

  const handleEditCustomer = (customer: Customer) => {
    setEditingCustomer(customer);
    setIsEditing(true);
    console.log('updating customer');
    setEditDialogOpen(true);
  };

  const handleDeleteCustomer = (customer: Customer) => {
    console.log('delete customer', customer.id);
    setCustomers((prev) => prev.filter((it) => it.id !== customer.id));
  };

  const handleAddCustomer = () => {
    setEditingCustomer(EMPTY_CUSTOMER);
    console.log('creating new customer');
    setEditDialogOpen(true);
  };

  const closeEditDialog = () => {
    setEditDialogOpen(false);
    setEditingCustomer(null);
    setIsEditing(false);
  };

  return (
    <>
      <div className="font-inter min-h-screen min-w-screen bg-gray-100">
        <header className="bg-header-bg mx-auto border-b">
          <div className="container mx-auto flex h-16 items-center justify-between">
            <div className="bg-primary flex min-h-full items-center p-4">
              <h1 className="text-lg font-bold tracking-tight text-white">Customer Management Application</h1>
            </div>
          </div>
        </header>

        <main className="container mx-auto space-y-6 px-4 py-8">
          <div id="utiltyBar" className="flex justify-end">
            <button
              className="bg-btn-primary hover:bg-btn-hover rounded-xl p-4 font-bold text-white hover:cursor-pointer"
              onClick={() => handleAddCustomer()}
            >
              + Neuen Kunden anlegen
            </button>
          </div>

          <CustomerTable customers={customers} editFn={handleEditCustomer} deleteFn={handleDeleteCustomer} />
        </main>

        {editDialogOpen && (
          <CustomerEditDialog
            closeFn={closeEditDialog}
            isEditing={isEditing}
            customer={editingCustomer}
            customerCollection={customers}
          />
        )}
      </div>
    </>
  );
}

export default App;

const initialCustomers: Customer[] = [
  {
    id: 1,
    firstName: 'John',
    lastName: 'Doe',
    description: 'VIP client',
    salesTaxId: 'DE123456789',
    address: 'Main St 1',
    zipCode: '88045',
    city: 'Friedrichshafen',
    createdAtUtc: '2024-01-01',
    updatedAtUtc: '2024-01-02',
  },
  {
    id: 2,
    firstName: 'Jane',
    lastName: 'Smith',
    description: 'New customer',
    salesTaxId: 'DE987654321',
    address: 'Lake Rd 5',
    zipCode: '88046',
    city: 'Friedrichshafen',
    createdAtUtc: '2024-02-01',
    updatedAtUtc: '2024-02-02',
  },
];
