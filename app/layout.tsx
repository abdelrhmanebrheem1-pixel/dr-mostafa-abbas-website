import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "د. مصطفى عباس | مخ وأعصاب وطب نفسي أطفال",
  description: "الموقع الرسمي للدكتور مصطفى عباس، استشاري أول مخ وأعصاب وطب نفسي أطفال. تعرف على العيادات ومواعيد الحجز وطرق التواصل.",
  metadataBase: new URL("https://dr-mostafa-abbas.pages.dev"),
  openGraph: {
    title: "د. مصطفى عباس | مخ وأعصاب وطب نفسي أطفال",
    description: "رعاية تبدأ بالفهم... واهتمام يمتد للمستقبل.",
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