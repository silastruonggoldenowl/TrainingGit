import { createStore } from "redux";
import { createMigrate, persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import rootRuducers from "../store/reducers";

const migrations = {
  0: (state) => {
    return {
      ...state,
      staskState: undefined,
      authState: undefined,
    };
  },
  1: (state) => {
    return {
      staskState: state.staskState,
      authState: state.authState,
    };
  },
};

const persistConfig = {
  key: "root",
  version: 1,
  storage,
  migrate: createMigrate(migrations, { debug: false }),
};

const pReducer = persistReducer(persistConfig, rootRuducers);

export const store = createStore(pReducer);
export const persistor = persistStore(store);
