import { NextResponse } from "next/server";

export const runtime = "edge";

type ContactBody = {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
  website?: string;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: Request) {
  const webhook = process.env.CONTACT_SHEET_WEBHOOK_URL;
  const secret = process.env.CONTACT_SHEET_SECRET;

  if (!webhook || !secret) {
    return NextResponse.json(
      { ok: false, error: "Server not configured" },
      { status: 500 }
    );
  }

  let body: ContactBody;
  try {
    body = (await req.json()) as ContactBody;
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid JSON" },
      { status: 400 }
    );
  }

  if (body.website && body.website.trim() !== "") {
    return NextResponse.json({ ok: true });
  }

  const name = (body.name ?? "").trim();
  const email = (body.email ?? "").trim();
  const message = (body.message ?? "").trim();
  const subject = (body.subject ?? "").trim();

  if (!name || name.length > 200) {
    return NextResponse.json(
      { ok: false, error: "Name is required" },
      { status: 400 }
    );
  }
  if (!EMAIL_RE.test(email) || email.length > 200) {
    return NextResponse.json(
      { ok: false, error: "Valid email is required" },
      { status: 400 }
    );
  }
  if (!message || message.length > 5000) {
    return NextResponse.json(
      { ok: false, error: "Message is required" },
      { status: 400 }
    );
  }
  if (subject.length > 200) {
    return NextResponse.json(
      { ok: false, error: "Subject is too long" },
      { status: 400 }
    );
  }

  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    "";

  try {
    const upstream = await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        secret,
        name,
        email,
        subject,
        message,
        ip
      }),
      redirect: "follow"
    });

    const text = await upstream.text();
    let parsed: { ok?: boolean; error?: string } = {};
    try {
      parsed = JSON.parse(text);
    } catch {
      // Apps Script can return HTML on certain failures
    }

    if (!upstream.ok || parsed.ok === false) {
      console.error("Contact webhook error", upstream.status, text.slice(0, 500));
      return NextResponse.json(
        { ok: false, error: "Could not send message" },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Contact webhook fetch failed", err);
    return NextResponse.json(
      { ok: false, error: "Could not send message" },
      { status: 502 }
    );
  }
}
