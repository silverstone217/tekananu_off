// app/api/blob/image/delete/route.ts (Next.js 13+ app router example)
import { NextResponse } from "next/server";
import { del } from "@vercel/blob";

export async function POST(request: Request) {
  try {
    const { url } = await request.json();

    if (!url) {
      return NextResponse.json({ error: "URL manquante" }, { status: 400 });
    }

    await del(url); // suppression côté serveur

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Erreur suppression blob:", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
