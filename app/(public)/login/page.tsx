import { redirect } from "next/navigation";
import { me } from "@/lib/server/auth";
import { LoginForm } from "./ui";
export default async function LoginPage() {
  const user = await me();
  if (user) {
    redirect("/app");
  }
  return (
    <main className="mx-auto flex min-h-dvh max-w-md flex-col justify-center px-6 py-10">
      <h1 className="text-2xl font-semibold tracking-tight">Login</h1>
      <p className="mt-2 text-sm text-zinc-600">
        Connecte-toi pour accéder à l’app.
      </p>
      <div className="mt-6">
        <LoginForm />
      </div>
    </main>
  );
}
