import RoomList from "components/Conversation/RoomList";
import React, { useEffect, useRef, useState, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getRoomListAxios } from "store/reducers/roomListReducer";
import { initialState } from "store/reducers/roomFilterReducer";
function MainConversation() {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.roomListReducer.roomList);
  const loading = useSelector(
    (state) => state.roomListReducer.isRoomListLoading
  );
  const filter = initialState;
  // useEffect(() => {
  //   dispatch(getRoomList(filter));
  // }, []);
  useEffect(() => {
    dispatch(getRoomListAxios(filter));
  }, [dispatch, filter]);

  return (
    <div>
      {loading && <p>loading 중...</p>}
      {!loading && data?.list && <RoomList roomLists={data.list.slice(0, 6)} />}
    </div>
  );
}

export default MainConversation;
