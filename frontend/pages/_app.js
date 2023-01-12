import "../styles/globals.css";

import { AppProvider } from "../context/app_provider";
import Head from "next/head";

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Decentralised Ticket Sales</title>
        <meta
          name="description"
          content="A way of managing event tickets in a decentralised fashion using Ethereum blockchain"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="favicon.ico" />
      </Head>
      <AppProvider>
        <Component {...pageProps} />
      </AppProvider>
    </>
  );
}
