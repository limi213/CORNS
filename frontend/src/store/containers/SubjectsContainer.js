import LogSubjectBtn from "components/ConversationLog/LogSubjectBtn";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getSubjects } from "store/reducers/subjectsReducer";

function SubjectsContainer({ reset }) {
  const dispatch = useDispatch();
  const subjects = useSelector((state) => state.subjectsReducer);

  useEffect(() => {
    dispatch(getSubjects());
  }, [dispatch]);

  const subjectBtn = subjects.map((item) => (
    <LogSubjectBtn subject={item} key={item.subjectNo} reset={reset} />
  ));
  return <div>{subjects && subjectBtn}</div>;
}

export default SubjectsContainer;
