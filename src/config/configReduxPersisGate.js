import { createStore, applyMiddleware } from "redux";
import { createMigrate, persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import thunk from "redux-thunk";
import rootRuducers from "../store/reducers";

const migrations = {
  0: (state) => {
    return {
      ...state,
      staskLocalReducer: undefined,
      authState: undefined,
    };
  },
  1: (state) => {
    return {
      staskLocalReducer: state.staskLocalReducer,
      authState: state.authState,
    };
  },
};

const persistConfig = {
  key: "root",
  version: 1,
  storage,
  blacklist: ["staskFirebaseState"],
  migrate: createMigrate(migrations, { debug: false }),
};

const pReducer = persistReducer(persistConfig, rootRuducers);

export const store = createStore(pReducer, applyMiddleware(thunk));
export const persistor = persistStore(store);
