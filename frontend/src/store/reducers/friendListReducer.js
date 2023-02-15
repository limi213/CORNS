import axios from "axios";
import { createSlice } from "@reduxjs/toolkit";

import authHeader from "auth/authHeader";
import getRefreshToken from "auth/getRefreshToken";
import Logout from "auth/Logout";
import { toStringDate } from "./roomFilterReducer";

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
    isFriendListLoading(state, actions) {
      state.isFriendListLoading = actions.payload;
    },
    getFriendList(state, actions) {
      state.friendList = actions.payload;
    },
    removeFriendList(state, actions) {
      state.friendList = state.friendList.filter((item) => item.userId !== actions.payload)
    },
    isFriendRequestListLoading(state, actions) {
      state.isFriendListLoading = actions.payload;
    },
    getFriendRequestList(state, actions) {
      state.friendRequestList = actions.payload;
    },
    removeFriendRequestList(state, actions) {
      state.friendRequestList = state.friendRequestList.filter((item) => item.userId !== actions.payload)
    }
  },
});

// 친구 검색 axios -> pagination 추가해야함 ...
export const getFriendListAxios = (type = "nickname", text = "") => {
  return async (dispatch) => {
    const sendRequest = async () => {
      dispatch(friendActions.isFriendListLoading(true));
      // console.log("get friendlist!");

      const response = await axios.get(
        `${process.env.REACT_APP_HOST}/friend/${sessionStorage.getItem(
          "userId"
        )}?` +
          new URLSearchParams({
            filter: type,
            keyword: text,
            baseTime: toStringDate(new Date()),
            page: 0,
            size: 100,
          }),
        {
          headers: authHeader(),
          validateStatus: (status) =>
            status === 200 || status === 204 || status === 401,
        }
      );

      if (response.status === 401) {
        // console.log("unauthorized!-> refresh!");
        const refreshResponse = await getRefreshToken();

        if (refreshResponse === 200) {
          return sendRequest();
        } else {
          alert("세션이 만료되었습니다.");
          Logout();
          return false;
        }
      } else if (response.status === 200) {
        return response.data.list;
      } else if (response.status === 204) {
        return [];
      }
    };
    try {
      const friendList = await sendRequest();
      dispatch(friendActions.getFriendList(friendList));
      // console.log(friendList);
    } catch (e) {
      console.error(e);
    }
    dispatch(friendActions.isFriendListLoading(false));
  };
};

// 친구 신청 목록 axios
// refresh token 성공
export const getFriendRequestListAxios = () => {
  return async (dispatch) => {
    // axios 보내는 함수
    const sendRequest = async () => {
      dispatch(friendActions.isFriendRequestListLoading(true));
      // console.log("get friendrequest list!");

      const response = await axios.get(
        `${process.env.REACT_APP_HOST}/friend/receive/${sessionStorage.getItem(
          "userId"
        )}`,
        {
          headers: authHeader(),
          validateStatus: (status) => {
            return status === 200 || status === 204 || status === 401;
          },
        }
      );

      // 1. axios 요청 보냈는데 401 error -> access token 만료
      // refresh token 요청
      if (response.status === 401) {
        // console.log("unauthorized!-> refresh!");
        const refreshResponse = await getRefreshToken();

        // 1.1 refresh 성공한 경우 -> 다시 sendrequest
        if (refreshResponse === 200) {
          return sendRequest();
        }
        //  1.2 refresh 실패한 경우
        else {
          alert("세션이 만료되었습니다.");
          Logout();
          return false;
        }
      }
      // 2. axios 요청 잘된 경우
      else if (response.status === 200) {
        return response.data.recvList;
      } else if (response.status === 204) {
        return [];
      }
    };

    try {
      const friendRequestList = await sendRequest();
      dispatch(friendActions.getFriendRequestList(friendRequestList));
      // console.log(friendRequestList)
    } catch (e) {
      console.error(e);
    }
    dispatch(friendActions.isFriendRequestListLoading(false));
  };
};

export const friendActions = friendListReducer.actions;
export const { initialState } = friendListReducer;
