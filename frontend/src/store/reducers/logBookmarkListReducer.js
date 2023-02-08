import axios from "axios";
import { createSlice } from "@reduxjs/toolkit";
import { toStringDate } from "./roomFilterReducer";

const initiaLogBookmarkListState = {
  isLogBookmarkListLoading: false,
  logBookmarkList: [],
  // sort: "DESC",
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
  },
});

// 즐겨찾기 목록 가져오기 axios -> pagination 추가해야함 ...
export const getLogBookmarkListAxios = () => {
  return async (dispatch) => {
    dispatch(logBookmarkListActions.isLogBookmarkListLoading());

    const sendRequest = async () => {
      console.log('즐겨찾기 axios 보내겠음!')
      const response = await axios.get(
        `${
          process.env.REACT_APP_HOST
        }/corns-log/bookmark/${sessionStorage.getItem("userId")}?` +
          new URLSearchParams({
            baseTime: toStringDate(),
            page: 0,
            size: 20,
            sort: "startTm,DESC"
          }),
        {
          validateStatus: (status) => status === 200 || status === 204,
        }
      );
      console.log("get bookmark");
      console.log(response);
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