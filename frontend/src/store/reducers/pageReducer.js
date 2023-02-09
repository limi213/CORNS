import { createSlice } from "@reduxjs/toolkit";

export const pageReducer = createSlice({
  name: "page",
  initialState: {},
  reducers: {
    addPage: (state, action) => {
      state = action.payload;
    },
  },
});

export default pageReducer.reducer;
export const { addPage } = pageReducer.actions;
