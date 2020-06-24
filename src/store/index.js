import { createStore, applyMiddleware } from "redux";
import rootReducer from "../reducers";
import dialogFlowMiddleware from "../middleware/index";

export default createStore(
  rootReducer,
  applyMiddleware(dialogFlowMiddleware)
);