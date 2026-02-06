"use client";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { loginAction, type LoginState } from "./actions";
function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="mt-4 w-full rounded-md bg-black px-4 py-2 text-white disabled:opacity-60"
    >
      {pending ? "Connexion..." : "Se connecter"}
    </button>
  );
}
export function LoginForm() {
  const initialState: LoginState = {};
  const [state, formAction] = useActionState(loginAction, initialState);
  return (
    <form action={formAction} className="space-y-3">
      <label className="block">
        <span className="text-sm text-zinc-700">Email</span>
        <input
          name="email"
          type="email"
          autoComplete="email"
          required
          className="mt-1 w-full rounded-md border px-3 py-2"
        />
      </label>
      <label className="block">
        <span className="text-sm text-zinc-700">Mot de passe</span>
        <input
          name="password"
          type="password"
          autoComplete="current-password"
          required
          className="mt-1 w-full rounded-md border px-3 py-2"
        />
      </label>
      {state.error ? (
        <p className="text-sm text-red-600">{state.error}</p>
      ) : null}
      <SubmitButton />
    </form>
  );
}
