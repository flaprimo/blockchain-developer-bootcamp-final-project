import { createContext, useContext } from "react";

const ApiContext = createContext();

export function ApiProvider({ children }) {
  let sharedState = {
    /* whatever you want */
  };

  return (
    <ApiContext.Provider value={sharedState}>{children}</ApiContext.Provider>
  );
}

export function useApiContext() {
  return useContext(ApiContext);
}
