import { useState } from 'react';
import type { Customer } from './types/customer';
import CustomerEditDialog from './components/CustomerEditDialog.tsx';
import CustomerTable from './components/CustomerTable.tsx';
import { useCustomers } from './hooks/useCustomers.ts';
import { deleteCustomer } from './services/customersApi.ts';

const EMPTY_CUSTOMER: Customer = {
  id: 0,
  firstName: '',
  lastName: '',
  description: '',
  salesTaxId: '',
  address: '',
  zipCode: '',
  city: '',
};

function App() {
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState<Customer>(EMPTY_CUSTOMER);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const { customers, loading, error, loadCustomers } = useCustomers();

  const handleEditCustomer = (customer: Customer) => {
    setEditingCustomer(customer);
    setIsEditing(true);
    setEditDialogOpen(true);
  };

  const handleDeleteCustomer = async (customer: Customer) => {
    // todo do you really want to delete modal?
    await deleteCustomer(customer);
    loadCustomers();
  };

  const handleAddCustomer = () => {
    setEditingCustomer(EMPTY_CUSTOMER);
    setEditDialogOpen(true);
  };

  const closeEditDialog = () => {
    setEditDialogOpen(false);
    setEditingCustomer(EMPTY_CUSTOMER);
    setIsEditing(false);
    loadCustomers();
  };

  return (
    <>
      <div className="font-inter min-h-screen min-w-screen bg-gray-100">
        <header className="bg-header-bg mx-auto border-b">
          <div className="container mx-auto flex h-16 items-center justify-between px-4">
            <div className="bg-primary flex min-h-full items-center p-4">
              <h1 className="text-lg font-bold tracking-tight text-white">Kundenverwaltung</h1>
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

          <CustomerTable
            customers={customers}
            editFn={handleEditCustomer}
            deleteFn={handleDeleteCustomer}
            isLoading={loading}
            errorMsg={error}
          />
        </main>

        {editDialogOpen && (
          <CustomerEditDialog closeFn={closeEditDialog} isEditing={isEditing} customer={editingCustomer} />
        )}
      </div>
    </>
  );
}

export default App;
