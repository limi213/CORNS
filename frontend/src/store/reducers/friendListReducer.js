// test 중!!!!!!!!!!!!!!!!!!!!!!!1


import React, {useEffect} from 'react';
import axios from "axios";
import { createSlice } from "@reduxjs/toolkit";

import authHeader from "auth/authHeader";
import getRefreshToken from "auth/getRefreshToken";
import Logout from "auth/Logout";

// 파일 이름 수정!!!!!!!!
import useAxios from "auth/useAxiosTest";
import { useDispatch } from "react-redux";

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
    isFriendRequestListLoading(state, actions) {
      state.isFriendListLoading = actions.payload;
    },
    getFriendRequestList(state, actions) {
      state.friendRequestList = actions.payload;
    },
  },
});

// 친구 검색 axios -> pagination 추가해야함 ...
export const getFriendListAxios = (type = "nickname", text = "") => {
  return async (dispatch) => {
    dispatch(friendActions.isFriendListLoading(true));
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
      console.log("get friendrequest list!");

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
        console.log("unauthorized!-> refresh!");
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
        console.log("axios success!");
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
    dispatch(friendActions.isFriendRequestListLoading(false));
  };
};

// 친구신청 목록 axios
// useAxios test
export const useFriendRequestListAxios = () => {
  const dispatch = useDispatch();
  const { data, isLoading, sendRequest } = useAxios();
  sendRequest({
    url: `${process.env.REACT_APP_HOST}/friend/receive/${sessionStorage.getItem(
      "userId"
    )}`,
  });

  useEffect(() => {
    dispatch(friendActions.isFriendRequestListLoading(isLoading));
  }, [isLoading]);

  useEffect(() => {
    dispatch(friendActions.getFriendRequestList(data.recvList))
  }, [data]);
};



export const friendActions = friendListReducer.actions;
export const { initialState } = friendListReducer;
