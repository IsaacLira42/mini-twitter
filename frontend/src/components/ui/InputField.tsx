import type { FieldError, UseFormRegister } from "react-hook-form";

interface InputFieldProps {
  id: string;
  type: string;
  label: string;
  register: UseFormRegister<any>;
  placeholder: string;
  error?: FieldError;
  required?: boolean;
}

export const InputField = ({
  id,
  type,
  label,
  register,
  placeholder,
  error,
  required,
}: InputFieldProps) => (
  <div className="flex flex-col">
    <label htmlFor={id}>{label}</label>
    <input
      className="border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
      id={id}
      type={type}
      {...register(id, {
        required: required ? `${label} é obrigatório` : false,
      })}
      placeholder={placeholder}
    />
    {error && <span style={{ color: "red" }}>{error.message}</span>}
  </div>
);
