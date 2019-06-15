import { createStore } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import rootReducer from "./src/reducers";
import storage from "redux-persist/lib/storage";

import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";

const persistConfig = {
  key: "root",
  storage: storage,
  stateReconciler: autoMergeLevel2,
  whitelist: ["albums", "photos"],
  blacklist: ["album", "photo"]
};
const pReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(pReducer);
export const persistor = persistStore(store);
export default store;
