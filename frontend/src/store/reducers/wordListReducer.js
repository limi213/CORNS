import axios from "axios";
import { createSlice } from "@reduxjs/toolkit";

const initialWordListState = {
  todoList: [],
  doneList: [],
};

const userId = sessionStorage.getItem("userId");

export const wordListReducer = createSlice({
  name: "wordList",
  initialState: initialWordListState,
  reducers: {
    getTodoList(state, actions) {
      state.todoList = actions.payload;
    },
    getDoneList(state, actions) {
      state.doneList = actions.payload;
    },
  },
});

export const getTodoList = (baseTime) => {
  console.log("get todo word list!");
  return async (dispatch) => {
    const sendRequest = async () => {
      const response = await axios.get(
        `${process.env.REACT_APP_HOST}/word/${userId}?` +
          new URLSearchParams({
            baseTime: baseTime,
            wordStatus: 1,
            page: 0,
            size: 100,
          })
      );
      if (response.status === 200) {
        console.log("todo list: ", response.data.list);
        return response.data.list;
      } else if (response.status === 204) {
        return [];
      }
    };
    try {
      const todoList = await sendRequest();
      dispatch(wordActions.getTodoList(todoList));
    } catch (e) {
      console.error(e);
    }
  };
};

export const getDoneList = (baseTime) => {
  console.log("get done word list!");
  return async (dispatch) => {
    const sendRequest = async () => {
      const response = await axios.get(
        `${process.env.REACT_APP_HOST}/word/${userId}?` +
          new URLSearchParams({
            baseTime: baseTime,
            wordStatus: 2,
            page: 0,
            size: 100,
          })
      );
      if (response.status === 200) {
        console.log("done list: ", response.data.list);
        return response.data.list;
      } else if (response.status === 204) {
        return [];
      }
    };
    try {
      const doneList = await sendRequest();
      dispatch(wordActions.getDoneList(doneList));
    } catch (e) {
      console.error(e);
    }
  };
};

export const wordActions = wordListReducer.actions;
export const { initialState } = wordListReducer;
