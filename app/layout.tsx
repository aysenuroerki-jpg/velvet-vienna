import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://mint-event-vienna.mahsumwstone.chatgpt.site"),
  title: {
    default: "Mint Event Vienna · Eventdesign & Dekoration",
    template: "%s · Mint Event Vienna",
  },
  description: "Luxuriöse, persönliche Dekoration für Hochzeiten, Verlobungen, Hennaabende und besondere Feiern in Wien.",
  openGraph: {
    title: "Mint Event Vienna · Feiern mit Atmosphäre",
    description: "Persönliche Eventdekoration, Hintergründe, Gastgeschenke und Zeremoniedetails in Wien.",
    type: "website",
    locale: "de_AT",
    siteName: "Mint Event Vienna",
    images: [{ url: "/og.png", width: 1696, height: 960, alt: "Mint Event Vienna · Feiern mit Atmosphäre" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mint Event Vienna · Feiern mit Atmosphäre",
    description: "Persönliche Eventdekoration und besondere Details in Wien.",
    images: ["/og.png"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="de"><body>{children}</body></html>;
}
