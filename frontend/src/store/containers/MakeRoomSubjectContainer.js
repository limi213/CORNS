import SubjectBtn from "components/Conversation/MakeRoomSubjectBtn";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getSubjects } from "store/reducers/subjectsReducer";

function MakeRoomSubjectContainer() {
  const dispatch = useDispatch();
  const subjects = useSelector((state) => state.subjectsReducer);

  useEffect(() => {
    dispatch(getSubjects());
  }, [dispatch]);

  const subjectBtn = subjects.map((item) => (
    <SubjectBtn subject={item} key={item.subjectNo} />
  ));
  return <div>{subjects && subjectBtn}</div>;
}

export default MakeRoomSubjectContainer;
