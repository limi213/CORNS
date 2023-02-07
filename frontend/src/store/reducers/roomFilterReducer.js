import { createSlice } from "@reduxjs/toolkit";

export const changeTinyNumber = (num) => {
  if (num < 10) {
    num = "0" + num.toString();
  } else {
    num = num.toString();
  }
  return num;
};

export const toStringDate = () => {
  const date = new Date();
  const year = date.getFullYear().toString();
  const month = changeTinyNumber(date.getMonth() + 1);
  const day = changeTinyNumber(date.getDate());
  const hour = changeTinyNumber(date.getHours());
  const minute = changeTinyNumber(date.getMinutes());
  const second = changeTinyNumber(date.getSeconds());

  const result = `${year}-${month}-${day} ${hour}:${minute}:${second}`;

  return result;
};

export const roomFilterReducer = createSlice({
  name: "roomFilter",
  initialState: {
    page: 0,
    size: 18,
    baseTime: toStringDate(),
    subject: "1 2 3 4 5 6 ",
    minTime: 0,
    maxTime: 30,
    isAvail: false,
  },
  reducers: {
    add: (state, action) => {
      state.subject += action.payload + " ";
    },
    remove: (state, action) => {
      const subjectList = state.subject.split(" ");
      const cleaned = subjectList
        .filter((sub) => parseInt(sub) !== action.payload)
        .join(" ");
      return { ...state, subject: cleaned };
    },
  },
});

export default roomFilterReducer.reducer;
export const { add, remove } = roomFilterReducer.actions;
export const { initialState } = roomFilterReducer;
