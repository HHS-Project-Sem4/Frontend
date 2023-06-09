import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'OutdoorFusion Dashboard',
  description: 'Bekijke het data overzicht van OutdoorFusion',
}

export default function RootLayout({ children }) {
  return (
    <html lang="nl">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
