import type { Metadata } from "next";
import { MarioGame } from "@/components/mario-game";

export const metadata: Metadata = {
  title: "Super Retro Bros — Play | BHCOC",
  description:
    "A four-level, old-school side-scrolling platformer you can play right in your browser."
};

export default function MarioPage() {
  return (
    <section className="bg-ink py-12 text-white">
      <div className="mx-auto max-w-5xl px-4">
        <header className="mb-8 text-center">
          <h1 className="font-display text-4xl font-bold tracking-tight text-yellow-300 sm:text-5xl">
            Super Retro Bros
          </h1>
          <p className="mt-2 text-stone-300">
            An old-school platformer — four levels, one keyboard. Good luck!
          </p>
        </header>
        <MarioGame />
      </div>
    </section>
  );
}
