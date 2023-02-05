import {
  applyMiddleware,
  combineReducers,
  configureStore,
} from "@reduxjs/toolkit";
import { logger } from "redux-logger";
import thunk from "redux-thunk";
import { roomListReducer } from "store/reducers/roomListReducer";
import { subjectsReducer } from "store/reducers/subjectsReducer";

const rootReducer = combineReducers({
  roomListReducer: roomListReducer.reducer,
  subjectsReducer: subjectsReducer.reducer,
});

export const store = configureStore(
  { reducer: rootReducer },
  applyMiddleware(thunk, logger)
);

export default store;
