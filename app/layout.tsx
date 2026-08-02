import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://mint-event-vienna.aysenuroerki.chatgpt.site"),
  title: {
    default: "Velvet Vienna Event · Eventdesign & Dekoration",
    template: "%s · Velvet Vienna Event",
  },
  description: "Luxuriöse, persönliche Dekoration für Hochzeiten, Verlobungen, Hennaabende und besondere Feiern in Wien.",
  openGraph: {
    title: "Velvet Vienna Event · Feiern mit Atmosphäre",
    description: "Persönliche Eventdekoration, Hintergründe, Gastgeschenke und Zeremoniedetails in Wien.",
    type: "website",
    locale: "de_AT",
    siteName: "Velvet Vienna Event",
    images: [{ url: "/og.png", width: 1696, height: 960, alt: "Velvet Vienna Event · Feiern mit Atmosphäre" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Velvet Vienna Event · Feiern mit Atmosphäre",
    description: "Persönliche Eventdekoration und besondere Details in Wien.",
    images: ["/og.png"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="de"><body>{children}</body></html>;
}
