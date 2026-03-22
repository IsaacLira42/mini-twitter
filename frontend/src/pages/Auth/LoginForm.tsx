import { useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import { InputField } from "../../components/ui/InputField";
import { Buttons } from "../../components/ui/Buttons";
import { useState } from "react";

type InputsLogin = {
  email: string;
  password: string;
};

export const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<InputsLogin>();

  const onSubmit: SubmitHandler<InputsLogin> = (data) => {
    console.log(data);
  };

  return (
    <div>
      <h2 className="font-bold text-text-tittle-light dark:text-text-tittle-dark text-[30px]">
        Olá, de novo!
      </h2>
      <p className="text-text-body-light dark:text-text-body-dark">
        Por favor, insira seus dados de login.
      </p>

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

        <Buttons className="">Continuar</Buttons>
      </form>
    </div>
  );
};
