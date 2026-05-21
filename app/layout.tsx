import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

export const metadata: Metadata = {
  title: "Black History Committee of Orange County",
  description:
    "The Black History Committee of Orange County, Inc. is a 501(c)(3) nonprofit celebrating and educating the public on African American history in Central Florida.",
  openGraph: {
    title: "Black History Committee of Orange County",
    description:
      "Celebrating and educating the public on African American history in Central Florida.",
    type: "website"
  }
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <div className="kente-bar" aria-hidden />
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
