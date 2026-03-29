type InputProps = {
  value: string;
  label: string;
  placeholder: string;
  name: string;
  onChange: (name: string, value: string) => void;
};

export default function Input({ onChange, name, value, placeholder, label }: InputProps) {
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
        className="w-full rounded border p-2"
      />
    </div>
  );
}
