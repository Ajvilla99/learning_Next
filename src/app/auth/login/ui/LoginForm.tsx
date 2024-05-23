'use client';

import Link from "next/link";
import { useFormState, useFormStatus } from "react-dom";

import { authenticate } from "@/actions";
import { IoInformationOutline } from "react-icons/io5";
import clsx from "clsx";

export const LoginForm = () => {

  const [state, dispatch] = useFormState(authenticate, undefined);
  console.log({ state })

  return (
    <form action={dispatch} className="flex flex-col">
      <label htmlFor="email">Correo electrónico</label>
      <input
        className="px-5 py-2 border bg-gray-200 rounded mb-5"
        type="email"
        name="email"
      />

      <label htmlFor="email">Contraseña</label>
      <input
        className="px-5 py-2 border bg-gray-200 rounded mb-5"
        type="password"
        name="password"
      />

      <div
        className="flex h-8 items-end space-x-1"
        aria-live="polite"
        aria-atomic="true"
      >
        {state === "Invalid credentials" && (
          <div className="w-full px-1 py-1 mb-2 rounded bg-red-200 flex items-center justify-center">
            <IoInformationOutline className="h-5 w-5 text-red-600" />
            <p className="text-sm text-red-500">{state}</p>
          </div>
        )}
      </div>

      <LoginButton />

      {/* divisor l ine */}
      <div className="flex items-center my-5">
        <div className="flex-1 border-t border-gray-500"></div>
        <div className="px-2 text-gray-800">O</div>
        <div className="flex-1 border-t border-gray-500"></div>
      </div>

      <Link href="/auth/new-account" className="btn-secondary text-center">
        Crear una nueva cuenta
      </Link>
    </form>
  );
}


function LoginButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={ pending }
      className={ clsx({
        "btn-primary": !pending,
        "btn-disabled": pending,
      })}>
      iniciar sesion
    </button>
  );
}