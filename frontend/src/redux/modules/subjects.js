// import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
// import * as subjectAPI from "../api/Subject";

import * as subjectAPI from "../api/Subjects";
import {
  createPromiseThunk,
  reducerUtils,
  handleAsyncActions,
} from "lib/asyncUtils";

const GET_SUbJECTS = "subjects/GET_SUbJECTS";
const GET_SUbJECTS_SUCCESS = "subjects/GET_SUbJECTS_SUCCESS";
const GET_SUbJECTS_ERROR = "subjects/GET_SUbJECTS_ERROR";

export const getSubjects = createPromiseThunk(
  GET_SUbJECTS,
  subjectAPI.getSubjects
);

const initialState = {
  subjects: reducerUtils.initial(),
};

const getSubjectsReducer = handleAsyncActions(GET_SUbJECTS, "subjects");

export default function subjects(state = initialState, action) {
  switch (action.type) {
    case GET_SUbJECTS:
    case GET_SUbJECTS_SUCCESS:
    case GET_SUbJECTS_ERROR:
      return getSubjectsReducer(state, action);
    default:
      return state;
  }
}
