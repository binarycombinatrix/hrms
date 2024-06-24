import { AuthReducer } from "./Auth/Reducer/Index";
import { ConfigReducer } from "./TechnologyMaster/Reducer";
import { persistReducer, persistStore } from "redux-persist";
import thunk from "redux-thunk";
import { applyMiddleware, combineReducers, createStore, compose } from "redux";
import storage from "redux-persist/lib/storage";
import { encryptTransform } from "redux-persist-transform-encrypt";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

const rootReducer = combineReducers({
  Auth: AuthReducer,
  Config: ConfigReducer,
});

const persistedReducer = persistReducer(
  {
    transforms: [
      encryptTransform({
        secretKey: "kevalDishant",
        onError: function (error) {},
      }),
    ],
    ...persistConfig,
  },
  rootReducer
);

const composedEnhancer = compose(
  applyMiddleware(thunk),
  window.__REDUX_DEVTOOLS_EXTENSION__
    ? window.__REDUX_DEVTOOLS_EXTENSION__()
    : (f) => f
);

export const store = createStore(persistedReducer, composedEnhancer);
export const persistor = persistStore(store);
