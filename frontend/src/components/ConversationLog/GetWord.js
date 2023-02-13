import authHeader from "auth/authHeader";
import getRefreshToken from "auth/getRefreshToken";
import Logout from "auth/Logout";
import axios from "axios";

export const GetTodoWord = async (baseTime, setTodoWords, setLoading) => {
  setLoading(true);
  const sendRequest = async () => {
    console.log("success get todo word !");
    const response = await axios.get(
      `${process.env.REACT_APP_HOST}/word/${sessionStorage.getItem(
        "userId"
      )}?` +
        new URLSearchParams({
          page: 0,
          size: 100,
          baseTime: baseTime,
          wordStatus: 1,
        }),
      {
        headers: authHeader(),
        validateStatus: (status) =>
          status === 200 || status === 204 || status === 401,
      }
    );
    if (response.status === 401) {
      console.log("unauthorized!-> refresh!");
      const refreshResponse = await getRefreshToken();

      if (refreshResponse === 200) {
        return sendRequest();
      } else {
        alert("세션이 만료되었습니다.");
        Logout();
        return false;
      }
    } else if (response.status === 200) {
      return response.data.list;
    } else if (response.status === 204) {
      return [];
    }
  };
  try {
    const todoList = await sendRequest();
    setTodoWords(todoList);
  } catch (e) {
    console.error(e);
  }
  setLoading(false);
};

export const GetDoneWord = async (baseTime, setDoneWords, setLoading) => {
  setLoading(true);
  const sendRequest = async () => {
    console.log("success get done word !");
    const response = await axios.get(
      `${process.env.REACT_APP_HOST}/word/${sessionStorage.getItem(
        "userId"
      )}?` +
        new URLSearchParams({
          page: 0,
          size: 100,
          baseTime: baseTime,
          wordStatus: 2,
        }),
      {
        headers: authHeader(),
        validateStatus: (status) =>
          status === 200 || status === 204 || status === 401,
      }
    );
    if (response.status === 401) {
      console.log("unauthorized!-> refresh!");
      const refreshResponse = await getRefreshToken();

      if (refreshResponse === 200) {
        return sendRequest();
      } else {
        alert("세션이 만료되었습니다.");
        Logout();
        return false;
      }
    } else if (response.status === 200) {
      return response.data.list;
    } else if (response.status === 204) {
      return [];
    }
  };
  try {
    const todoList = await sendRequest();
    setDoneWords(todoList);
  } catch (e) {
    console.error(e);
  }
  setLoading(false);
};
