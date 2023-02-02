import axios from "axios";

export const getRoomLists = async () => {
  const response = await axios.get(`${process.env.REACT_APP_HOST}/room`);
  return response.data.rooms;
};

export const postRoom = async () => {};
