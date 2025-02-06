type Props = {
  label: string;
  type?: "text" | "date" | "url";
  value: string;
  required?: boolean;
  children?: React.ReactNode;
  outerDivStyle?: string;
  placeholder?: string;
  onChange: (val: string) => void;
};

export const FormInput: React.FC<Props> = ({
  label,
  type = "text",
  value,
  required = false,
  children,
  outerDivStyle,
  placeholder,
  onChange,
}) => {
  return (
    <div className={`${outerDivStyle || ''}`}>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <div className={`${children ? 'flex gap-2' : ''}`}>
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          required={required}
          placeholder={placeholder}
        />
        {children && children}
      </div>
    </div>
  );
};
