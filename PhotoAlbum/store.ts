import { applyMiddleware, createStore } from "redux";
import * as thunkMiddleware from "redux-thunk";

import reducers from "./src/reducers/";

let middlewares = [thunkMiddleware.default];
const store = createStore(reducers, applyMiddleware(...middlewares));

export default store;
