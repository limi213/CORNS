import axios from "axios";
import { createSlice } from "@reduxjs/toolkit";

import authHeader from "auth/authHeader";
import getRefreshToken from "auth/getRefreshToken";
import Logout from "auth/Logout";

const initialFriendListState = {
  isFriendListLoading: false,
  friendList: [],
  isFriendRequestListLoading: false,
  friendRequestList: [],
};

export const friendListReducer = createSlice({
  name: "friend",
  initialState: initialFriendListState,
  reducers: {
    isFriendListLoading(state) {
      state.isFriendListLoading = !state.isFriendListLoading;
    },
    getFriendList(state, actions) {
      state.friendList = actions.payload;
    },
    isFriendRequestListLoading(state) {
      state.isFriendRequestListLoading = !state.isFriendRequestListLoading;
    },
    getFriendRequestList(state, actions) {
      state.friendRequestList = actions.payload;
    },
  },
});

// 친구 검색 axios -> pagination 추가해야함 ...
export const getFriendListAxios = (type = "nickname", text = "") => {
  return async (dispatch) => {
    dispatch(friendActions.isFriendListLoading());
    // const startDate = moment().format("YYYY-MM-DDTHH:mm:sszz")
    // console.log(startDate)
    const sendRequest = async () => {
      const response = await axios.get(
        `${process.env.REACT_APP_HOST}/friend/${sessionStorage.getItem(
          "userId"
        )}?` +
          new URLSearchParams({
            filter: type,
            keyword: text,
            baseTime: "2023-02-28 00:00:00",
            page: 0,
            size: 20,
          }),
        {
          validateStatus: (status) => status === 200 || status === 204,
        }
      );
      // console.log('search friend axios', type, text)
      if (response.status === 200) {
        return response.data.list;
      } else if (response.status === 204) {
        return [];
      }
    };
    try {
      const friendList = await sendRequest();
      dispatch(friendActions.getFriendList(friendList));
    } catch (e) {
      console.error(e);
    }
    dispatch(friendActions.isFriendListLoading());
  };
};

// 친구 신청 목록 axios
export const getFriendRequestListAxios = () => {
  return async (dispatch) => {
    
    const sendRequest = async () => {
      dispatch(friendActions.isFriendRequestListLoading());
      console.log("get friendrequest list!");
      console.log(authHeader())
      const response = await axios.get(
        `${process.env.REACT_APP_HOST}/friend/receive/${sessionStorage.getItem("userId")}`,
        {headers: authHeader()},
        {
          validateStatus: (status) =>
            status === 200 || status === 204 || status === 401,
        }
      );
      if (response.status === 401) {
        console.log("unauthorized!");
        const refreshResponse = getRefreshToken();
        if (refreshResponse) {
          return sendRequest();
        } else {
          Logout();
          return false;
        }
      } else if (response.status === 200) {
        return response.data.recvList;
      } else if (response.status === 204) {
        return [];
      }
    };

    try {
      const friendRequestList = await sendRequest();
      dispatch(friendActions.getFriendRequestList(friendRequestList));
    } catch (e) {
      console.error(e);
    }
    dispatch(friendActions.isFriendRequestListLoading());
  };
};

export const friendActions = friendListReducer.actions;
export const { initialState } = friendListReducer;
