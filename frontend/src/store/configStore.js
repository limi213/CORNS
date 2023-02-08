import {
  applyMiddleware,
  combineReducers,
  configureStore,
} from "@reduxjs/toolkit";
import { logger } from "redux-logger";
import thunk from "redux-thunk";
import { roomListReducer } from "store/reducers/roomListReducer";
import { subjectsReducer } from "store/reducers/subjectsReducer";
import { roomFilterReducer } from "store/reducers/roomFilterReducer";
import { userInfoReducer } from "store/reducers/userInfoReducer";
import { friendListReducer } from "store/reducers/friendListReducer";
import { expProgressBarReducer } from "store/reducers/expProgressBarReducer";
import { attendProgressBarReducer } from "store/reducers/attendProgressBarReducer";

const rootReducer = combineReducers({
  roomListReducer: roomListReducer.reducer,
  subjectsReducer: subjectsReducer.reducer,
  roomFilterReducer: roomFilterReducer.reducer,
  userInfoReducer: userInfoReducer.reducer,
  friendListReducer: friendListReducer.reducer,
  expProgressBarReducer: expProgressBarReducer.reducer,
  attendProgressBarReducer: attendProgressBarReducer.reducer,
});

export const store = configureStore(
  { reducer: rootReducer },
  applyMiddleware(thunk, logger)
);

export default store;
