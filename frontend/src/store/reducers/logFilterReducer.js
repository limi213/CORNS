import axios from "axios";
import { createSlice } from "@reduxjs/toolkit";
import { toStringDate } from "./roomFilterReducer";

const initialLogFilterState = {
  baseTime: toStringDate(new Date()),
  subject: "1 2 3 4 5 ",
  minTime: 0,
  maxTime: 40,
  startDate: "2023-01-01",
  endDate: "2023-12-31",
  selfScore: "0 1 2 3 4 5 ",
  getThumb: "2",
  page: 0,
  size: 10,
  sort: "startTm,DESC",
};

export const logFilterReducer = createSlice({
  name: "logFilter",
  initialState: initialLogFilterState,
  reducers: {
    addSubject: (state, action) => {
      state.subject += action.payload + " ";
    },
    remobeSubject: (state, action) => {
      const subjectList = state.subject.split(" ");
      const cleaned = subjectList
        .filter((sub) => parseInt(sub) !== action.payload)
        .join(" ");
      return { ...state, subject: cleaned };
    },
    toggleSortOption(state, actions) {
      state.sort = actions.payload;
    },
  },
});

export const logFilterActions = logFilterReducer.actions;
export const { initialState } = logFilterReducer;
