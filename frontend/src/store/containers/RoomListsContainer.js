import RoomList from "components/Conversation/RoomList";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getRoomList } from "store/reducers/roomListReducer";

function RoomListsContainer({ main }) {
  const dispatch = useDispatch();
  const roomList = useSelector((state) => state.roomListReducer);
  const filter = useSelector((state) => state.roomFilterReducer);

  useEffect(() => {
    dispatch(getRoomList(filter));
  }, [dispatch, filter]);

  let maxRoomList = false;

  if (main) maxRoomList = true;

  return (
    <div>
      {roomList && <RoomList roomLists={roomList} maxRoomList={maxRoomList} />}
    </div>
  );
}

export default RoomListsContainer;
