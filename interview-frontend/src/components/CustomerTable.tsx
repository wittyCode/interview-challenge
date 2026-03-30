import type { Customer } from '../types/customer.ts';

type CustomerTableProps = {
  customers: Customer[];
  editFn: (customer: Customer) => void;
  deleteFn: (customer: Customer) => void;
};

export default function CustomerTable({ customers, editFn, deleteFn }: CustomerTableProps) {
  return (
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
                <button onClick={() => editFn(customer)}>edit</button>
                <button onClick={() => deleteFn(customer)}>del</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
