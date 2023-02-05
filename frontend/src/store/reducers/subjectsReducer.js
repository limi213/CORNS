import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getSubjects = createAsyncThunk("GET_SUBJECTS", async () => {
  const response = await axios.get(`${process.env.REACT_APP_HOST}/subject`);
  return response.data.subjects;
});

export const subjectsReducer = createSlice({
  name: "subjects",
  initialState: [],
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getSubjects.fulfilled, (state, { payload }) => [
      ...payload,
    ]);
  },
});
