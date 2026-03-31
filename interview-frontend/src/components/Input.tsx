type InputProps = {
  value: string;
  label: string;
  placeholder: string;
  name: string;
  onChange: (name: string, value: string) => void;
  error?: string;
};

/**
 * Component wrapping input element
 */
export default function Input({ onChange, name, value, placeholder, label, error }: InputProps) {
  const inputId = name + 'Input';

  return (
    <div>
      <label className="font-bold" htmlFor={inputId}>
        {label}
      </label>
      <input
        id={inputId}
        type="text"
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(name, e.target.value)}
        className="w-full rounded border border-gray-200 p-2 focus:border-green-600 focus-visible:outline-none"
      />
      {error && <p className="text-sm font-semibold text-red-500">{error}</p>}
    </div>
  );
}
