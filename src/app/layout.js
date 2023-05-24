import './globals.css'
import { Inter } from 'next/font/google'

import Header from "../components/Header/Header.js";
import Footer from "../components/Footer/Footer.js"
import MyHead from "../components/MyHead/MyHead.js"

import Providers from './GlobalRedux/provider';

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <MyHead />
      <body className={inter.className}>
        < Providers>
          <Header />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  )
}
