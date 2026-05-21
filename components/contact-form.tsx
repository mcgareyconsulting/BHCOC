"use client";

import { useState } from "react";

type Status =
  | { kind: "idle" }
  | { kind: "submitting" }
  | { kind: "success" }
  | { kind: "error"; message: string };

export function ContactForm() {
  const [status, setStatus] = useState<Status>({ kind: "idle" });

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status.kind === "submitting") return;

    const form = e.currentTarget;
    const data = new FormData(form);

    setStatus({ kind: "submitting" });

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          email: data.get("email"),
          subject: data.get("subject"),
          message: data.get("message"),
          website: data.get("website")
        })
      });
      const body = (await res.json()) as { ok: boolean; error?: string };
      if (!res.ok || !body.ok) {
        setStatus({
          kind: "error",
          message: body.error ?? "Could not send message"
        });
        return;
      }
      form.reset();
      setStatus({ kind: "success" });
    } catch {
      setStatus({
        kind: "error",
        message: "Network error. Please try again or call us."
      });
    }
  }

  const submitting = status.kind === "submitting";

  return (
    <form
      onSubmit={onSubmit}
      className="relative rounded-3xl border border-ink/10 bg-cream p-8 md:p-10 grid gap-5 shadow-soft"
      noValidate
    >
      <div className="absolute -top-3 left-8 inline-flex items-center gap-2 bg-clay text-cream text-[10px] uppercase tracking-[0.25em] px-3 py-1 rounded-full">
        ✉ Send a message
      </div>
      <h3 className="font-display text-2xl mt-2">We&apos;ll get back to you.</h3>

      <div className="grid sm:grid-cols-2 gap-4">
        <label className="grid gap-1.5 text-sm">
          <span className="text-ink/65">Name</span>
          <input
            name="name"
            required
            maxLength={200}
            className="rounded-xl border border-ink/15 bg-paper/40 px-4 py-3 outline-none focus:border-gold focus:bg-cream transition"
          />
        </label>
        <label className="grid gap-1.5 text-sm">
          <span className="text-ink/65">Email</span>
          <input
            type="email"
            name="email"
            required
            maxLength={200}
            className="rounded-xl border border-ink/15 bg-paper/40 px-4 py-3 outline-none focus:border-gold focus:bg-cream transition"
          />
        </label>
      </div>

      <label className="grid gap-1.5 text-sm">
        <span className="text-ink/65">Subject</span>
        <input
          name="subject"
          maxLength={200}
          className="rounded-xl border border-ink/15 bg-paper/40 px-4 py-3 outline-none focus:border-gold focus:bg-cream transition"
        />
      </label>

      <label className="grid gap-1.5 text-sm">
        <span className="text-ink/65">Message</span>
        <textarea
          name="message"
          rows={6}
          required
          maxLength={5000}
          className="rounded-xl border border-ink/15 bg-paper/40 px-4 py-3 outline-none focus:border-gold focus:bg-cream transition resize-none"
        />
      </label>

      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="absolute -left-[9999px] top-auto h-0 w-0 overflow-hidden"
      />

      <button
        type="submit"
        disabled={submitting}
        className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-ink px-7 py-3.5 text-cream font-medium hover:bg-clay transition disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {submitting ? "Sending…" : "Send message →"}
      </button>

      {status.kind === "success" && (
        <p className="text-sm text-forest" role="status">
          Thanks — your message has been sent. We&apos;ll get back to you soon.
        </p>
      )}
      {status.kind === "error" && (
        <p className="text-sm text-clay" role="alert">
          {status.message}
        </p>
      )}
    </form>
  );
}
