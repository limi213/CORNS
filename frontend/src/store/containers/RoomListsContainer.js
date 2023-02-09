import RoomList from "components/Conversation/RoomList";
import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getRoomList } from "store/reducers/roomListReducer";
import { addPage } from "store/reducers/roomFilterReducer";
import { addPageCount } from "store/reducers/pageReducer";

function RoomListsContainer({ main }) {
  const dispatch = useDispatch();
  const { data, loading } = useSelector((state) => state.roomListReducer);
  // const { pageCount } = useSelector((state) => state.pageReducer);
  const filter = useSelector((state) => state.roomFilterReducer);
  // const page = useRef(pageCount);
  const [list, setList] = useState([]);
  const [addList, setAddList] = useState([]);
  const [flag, setFlag] = useState(true);
  const [page, setPage] = useState(1);

  useEffect(() => {
    dispatch(getRoomList(filter));
  }, [dispatch, filter]);

  useEffect(() => {
    setList(data.list);
  }, [data]);

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

  let maxRoomList = false;

  if (main) maxRoomList = true;

  useEffect(() => {
    // Fetch data for the first time
    // Add the scroll event listener
    window.addEventListener("scroll", handleScroll);
    // Clean up the event listener when the component unmounts
    return () => window.removeEventListener("scroll", handleScroll);
  }, [page]);

  const handleScroll = () => {
    // Get the current scroll position
    const scrollTop =
      (document.documentElement && document.documentElement.scrollTop) ||
      document.body.scrollTop;
    // Get the total height of the content
    const scrollHeight =
      (document.documentElement && document.documentElement.scrollHeight) ||
      document.body.scrollHeight;
    // Get the height of the viewport
    const clientHeight =
      document.documentElement.clientHeight || window.innerHeight;
    // Calculate the threshold for triggering a load
    const threshold = 50;
    // Check if the user has scrolled to the bottom
    if (scrollTop + clientHeight >= scrollHeight - threshold) {
      // Increment the page number

      setPage(page + 1);
      dispatch(addPage(page, "ADD_PAGE"));
      setAddList([...addList, ...list]);
      console.log("닿음");
      if (addList.length > 0) {
        setFlag(() => false);
      }
    }
  };

  const throttle = (callback, delay) => {
    let timer = null;
    return (arg) => {
      if (timer === null) {
        timer = setTimeout(() => {
          callback(arg);
          timer = null;
        }, delay);
      }
    };
  };

  return (
    <div onScroll={throttle(handleScroll, 300)}>
      {list && flag ? (
        <RoomList roomLists={list} maxRoomList={maxRoomList} />
      ) : (
        <RoomList roomLists={addList} maxRoomList={maxRoomList} />
      )}
    </div>
  );
}

export default RoomListsContainer;
