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
          strategy="lazyload"
          src="https://www.googletagmanager.com/gtag/js?id=G-4Q5VG2FDRM"
        ></Script>
        <Script id="" strategy="lazyOnload">
          {`  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-4Q5VG2FDRM');`}
        </Script>
      </head>

      <body className={inter.className}>
        <Providers>
          <Header />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
