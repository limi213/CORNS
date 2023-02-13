import RoomList from "components/Conversation/RoomList";
import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getRoomListAxios } from "store/reducers/roomListReducer";
import { addPage } from "store/reducers/roomFilterReducer";
import { addPageCount } from "store/reducers/pageReducer";

function RoomListsContainer() {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.roomListReducer.roomList);
  const loading = useSelector(
    (state) => state.roomListReducer.isRoomListLoading
  );
  // const { pageCount } = useSelector((state) => state.pageReducer);
  const filter = useSelector((state) => state.roomFilterReducer);
  // const page = useRef(pageCount);

  // const [addList, setAddList] = useState([]);
  // const [flag, setFlag] = useState(true);
  // const [page, setPage] = useState(0);

  useEffect(() => {
    dispatch(getRoomListAxios(filter));
  }, [dispatch, filter]);

  // useEffect(() => {
  //   setList(data.list);
  // }, [data]);

  // useEffect(() => {
  //   if (list !== undefined) {
  //     setAddList([...addList, list]);
  //   }
  // }, [list]);
  // // const nextPage = () => {
  //   setFlag((prev) => false);
  //   dispatch(addPageCount(page.current++, "ADD_PAGE_COUNT"));
  //   dispatch(addPage(page.current, "ADD_PAGE"));
  //   addNext();
  // };

  // useEffect(() => {
  // Fetch data for the first time
  // Add the scroll event listener
  // window.addEventListener("scroll", handleScroll);
  // Clean up the event listener when the component unmounts
  // return () => window.removeEventListener("scroll", handleScroll);
  // }, [page]);

  // const handleScroll = () => {
  //   const scrollTop =
  //     (document.documentElement && document.documentElement.scrollTop) ||
  //     document.body.scrollTop;
  //   const scrollHeight =
  //     (document.documentElement && document.documentElement.scrollHeight) ||
  //     document.body.scrollHeight;

  //   const clientHeight =
  //     document.documentElement.clientHeight || window.innerHeight;

  //   const threshold = 20;

  //   if (scrollTop + clientHeight >= scrollHeight - threshold) {
  //     setPage(page + 1);
  //     const pageFilter = { ...filter };
  //     pageFilter.page = page;
  //     dispatch(getRoomList(pageFilter));

  //     setAddList([...addList, ...list]);
  //     if (addList.length > 0) {
  //       setFlag(() => false);
  //     }
  //   }
  // };

  // const throttle = (callback, delay) => {
  //   let timer = null;
  //   return (arg) => {
  //     if (timer === null) {
  //       timer = setTimeout(() => {
  //         callback(arg);
  //         timer = null;
  //       }, delay);
  //     }
  //   };
  // };

  return (
    <div>
      {loading && <p>loading 중...</p>}
      {
        !loading && data?.list && <RoomList roomLists={data.list} />
        // <RoomList roomLists={addList} />
      }
    </div>
  );
}

export default RoomListsContainer;
