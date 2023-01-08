import "../styles/globals.css";

import { AppProvider } from "../context/app_provider";
import { UserProvider } from "../context/user_provider";
import { ApiProvider } from "../context/api_provider";

export default function App({ Component, pageProps }) {
  return (
    <AppProvider>
      <ApiProvider>
        <UserProvider>
          <Component {...pageProps} />
        </UserProvider>
      </ApiProvider>
    </AppProvider>
  );
}
