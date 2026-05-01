import "./globals.css"
import { Rammetto_One } from 'next/font/google'
import { ThemeProvider } from "@/components/ui/theme-provider"

const rammetto = Rammetto_One({
  weight: '400',
  subsets: ["latin"],
  display: "swap",
  variable: "--font-rammetto",
})

export const metadata = {
  title: {
    default: "Uday Pratap Singh",
    template: "%s | Uday Pratap Singh",
  },

  description:
    "Uday Pratap Singh is a Backend Developer and Generative AI enthusiast skilled in Python, Django, FastAPI, APIs, and modern web technologies.",

  keywords: [
    "Uday Pratap Singh",
    "Backend Developer",
    "Python Developer",
    "Django",
    "FastApi",
    "GenAI",
    "Portfolio",
  ],

  authors: [{ name: "Uday Pratap Singh" }],

  creator: "Uday Pratap Singh",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning className={rammetto.className}>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
