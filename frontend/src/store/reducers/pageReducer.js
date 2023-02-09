import { createSlice } from "@reduxjs/toolkit";

export const pageReducer = createSlice({
  name: "page",
  initialState: {
    pageCount: 0,
  },
  reducers: {
    addPageCount: (state, action) => {
      state.pageCount = action.payload;
    },
  },
});

export default pageReducer.reducer;
export const { addPageCount } = pageReducer.actions;
