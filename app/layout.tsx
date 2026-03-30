import { Inter, IBM_Plex_Serif as IBMPlexSerif } from "next/font/google"

import "./globals.css"
import { cn } from "../lib/utils";
import { ThemeProvider } from "next-themes";

const geist = Inter({subsets:['latin'],variable:'--font-inter'})

const ibmPlexSerif = IBMPlexSerif({
  subsets: ["latin"],
  weight: ["400","700"],
  variable: '--font-ibm-plex-serif'
  })

export const metadata = {
  title: "Bank Finance Dashboard",
  description: "A dashboard to track your bank finances.",
  icons: "./icons/logo.svg",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn("antialiased", ibmPlexSerif.variable, "font-sans", geist.variable)}
    >
      <body>
        {children}
      </body>
    </html>
  )
}
