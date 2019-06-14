/* import { combineReducers } from "redux";
import navReducers from "./nav/navReducers";
import dataReducers from "./data/dataReducers";
import { NavActionState, NavAction } from "./nav/navActions";
import { DataActionState, DataAction } from "./data/dataActions"; */
import Reducer from "./reducers";
/* export interface ApplicationState {
  nav: NavActionState;
  data: DataActionState;
}

export type Action = NavAction | DataAction;
export type Dispatch = (action: Action) => NavActionState | DataActionState;

const rootReducer: any = combineReducers({ navReducers, dataReducers });
export default rootReducer; */

export default Reducer