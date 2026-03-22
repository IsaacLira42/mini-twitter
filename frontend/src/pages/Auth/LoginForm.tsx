import { useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import { InputField } from "../../components/ui/InputField";
import { Buttons } from "../../components/ui/Buttons";
import { authService } from "../../api/auth.service";
import type { LoginFormData, LoginResponse } from "../../schemas/auth.schemas";
import { useMutation } from "@tanstack/react-query";

export const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>();

  const { mutate, isPending, error } = useMutation({
    mutationKey: ["auth", "login"],
    mutationFn: (data: LoginFormData) => authService.login(data),
    onSuccess: (response: LoginResponse) => {
      // Salvar o token e dados do usuário no lacalStorage
      localStorage.setItem("token", response.token);
      localStorage.setItem("user", JSON.stringify(response.user));

      // ! Redirecionar para a Timeline quando estiver pronta
      // ! navigate('/timeline');
    },
    onError: (error: Error) => {
      console.error("Erro no login:", error.message);
    },
  });

  const onSubmit: SubmitHandler<LoginFormData> = (data) => {
    mutate(data);
  };

  return (
    <div>
      <h2 className="font-bold text-text-tittle-light dark:text-text-tittle-dark text-[30px]">
        Olá, de novo!
      </h2>
      <p className="text-text-body-light dark:text-text-body-dark">
        Por favor, insira seus dados de login.
      </p>

      {/* Exibição do erro */}
      {error && (
        <div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          {error.message}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)}>
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
          {isPending ? "Entrando..." : "Continuar"}
        </Buttons>
      </form>
    </div>
  );
};
