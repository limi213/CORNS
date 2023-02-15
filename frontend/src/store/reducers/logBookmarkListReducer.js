import axios from "axios";
import { createSlice } from "@reduxjs/toolkit";
import { toStringDate } from "./roomFilterReducer";

const initiaLogBookmarkListState = {
  isLogBookmarkListLoading: false,
  logBookmarkList: [],
  sort: "startTm,DESC",
};

export const logBookmarkListReducer = createSlice({
  name: "logBookmark",
  initialState: initiaLogBookmarkListState,
  reducers: {
    isLogBookmarkListLoading: (state) => {
      state.isLogBookmarkListLoading = !state.isLogBookmarkListLoading;
    },
    getLogBookmarkList(state, actions) {
      state.logBookmarkList = actions.payload;
    },
    toggleSortOption(state, actions) {
      state.sort = actions.payload;
    },
  },
});

// 즐겨찾기 목록 가져오기 axios -> pagination 추가해야함 ...
export const getLogBookmarkListAxios = (sort) => {
  // console.log("get Bookmark list!");
  return async (dispatch) => {
    dispatch(logBookmarkListActions.isLogBookmarkListLoading());

    const sendRequest = async (state) => {
      const response = await axios.get(
        `${
          process.env.REACT_APP_HOST
        }/corns-log/bookmark/${sessionStorage.getItem("userId")}?` +
          new URLSearchParams({
            baseTime: toStringDate(new Date()),
            page: 0,
            size: 100,
            sort: `${sort}`,
          }),
        {
          validateStatus: (status) => status === 200 || status === 204,
        }
      );
      if (response.status === 200) {
        return response.data.list;
      } else if (response.status === 204) {
        return [];
      }
    };
    try {
      const logBookmarkList = await sendRequest();
      dispatch(logBookmarkListActions.getLogBookmarkList(logBookmarkList));
    } catch (e) {
      console.error(e);
    }
    dispatch(logBookmarkListActions.isLogBookmarkListLoading());
  };
};

export const logBookmarkListActions = logBookmarkListReducer.actions;
export const { initialState } = logBookmarkListReducer;
