import axios from "axios";

export const getSubjects = async () => {
  const response = await axios.get(`${process.env.REACT_APP_HOST}/subject`);
  return response.data.subjects;
};
