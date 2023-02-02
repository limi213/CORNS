import SubjectBtn from "components/Conversation/SubjectBtn";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getSubjects } from "redux/modules/subjects";

function SubjectsContainer() {
  const { data, loading, error } = useSelector(
    (state) => state.subjects.subjects
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSubjects());
  }, [dispatch]);

  if (loading) return <div>로딩중..</div>;
  if (error) return <div>에러발생</div>;
  if (!data) return <div>데이터 없다야</div>;

  const subjectBtn = data.map((item) => (
    <SubjectBtn subject={item.value} key={item.subjectNo} />
  ));
  return <div>{data && subjectBtn}</div>;
}

export default SubjectsContainer;
