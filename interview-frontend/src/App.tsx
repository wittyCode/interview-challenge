import * as React from 'react';
import { useState } from 'react';
import type { Customer } from '@/types/customer';

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
  const [search, setSearch] = useState('');
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState<Customer | null>(null);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const handleEditCustomer = (customer: Customer) => {
    setEditingCustomer(customer);
    setIsEditing(true);
    console.log('updating customer');
    setEditDialogOpen(true);
  };

  const handleDeleteCustomer = (customer: Customer) => {
    console.log('delete customer', customer.id);
  };

  const handleAddCustomer = () => {
    setEditingCustomer(EMPTY_CUSTOMER);
    console.log('creating new customer');
    setEditDialogOpen(true);
  };

  const closeEditDialog = () => {
    setEditDialogOpen(false);
    setEditingCustomer(null);
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditingCustomer({
      ...editingCustomer,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.InputEvent) => {
    e.preventDefault();
    console.log(editingCustomer);
    if (isEditing) {
      console.log('updating customer');
    } else {
      console.log('create new customer');
    }
    closeEditDialog();
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
          <div id="utiltyBar" className="flex justify-between">
            <input
              type="text"
              placeholder="Kunden suchen..."
              className="rounded-xl border-2 border-gray-200 px-2"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button
              className="bg-btn-primary hover:bg-btn-hover rounded-xl p-4 font-bold text-white hover:cursor-pointer"
              onClick={() => handleAddCustomer()}
            >
              + Neuen Kunden anlegen
            </button>
          </div>
          <div>
            <table className="w-full">
              <thead>
                <tr>
                  <td>Vorname</td>
                  <td>Nachname</td>
                  <td>Beschreibung</td>
                  <td>Ust-Idnr.</td>
                  <td>Adresse</td>
                  <td>PLZ</td>
                  <td>Ort</td>
                </tr>
              </thead>
              <tbody>
                {customers.map((customer: Customer) => (
                  <tr key={customer.id} className="hover:bg-gray-500">
                    <td>{customer.firstName}</td>
                    <td>{customer.lastName}</td>
                    <td>{customer.description}</td>
                    <td>{customer.salesTaxId}</td>
                    <td>{customer.address}</td>
                    <td>{customer.zipCode}</td>
                    <td>{customer.city}</td>
                    <td>
                      <button onClick={() => handleEditCustomer(customer)}>edit</button>
                      <button onClick={() => handleDeleteCustomer(customer)}>del</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>

        {editDialogOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div id="background" className="absolute inset-0 bg-black/50" onClick={() => closeEditDialog()}></div>
            <div id="editDialog" className="relative z-10 w-full max-w-md rounded-2xl bg-white p-6 shadow-lg">
              <h2 className="mb-4 text-xl font-semibold">Kunden {isEditing ? 'bearbeiten ' : 'anlegen'}</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="text"
                  name="firstName"
                  value={editingCustomer.firstName}
                  onChange={handleChange}
                  className="w-full rounded border p-2"
                  placeholder="First Name"
                />
                <input
                  type="text"
                  name="lastName"
                  value={editingCustomer.lastName}
                  onChange={handleChange}
                  className="w-full rounded border p-2"
                  placeholder="First Name"
                />
                <input
                  type="text"
                  name="description"
                  value={editingCustomer.description}
                  onChange={handleChange}
                  className="w-full rounded border p-2"
                  placeholder="First Name"
                />
                <input
                  type="text"
                  name="salesTaxId"
                  value={editingCustomer.salesTaxId}
                  onChange={handleChange}
                  className="w-full rounded border p-2"
                  placeholder="First Name"
                />
                <input
                  type="text"
                  name="address"
                  value={editingCustomer.address}
                  onChange={handleChange}
                  className="w-full rounded border p-2"
                  placeholder="First Name"
                />
                <input
                  type="text"
                  name="zipCode"
                  value={editingCustomer.zipCode}
                  onChange={handleChange}
                  className="w-full rounded border p-2"
                  placeholder="First Name"
                />
                <input
                  type="text"
                  name="city"
                  value={editingCustomer.city}
                  onChange={handleChange}
                  className="w-full rounded border p-2"
                  placeholder="First Name"
                />
                <button type="submit">Speichern</button>
                <button onClick={() => closeEditDialog()}>close</button>
              </form>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default App;

const customers: Customer[] = [
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
