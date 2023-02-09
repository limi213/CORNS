import { createSlice } from "@reduxjs/toolkit";

export const changeTinyNumber = (num) => {
  if (num < 10) {
    num = "0" + num.toString();
  } else {
    num = num.toString();
  }
  return num;
};

export const toStringDate = (dd) => {
  const date = dd;
  const year = date.getFullYear().toString();
  const month = changeTinyNumber(date.getMonth() + 1);
  const day = changeTinyNumber(date.getDate());
  const hour = changeTinyNumber(date.getHours());
  const minute = changeTinyNumber(date.getMinutes());
  const second = changeTinyNumber(date.getSeconds());

  const result = `${year}-${month}-${day} ${hour}:${minute}:${second}`;

  return result;
};

const now = new Date();

export const initialState = {
  page: 0,
  size: 18,
  baseTime: toStringDate(now),
  subject: "1 2 3 4 5 6 ",
  minTime: 0,
  maxTime: 30,
  isAvail: false,
};

export const roomFilterReducer = createSlice({
  name: "roomFilter",
  initialState,
  reducers: {
    addSubject: (state, action) => {
      state.subject += action.payload + " ";
    },
    removeSubject: (state, action) => {
      const subjectList = state.subject.split(" ");
      const cleaned = subjectList
        .filter((sub) => parseInt(sub) !== action.payload)
        .join(" ");
      return { ...state, subject: cleaned };
    },
    modifyMinTime: (state, action) => {
      return { ...state, minTime: action.payload };
    },
    modifyMaxTime: (state, action) => {
      return { ...state, maxTime: action.payload };
    },
    modifyIsAvail: (state, action) => {
      return { ...state, isAvail: action.payload };
    },
  },
});

export default roomFilterReducer.reducer;
export const {
  addSubject,
  removeSubject,
  addPage,
  modifyMinTime,
  modifyMaxTime,
  modifyIsAvail,
} = roomFilterReducer.actions;
