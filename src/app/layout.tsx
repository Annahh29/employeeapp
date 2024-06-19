import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { AuthProvider } from "./../Provider/auth";
import { EmployeeProvider } from "./../Provider/Employee";
import "./globals.css";
import "antd/dist/reset.css";
import { ConfigProvider } from "antd";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Employee App",
  description: "Generated by Nyarai Anna",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ConfigProvider theme={{ hashed: false }}>
      <EmployeeProvider>
        <AuthProvider>
          <html lang="en">
            <body className={inter.className}>{children}</body>
          </html>
        </AuthProvider>
      </EmployeeProvider>
    </ConfigProvider>
  );
}