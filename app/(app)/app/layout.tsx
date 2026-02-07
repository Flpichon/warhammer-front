import Link from "next/link";
import { redirect } from "next/navigation";
import { me } from "@/lib/server/auth";
import { logoutAction } from "./actions";
export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await me();
  if (!user) {
    redirect("/login");
  }
  return (
    <div className="min-h-dvh">
      <header className="border-b">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <nav className="flex gap-4">
            <Link href="/app/squads">Squads</Link>
            <Link href="/app/marines">Marines</Link>
            <Link href="/app/battles">Battles</Link>
          </nav>
          <div className="flex items-center gap-3">
            <span className="text-sm text-zinc-600">{user.email}</span>
            <form action={logoutAction}>
              <button className="rounded-md border px-3 py-1.5 text-sm">
                Se déconnecter
              </button>
            </form>
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-5xl px-6 py-6">{children}</main>
    </div>
  );
}
