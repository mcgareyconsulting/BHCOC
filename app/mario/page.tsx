import type { Metadata } from "next";
import { MarioGame } from "@/components/mario-game";

export const metadata: Metadata = {
  title: "Super Retro Bros — Play",
  description:
    "A four-level, old-school side-scrolling platformer you can play right in your browser."
};

export default function MarioPage() {
  return <MarioGame />;
}
