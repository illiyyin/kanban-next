import { Inter } from 'next/font/google'
import '@/app/globals.css'
import RecoilProvider from '@/components/RecoilProvider'
import SideMenu from '@/components/SideMenu'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
      </head>
      <body className={`flex ${inter.className}`}>
        <SideMenu />
        {/* Ditambahkan */}
        <RecoilProvider>{children}</RecoilProvider>
      </body>
    </html>
  )
}
