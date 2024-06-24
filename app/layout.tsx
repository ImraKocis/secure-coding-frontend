import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Providers } from "@/lib/providers/provider";
import { getUser } from "@/app/actions/user/actions";
import { Toaster } from "@/components/ui/toaster";
import { SideNavigation } from "@/app/ui/navigation/side-navigation";
import { LayoutWrapper } from "@/app/ui/main/layout-wrapper";
import { getSession } from "@/app/actions/auth/session";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Secure Coding",
  description: "Secure coding project made for educational purposes",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getUser();
  const session = await getSession();
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen w-full bg-background font-sans antialiased",
          fontSans.variable,
        )}
      >
        <Providers user={user} session={session}>
          <main className="flex relative h-full w-full">
            <SideNavigation />
            <LayoutWrapper>{children}</LayoutWrapper>
            <Toaster />
          </main>
        </Providers>
      </body>
    </html>
  );
}
