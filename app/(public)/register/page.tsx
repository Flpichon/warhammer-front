import { redirect } from "next/navigation";
import { me } from "@/lib/server/auth";
import { RegisterForm } from "./ui";
export default async function RegisterPage() {
  const user = await me();
  if (user) {
    redirect("/app");
  }
  return (
    <main className="mx-auto flex min-h-dvh max-w-md flex-col justify-center px-6 py-10">
      <h1 className="text-2xl font-semibold tracking-tight">Register</h1>
      <p className="mt-2 text-sm text-zinc-600">
        Crée un compte pour accéder à l’app.
      </p>
      <div className="mt-6">
        <RegisterForm />
      </div>
    </main>
  );
}
