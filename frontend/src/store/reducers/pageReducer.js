import { createSlice } from "@reduxjs/toolkit";

export const pageReducer = createSlice({
  name: "page",
  initialState: {
    pageCount: 0,
  },
  reducers: {
    addPageCount: (state) => {
      state.pageCount += 1;
    },
  },
});

export default pageReducer.reducer;
export const { addPageCount } = pageReducer.actions;
