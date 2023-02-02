import {
  applyMiddleware,
  combineReducers,
  configureStore,
} from "@reduxjs/toolkit";
import { createLogger } from "redux-logger";
import thunk from "redux-thunk";

import roomLists from "redux/modules/roomLists";
import subjects from "redux/modules/subjects";

const logger = createLogger();

const rootReducer = combineReducers({
  roomLists,
  subjects,
});

export const store = configureStore(
  { reducer: rootReducer },
  applyMiddleware(thunk, logger)
);

export default store;
