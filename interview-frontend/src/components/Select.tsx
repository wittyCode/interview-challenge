export type SelectOption = {
  value: string;
  label: string;
};

type SelectProps = {
  name: string;
  value?: string;
  onChange: (name: string, value: string) => void;
  options: SelectOption[];
  placeholder?: string;
  label?: string;
};

export default function Select({ name, value, onChange, options, placeholder, label }: SelectProps) {
  const selectId = name + 'Select';

  return (
    <div>
      <label className="font-semibold" htmlFor={selectId}>
        {label}
      </label>

      <select
        id={selectId}
        name={name}
        value={value ?? ''}
        onChange={(e) => onChange(name, e.target.value)}
        className="w-full rounded border border-gray-200 p-2 focus:border-green-600 focus-visible:outline-none"
      >
        <option value="UNDEFINED">{placeholder}</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}
