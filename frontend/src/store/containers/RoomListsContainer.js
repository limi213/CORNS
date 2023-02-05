import RoomList from "components/Conversation/RoomList";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getRoomList } from "store/reducers/roomListReducer";

function RoomListsContainer() {
  const dispatch = useDispatch();
  const roomList = useSelector((state) => state.roomListReducer);

  useEffect(() => {
    dispatch(getRoomList());
  }, [dispatch]);

  return <div>{roomList && <RoomList roomLists={roomList} />}</div>;
}

export default RoomListsContainer;
