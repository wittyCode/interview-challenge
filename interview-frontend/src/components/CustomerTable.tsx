import type { Customer } from '../types/customer.ts';
import { MdDelete, MdEdit } from 'react-icons/md';
import useCountryCodeToNameMapping from '../hooks/useCountryCodeMapping.ts';

type CustomerTableProps = {
  customers: Customer[];
  editFn: (customer: Customer) => void;
  deleteFn: (customer: Customer) => void;
  isLoading: boolean;
  errorMsg: string | null;
};

export default function CustomerTable({ customers, editFn, deleteFn, isLoading, errorMsg }: CustomerTableProps) {
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
        <button onClick={() => deleteFn(customer)} className="hover:cursor-pointer">
          <MdDelete size="1.5em" />
        </button>
      </td>
    </tr>
  ));

  return (
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
  );
}
