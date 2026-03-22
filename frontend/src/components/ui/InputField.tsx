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
  <div className="flex flex-col text-text-body-light dark:text-text-body-dark gap-1 mb-4">
    <label htmlFor={id}>{label}</label>
    <input
      className="h-14.25 border border-card-light rounded-lg focus:outline-none focus:ring-2 focus:ring-button px-4!"
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
