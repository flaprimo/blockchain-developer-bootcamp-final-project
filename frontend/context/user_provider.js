import { createContext, useContext } from "react";

const UserContext = createContext();

export function UserProvider({ children }) {
  let sharedState = {
    /* whatever you want */
  };

  return (
    <UserContext.Provider value={sharedState}>{children}</UserContext.Provider>
  );
}

export function useUserContext() {
  return useContext(UserContext);
}
