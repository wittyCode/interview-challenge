import type { Customer } from '../types/customer.ts';
import { MdDelete, MdEdit } from 'react-icons/md';
import useCountryCodeToNameMapping from '../hooks/useCountryCodeMapping.ts';
import * as React from 'react';

type CustomerTableProps = {
  customers: Customer[];
  editFn: (customer: Customer) => void;
  deleteFn: (customer: Customer) => void;
  isLoading: boolean;
  errorMsg: string | null;
};

export default function CustomerTable({ customers, editFn, deleteFn, isLoading, errorMsg }: CustomerTableProps) {
  const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false);
  const [currentCustomer, setCurrentCustomer] = React.useState<Customer>();

  const rowClasses = 'rounded-2xl bg-white hover:bg-gray-200 border-b-2 border-gray-200';
  const buttonCellClasses = 'py-4';
  const lastButtonCellClasses = 'rounded-br-2xl ' + buttonCellClasses;

  const customersToRows = customers.map((customer, index) => (
    <tr key={customer.id} className={rowClasses}>
      <td className={index === customers.length - 1 ? 'rounded-bl-2xl p-4' : 'p-4'}>{customer.firstName}</td>
      <td>{customer.lastName}</td>
      <td>{customer.description}</td>
      <td>{customer.salesTaxId}</td>
      <td>{customer.address}</td>
      <td>{customer.zipCode}</td>
      <td>{customer.city}</td>
      <td>{customer.country && useCountryCodeToNameMapping(customer.country)}</td>
      <td className={index === customers.length - 1 ? lastButtonCellClasses : buttonCellClasses}>
        <button onClick={() => editFn(customer)} className="hover:cursor-pointer">
          <MdEdit size="1.5em" />
        </button>
        <button onClick={() => openDeleteDialog(customer)} className="hover:cursor-pointer">
          <MdDelete size="1.5em" />
        </button>
      </td>
    </tr>
  ));

  const openDeleteDialog = (customer: Customer) => {
    setDeleteDialogOpen(true);
    setCurrentCustomer(customer);
  };

  const closeDeleteDialog = () => {
    setCurrentCustomer(undefined);
    setDeleteDialogOpen(false);
  };

  const confirmDelete = () => {
    if (currentCustomer) {
      deleteFn(currentCustomer);
    }
    setCurrentCustomer(undefined);
    setDeleteDialogOpen(false);
  };

  return (
    <>
      <div className="rounded-2xl border-2 border-gray-200">
        {isLoading && <p>Loading...</p>}
        {(errorMsg && <p>{errorMsg}</p>) || (
          <table className="w-full">
            <thead>
              <tr className="border-gray-200 font-semibold">
                <td className="p-4">Vorname</td>
                <td>Nachname</td>
                <td>Beschreibung</td>
                <td>Ust-Idnr.</td>
                <td>Adresse</td>
                <td>PLZ</td>
                <td>Ort</td>
                <td>Land</td>
              </tr>
            </thead>
            <tbody>{customersToRows}</tbody>
          </table>
        )}
      </div>

      {deleteDialogOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div id="background" className="absolute inset-0 bg-black/50" onClick={() => closeDeleteDialog()}></div>
          <div id="deleteDialog" className="relative z-10 w-full max-w-sm rounded-2xl bg-white p-6 shadow-lg">
            <div id="closeButtonBar" className="flex min-w-auto items-center justify-end">
              <button
                className="flex h-8 w-8 items-center justify-center rounded-full p-2 font-bold hover:cursor-pointer hover:bg-gray-200"
                onClick={() => closeDeleteDialog()}
              >
                X
              </button>
            </div>
            <p className="my-4 py-4 font-semibold">Willst Du den Kunden wirklich löschen?</p>

            <div id="deleteButtonBar" className="flex items-center justify-end p-2">
              <button
                className="bg-btn-primary hover:bg-btn-hover rounded-xl p-4 font-bold text-white hover:cursor-pointer"
                onClick={() => confirmDelete()}
              >
                Löschen
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
