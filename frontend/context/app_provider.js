import { createContext, useContext, useReducer } from "react";

const AppContext = createContext();
const AppDispatchContext = createContext();

const initialState = {
  api: {
    key: "",
    network: "goerli",
    provider: null,
  },
  etherjs: {
    is_signed: false,
    provider: null,
    signer: null,
  },
};

function appReducer(state, action) {
  switch (action.type) {
    case "set_api_configuration": {
      state.api.key = action.api_key;
      state.api.network = action.api_network;

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

    // case "added": {
    //   return [
    //     ...state,
    //     {
    //       id: action.id,
    //       text: action.text,
    //       done: false,
    //     },
    //   ];
    // }
    // case "changed": {
    //   return state.map((t) => {
    //     if (t.id === action.task.id) {
    //       return action.task;
    //     } else {
    //       return t;
    //     }
    //   });
    // }
    // case "deleted": {
    //   return state.filter((t) => t.id !== action.id);
    // }
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
