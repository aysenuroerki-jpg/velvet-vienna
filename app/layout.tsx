import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://mint-event-vienna.aysenuroerki.chatgpt.site"),
  title: {
    default: "Velvet Vienna · Events & Organization",
    template: "%s · Velvet Vienna",
  },
  description: "Luxuriöse, persönliche Dekoration für Hochzeiten, Verlobungen, Hennaabende und besondere Feiern in Wien.",
  openGraph: {
    title: "Velvet Vienna · Events & Organization",
    description: "Persönliche Eventdekoration, Hintergründe, Gastgeschenke und Zeremoniedetails in Wien.",
    type: "website",
    locale: "de_AT",
    siteName: "Velvet Vienna",
    images: [{ url: "/og.png", width: 1672, height: 941, alt: "Velvet Vienna · Events & Organization" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Velvet Vienna · Events & Organization",
    description: "Persönliche Eventdekoration und besondere Details in Wien.",
    images: ["/og.png"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="de"><body>{children}</body></html>;
}
