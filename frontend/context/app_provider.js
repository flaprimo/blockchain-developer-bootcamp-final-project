import { createContext, useContext, useReducer } from "react";

const AppContext = createContext();
const AppDispatchContext = createContext();

const initialState = {
  sol: {
    organizer_address: "",
    organizer_contract: null,
    event_contract: null,
    ticket_contract: null,
  },
  etherjs: {
    is_signed: false,
    provider: null,
    signer: null,
  },
};

function appReducer(state, action) {
  switch (action.type) {
    case "set_sol_configuration": {
      state.sol.organizer_address = action.sol_organizer_address;
      state.sol.organizer_contract = action.sol_organizer_contract;
      state.sol.event_contract = action.sol_event_contract;
      state.sol.ticket_contract = action.sol_ticket_contract;

      return state;
    }
    case "set_etherjs": {
      state.etherjs.is_signed = true;
      state.etherjs.provider = action.provider;
      state.etherjs.signer = action.signer;

      return state;
    }
    case "unset_etherjs": {
      state.etherjs.is_signed = false;
      state.etherjs.provider = null;
      state.etherjs.signer = null;

      return state;
    }
    default: {
      throw Error("Unknown action: " + action.type);
    }
  }
}

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  return (
    <AppContext.Provider value={state}>
      <AppDispatchContext.Provider value={dispatch}>
        {children}
      </AppDispatchContext.Provider>
    </AppContext.Provider>
  );
}

export const useAppContext = () => useContext(AppContext);

export const useAppDispatchContext = () => useContext(AppDispatchContext);
