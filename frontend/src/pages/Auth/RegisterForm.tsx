import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { authService } from "../../api/auth.service";
import {
  registerSchema,
  type RegisterFormData,
} from "../../schemas/auth.schemas";
import { useMutation } from "@tanstack/react-query";
import { InputField } from "../../components/ui/InputField";
import { Buttons } from "../../components/ui/Buttons";

export const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const { mutate, isPending, error } = useMutation({
    mutationKey: ["auth", "register"],
    mutationFn: (data: RegisterFormData) => authService.register(data),
    onSuccess: () => {
      // Limpar o formulário após registro bem-sucedido
      reset();
      // ! Redirecionar para a Login quando estiver pronta
      // ! navigate('/login');
    },
    onError: (error: Error) => {
      console.error("Erro no registro:", error.message);
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

      {/* Exibição do erro da API */}
      {error && (
        <div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          {error.message}
        </div>
      )}

      {/* Exibição de erros do formulário (opcional) */}
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
