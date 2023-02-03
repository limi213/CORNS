import SubjectBtn from "components/Conversation/SubjectBtn";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getSubjects } from "store/reducers/subjectsReducer";

function SubjectsContainer() {
  const dispatch = useDispatch();
  const subjects = useSelector((state) => state.subjectsReducer);

  // console.log(subjects);
  useEffect(() => {
    dispatch(getSubjects());
  }, [dispatch]);

  const subjectBtn = subjects.map((item) => (
    <SubjectBtn subject={item.value} key={item.subjectNo} />
  ));
  return <div>{subjects && subjectBtn}</div>;
}

export default SubjectsContainer;
