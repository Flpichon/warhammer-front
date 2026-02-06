"use server";
import { redirect } from "next/navigation";
import { register } from "@/lib/server/auth";
import { isApiError } from "@/lib/shared/apiError";
export type RegisterState = { error?: string };
export async function registerAction(
  _prev: RegisterState,
  formData: FormData,
): Promise<RegisterState> {
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  if (!email || !password) {
    return { error: "Email et mot de passe requis." };
  }
  try {
    await register({ email, password });
  } catch (err) {
    if (isApiError(err)) {
      if (err.status === 409) {
        return { error: "Email déjà utilisé." };
      }
      // 400 (validation DTO) ou autres: on affiche le message backend
      return { error: err.message };
    }
    return { error: "Erreur inattendue." };
  }
  redirect("/app");
}
