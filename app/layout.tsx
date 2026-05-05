import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { ConvexClientProvider } from "@/components/ConvexClientProvider";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });

export const metadata: Metadata = {
  title: "MajorDiscover VN – Khám phá ngành học & hướng nghiệp 2025",
  description:
    "Tìm kiếm ngành học phù hợp với tính cách và khối thi. Điểm chuẩn các trường đại học trên cả nước từ Bắc vào Nam.",
  keywords: ["ngành học", "điểm chuẩn", "hướng nghiệp", "đại học", "tuyển sinh 2025"],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi" className={`${inter.variable} ${playfair.variable}`}>
      <body suppressHydrationWarning className="bg-[#FBF9F6] text-[#1A1A1A]">
        <ConvexClientProvider>
          {children}
          <Toaster position="top-right" richColors />
        </ConvexClientProvider>
      </body>
    </html>
  );
}
