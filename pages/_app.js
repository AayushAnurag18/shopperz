import "../styles/globals.css";
import Head from "next/head";
import Script from "next/script";

import { SessionProvider } from "next-auth/react";
export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <SessionProvider session={session}>
      
        <Script
          src="https://kit.fontawesome.com/97cafe4b3f.js"
          crossOrigin="anonymous"
        ></Script>
      
      <Component {...pageProps} />
    </SessionProvider>
  );
}
