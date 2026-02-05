import { NextResponse } from "next/server";
import { apiFetch } from "@/lib/server/apiFetch";
import { isApiError } from "@/lib/shared/apiError";

export async function GET() {
  try {
    // mauvais identifiants exprès
    await apiFetch("/auth/login", {
      method: "POST",
      body: { email: "nope@example.com", password: "wrong" },
    });
    return NextResponse.json({ ok: true, note: "Unexpected success" });
  } catch (err) {
    if (isApiError(err)) {
      return NextResponse.json(
        {
          ok: false,
          status: err.status,
          message: err.message,
          details: err.details,
        },
        { status: err.status },
      );
    }
    return NextResponse.json(
      {
        ok: false,
        err: String(err),
      },
      { status: 500 },
    );
  }
}
