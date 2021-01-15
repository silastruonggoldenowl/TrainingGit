import { createStore } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import rootRuducers from "../store/reducers/index";

const persistConfig = {
  key: "root",
  storage,
};

const pReducer = persistReducer(persistConfig, rootRuducers);

export const store = createStore(pReducer);
export const persistor = persistStore(store);
