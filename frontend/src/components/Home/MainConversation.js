import RoomList from "components/Conversation/RoomList";
import React, { useEffect, useRef, useState, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getRoomList } from "store/reducers/roomListReducer";
import { initialState } from "store/reducers/roomFilterReducer";
function MainConversation() {
  const dispatch = useDispatch();
  const { data, loading } = useSelector((state) => state.roomListReducer);
  const filter = initialState;
  useEffect(() => {
    dispatch(getRoomList(filter));
  }, []);

  if (!loading) {
    return (
      <div>{data.list && <RoomList roomLists={data.list.slice(0, 6)} />}</div>
    );
  } else {
    return <div>로딩중</div>;
  }
}

export default MainConversation;
