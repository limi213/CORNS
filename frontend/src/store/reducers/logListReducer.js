import axios from "axios";
import { createSlice } from "@reduxjs/toolkit";

const initialLogListState = {
  isLogListLoading: false,
  logList: [],
};

export const logListReducer = createSlice({
  name: "log",
  initialState: initialLogListState,
  reducers: {
    isLogListLoading: (state) => {
      state.isLogListLoading = !state.isLogListLoading;
    },
    getLogList(state, actions) {
      state.logList = actions.payload;
    },
  },
});

// 로그 리스트 axios
// filter + pagination 추가...
export const getLogListAxios = (filter) => {
  console.log("log list axios!");

  return async (dispatch) => {
    dispatch(logListActions.isLogListLoading());

    const sendRequest = async (state) => {
      const response = await axios.get(
        `${process.env.REACT_APP_HOST}/corns-log/${sessionStorage.getItem(
          "userId"
        )}?` + new URLSearchParams(filter),
        {
          validateStatus: (status) => status === 200 || status === 204,
        }
      );
      if (response.status === 200) {
        // console.log(response)
        return response.data.list;
      } else if (response.status === 204) {
        return [];
      }
    };
    try {
      const logList = await sendRequest();
      dispatch(logListActions.getLogList(logList));
    } catch (e) {
      console.log(e);
    }
    dispatch(logListActions.isLogListLoading());
  };
};

export const logListActions = logListReducer.actions;
export const { initialState } = logListReducer;
