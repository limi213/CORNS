import * as roomListsAPI from "../api/RoomLists";
import { createPromiseThunk, reducerUtils } from "lib/asyncUtils";

// action

const GET_ROOMLISTS = "roomLists/GET_ROOMLISTS";
const GET_ROOMLISTS_SUCCESS = "roomLists/GET_ROOMLISTS_SUCCESS";
const GET_ROOMLISTS_ERROR = "roomLists/GET_ROOMLISTS_ERROR";

// const GET_ROOM = "roomLists/GET_ROOM";
// const GET_ROOM_SUCCESS = "roomLists/GET_ROOM_SUCCESS";
// const GET_ROOM_ERROR = "roomLists/GET_ROOM_ERROR";

// action을 호출하는 thunk 함수

// export const getRoomLists = () => async (dispatch) => {
//   // 요청이 시작됨
//   dispatch({ type: GET_ROOMLISTS });
//   // api를 호출
//   try {
//     const roomLists = await roomListsAPI.getRoomLists();
//     // 성공했을 때
//     dispatch({ type: GET_ROOMLISTS_SUCCESS, roomLists });
//   } catch (e) {
//     // 실패했을 때
//     dispatch({ type: GET_ROOMLISTS_ERROR, error: e });
//   }
// };

export const getRoomLists = createPromiseThunk(
  GET_ROOMLISTS,
  roomListsAPI.getRoomLists
);

const initialState = {
  roomLists: reducerUtils.initial(),
};

// reducer

export default function roomLists(state = initialState, action) {
  switch (action.type) {
    case GET_ROOMLISTS:
      return {
        ...state,
        roomLists: reducerUtils.loading(),
      };
    case GET_ROOMLISTS_SUCCESS:
      return {
        ...state,
        roomLists: reducerUtils.success(action.payload),
      };
    case GET_ROOMLISTS_ERROR:
      return {
        ...state,
        roomLists: reducerUtils.error(action.payload),
      };
    default:
      return state;
  }
}
