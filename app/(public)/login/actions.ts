"use server";
import { redirect } from "next/navigation";
import { login } from "@/lib/server/auth";
import { isApiError } from "@/lib/shared/apiError";
export type LoginState = { error?: string };
export async function loginAction(
  _prev: LoginState,
  formData: FormData,
): Promise<LoginState> {
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  if (!email || !password) {
    return { error: "Email et mot de passe requis." };
  }
  try {
    await login({ email, password });
  } catch (err) {
    if (isApiError(err)) {
      if (err.status === 401) {
        return { error: "Identifiants invalides." };
      }
      return { error: err.message };
    }
    return { error: "Erreur inattendue." };
  }
  redirect("/app");
}
