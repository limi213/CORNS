import axios from "axios";
import React, { useEffect, useState } from "react";
import { createSlice } from "@reduxjs/toolkit";
import authHeader from "auth/authHeader";
import getRefreshToken from "auth/getRefreshToken";
import Logout from "auth/Logout";
import { toStringDate } from "./roomFilterReducer";


const initialRoomListState = {
  isRoomListLoading: false,
  roomList: [],
};

export const roomListReducer = createSlice({
  name: "roomList",
  initialState: initialRoomListState,
  reducers: {
    isRoomListLoading(state, actions) {
      state.isRoomListLoading = actions.payload;
    },
    getRoomList(state, actions) {
      state.roomList = actions.payload;
    },
  },
});

export const getRoomListAxios = (filter) => {
  return async (dispatch) => {
    // axios 보내는 함수
    const sendRequest = async () => {
      dispatch(roomListActions.isRoomListLoading(true));
      // console.log("get room list!");

      const response = await axios.get(`${process.env.REACT_APP_HOST}/room`, {
        headers: authHeader(),
        params: filter,
        validateStatus: (status) => {
          return status === 200 || status === 204 || status === 401;
        },
      });

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
        // console.log(response.data);
        return response.data;
      } else if (response.status === 204) {
        return [];
      }
    };

    try {
      const roomList = await sendRequest();

      dispatch(roomListActions.getRoomList(roomList));
    } catch (e) {}
    dispatch(roomListActions.isRoomListLoading(false));
  };
};

export const roomListActions = roomListReducer.actions;
export const { initialState } = roomListReducer;
