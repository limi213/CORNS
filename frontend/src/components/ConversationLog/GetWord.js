import axios from "axios";

export const GetTodoWord = async (baseTime, setTodoWords, setLoading) => {
  setLoading(true);
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_HOST}/word/${sessionStorage.getItem(
        "userId"
      )}?` +
        new URLSearchParams({
          page: 0,
          size: 100,
          baseTime: baseTime,
          wordStatus: 1,
        })
    );
    if (response.status === 200) {
      setTodoWords(response.data.list);
    } else if (response.status === 204) {
      setTodoWords([]);
    }
  } catch (e) {
    console.error(e);
  }
  setLoading(false);
};

export const GetDoneWord = async (baseTime, setDoneWords, setLoading) => {
  setLoading(true);
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_HOST}/word/${sessionStorage.getItem(
        "userId"
      )}?` +
        new URLSearchParams({
          page: 0,
          size: 100,
          baseTime: baseTime,
          wordStatus: 2,
        })
    );
    if (response.status === 200) {
      setDoneWords(response.data.list);
    } else if (response.status === 204) {
      setDoneWords([]);
    }
  } catch (e) {
    console.error(e);
  }
  setLoading(false);
};
