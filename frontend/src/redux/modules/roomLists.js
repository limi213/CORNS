import * as roomListsAPI from "../api/RoomLists";
import {
  createPromiseThunk,
  reducerUtils,
  handleAsyncActions,
} from "lib/asyncUtils";

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

const getRoomListsReducer = handleAsyncActions(GET_ROOMLISTS, "roomLists");

// reducer 리팩토링 후

export default function roomLists(state = initialState, action) {
  switch (action.type) {
    case GET_ROOMLISTS:
    case GET_ROOMLISTS_SUCCESS:
    case GET_ROOMLISTS_ERROR:
      return getRoomListsReducer(state, action);
    default:
      return state;
  }
}
