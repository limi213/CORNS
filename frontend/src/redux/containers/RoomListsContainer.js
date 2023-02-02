import RoomList from "components/Conversation/RoomList";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getRoomLists } from "redux/modules/roomLists";

function RoomListsContainer() {
  const { data, loading, error } = useSelector(
    (state) => state.roomLists.roomLists
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getRoomLists());
  }, [dispatch]);

  if (loading) return <div>로딩중..</div>;
  if (error) return <div>에러발생</div>;
  if (!data) return <div>데이터 없다야</div>;

  return (
    <div>
      <RoomList roomLists={data} />
    </div>
  );
}

export default RoomListsContainer;
