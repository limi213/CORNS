import axios from "axios";

export const getHomeRoomLists = async () => {
  const response = await axios.get(
    `${process.env.REACT_APP_HOST}/room?page=0&size=6`
  );
  return response.data.rooms;
};
