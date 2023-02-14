import SubjectBtn from "components/Conversation/SubjectBtn";
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
    <SubjectBtn subject={item} key={item.subjectNo} reset={reset} />
  ));
  return <div>{subjects && subjectBtn}</div>;
}

export default SubjectsContainer;
