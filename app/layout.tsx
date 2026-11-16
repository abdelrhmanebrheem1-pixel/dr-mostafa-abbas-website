import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "د. مصطفى عباس | استشاري مخ وأعصاب وطب نفسي أطفال",
  description: "الموقع الرسمي للدكتور مصطفى عباس، استشاري أول مخ وأعصاب وطب نفسي أطفال. تعرّف على التخصص والمؤهلات وعناوين العيادات ومواعيد العمل وأرقام التواصل والحجز بالحضور.",
  metadataBase: new URL("https://dr-mostafa-abbas.com"),
  verification: {
    google: "gWGBaZsoLUg17ZuPbYfniMzytJnPmUjkhJ7bjDDNu94"
  },
  openGraph: {
    title: "د. مصطفى عباس | استشاري مخ وأعصاب وطب نفسي أطفال",
    description: "استشاري أول مخ وأعصاب وطب نفسي أطفال. معلومات العيادات والعناوين ومواعيد العمل وطرق التواصل.",
    locale: "ar_EG",
    type: "website"
  }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ar" dir="rtl">
      <body>{children}</body>
    </html>
  );
}
