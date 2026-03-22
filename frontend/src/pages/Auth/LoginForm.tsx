import { useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import { useState } from "react";
import { InputField } from "../../components/ui/InputField";
import { Buttons } from "../../components/ui/Buttons";
import { authService } from "../../api/auth.service";
import {
  loginSchema,
  type LoginFormData,
  type LoginResponse,
} from "../../schemas/auth.schemas";
import { useMutation } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import useUserStore from "../../store/useUserStore";
import { getApiError } from "../../lib/api";

export const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const [apiError, setApiError] = useState<string | null>(null);

  const { mutate, isPending } = useMutation({
    mutationKey: ["auth", "login"],
    mutationFn: (data: LoginFormData) => authService.login(data),
    onSuccess: (response: LoginResponse) => {
      // Salvar no store global (zustand)
      useUserStore.getState().setAuth(response);

      // ! Redirecionar para a Timeline quando estiver pronta
      // ! navigate('/timeline');
    },
    onError: (err: unknown) => {
      const { message, fields } = getApiError(err);
      if (fields) {
        Object.entries(fields).forEach(([field, msg]) => {
          setError(field as any, { type: "server", message: String(msg) });
        });
      } else {
        setApiError(String(message));
      }
    },
  });

  const onSubmit: SubmitHandler<LoginFormData> = (data) => {
    setApiError(null);
    mutate(data);
  };

  return (
    <div>
      <h2 className="font-bold text-text-tittle-light dark:text-text-tittle-dark text-[30px]">
        Olá, de novo!
      </h2>
      <p className="mb-8 text-text-body-light dark:text-text-body-dark">
        Por favor, insira seus dados de login.
      </p>

      {/* Exibição do erro */}
      {apiError && (
        <div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          {apiError}
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
