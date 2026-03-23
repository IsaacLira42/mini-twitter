import { useForm, type SubmitHandler } from "react-hook-form";
import { useToast } from "../../components/ui/Toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { authService } from "../../api/auth.service";
import {
  registerSchema,
  type RegisterFormData,
} from "../../schemas/auth.schemas";
import { useMutation } from "@tanstack/react-query";
import { getApiError } from "../../lib/api";
import { InputField } from "../../components/ui/InputField";
import { Buttons } from "../../components/ui/Buttons";
import { useNavigate } from "react-router-dom";

export const RegisterForm = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setError,
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const { push } = useToast();

  const { mutate, isPending } = useMutation({
    mutationKey: ["auth", "register"],
    mutationFn: (data: RegisterFormData) => authService.register(data),
    onSuccess: () => {
      // Limpar o formulário após registro bem-sucedido
      reset();

      navigate("/login");
    },
    onError: (err: unknown) => {
      const { message, fields } = getApiError(err);
      if (fields) {
        Object.entries(fields).forEach(([field, msg]) => {
          setError(field as any, { type: "server", message: String(msg) });
        });
      } else {
        push({ message: String(message), type: "error" });
      }
    },
  });

  const onSubmit: SubmitHandler<RegisterFormData> = (data) => {
    mutate(data);
  };

  return (
    <div>
      <h2 className="font-bold text-text-tittle-light dark:text-text-tittle-dark text-[30px]">
        Olá, vamos começar!
      </h2>
      <p className="mb-8 text-text-body-light dark:text-text-body-dark">
        Por favor, insira os dados solicitados para fazer cadastro.
      </p>

      {/* Exibição de erros do formulário */}
      {errors.root && (
        <div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          {errors.root.message}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)}>
        <InputField
          id="name"
          type="text"
          label="Nome"
          register={register}
          placeholder="Insira o seu nome"
          error={errors.name}
          required
        />

        <InputField
          id="email"
          type="email"
          label="E-mail"
          register={register}
          placeholder="Insira o seu e-mail"
          error={errors.email}
          required
        />

        <InputField
          id="password"
          type="password"
          label="Senha"
          register={register}
          placeholder="Insira a sua senha"
          error={errors.password}
          required
        />

        <Buttons
          className="w-full h-14 font-bold bg-button text-text-body-light dark:text-text-body-dark hover:bg-button-hover disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={isPending}
        >
          {isPending ? "Registrando..." : "Criar conta"}
        </Buttons>
      </form>
    </div>
  );
};
