import { createContext, useContext, useReducer } from "react";
// https://github.com/netlify/explorers/tree/main/src/pages
// https://beta.reactjs.org/learn/scaling-up-with-reducer-and-context
// https://reactjs.org/docs/hooks-reference.html#usereducer
const ApiContext = createContext();
const initialState = {
  api: {
    key: "",
    network: "goerli",
  },
};

export function ApiProvider({ children }) {
  // let sharedState = {
  // };
  const [state, dispatch] = useReducer(apiReducer, initialState);

  return (
    <ApiContext.Provider value={state}>{children}</ApiContext.Provider>
  );
}

export function useApiContext() {
  return useContext(ApiContext);
}

function apiReducer(state, action) {
  switch (action.type) {
    case "set_api_configuration": {
      state.api.key = action.api_key;
      state.api.network = action.api_network;
      return state;
    }
    case "added": {
      return [
        ...state,
        {
          id: action.id,
          text: action.text,
          done: false,
        },
      ];
    }
    case "changed": {
      return state.map((t) => {
        if (t.id === action.task.id) {
          return action.task;
        } else {
          return t;
        }
      });
    }
    case "deleted": {
      return state.filter((t) => t.id !== action.id);
    }
    default: {
      throw Error("Unknown action: " + action.type);
    }
  }
}
