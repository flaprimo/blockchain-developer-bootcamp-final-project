import "../styles/globals.css";

import { AppProvider } from "../context/app_provider";



export default function App({ Component, pageProps }) {
  return (
    <AppProvider>
      <Component {...pageProps} />
    </AppProvider>
  );
}
