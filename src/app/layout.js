import "./globals.css";
import { Inter } from "next/font/google";

import Header from "../components/Header/Header.js";
import Footer from "../components/Footer/Footer.js";

import Providers from "./GlobalRedux/provider";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      {/* <MyHead /> */}
      <head>
        <Script
          strategy="lazyOnload"
          src="https://www.googletagmanager.com/gtag/js?id=G-v"
        ></Script>
        <Script id="" strategy="lazyOnload">
          {`  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-GZQ495JYGZ');`}
        </Script>
      </head>

      <body className={inter.className}>
        <Providers>
          <main className="flex flex-col min-h-screen">
            <Header />
            {children}
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
