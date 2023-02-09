import { useState, useEffect } from "react";
import axios from "axios";

import { Input, Box, Button } from "@mui/material";
import React from "react";
import StarRating from "./StarRating";

// 자기평가 등록 axios
const onEvaluationAxios = async (roomNo, userId, score, description) => {
  try {
    const response = await axios.patch(
      `${process.env.REACT_APP_HOST}/evaluation/self`,
      {
        roomNo,
        userId,
        score,
        description,
      }
    );
    if (response.status === 200) {
      console.log(response.data);
      return true;
    } else {
      return false;
    }
  } catch (e) {
    console.log(e);
    return false;
  }
};

function SelfEvaluationInput({ roomNo, selfScore, selfDesc }) {
  const [registered, setRegistered] = useState(false);
  const [score, setScore] = useState(0)
  const [description, setDescription] = useState("")

  // props undefined 해결,,
  useEffect(() => {
    setRegistered(selfScore > 0)
    setScore(selfScore)
    setDescription(selfDesc)
  }, [selfScore, selfDesc])


  const onEvaluationHandler = async (e) => {
    e.preventDefault();
    const res = await onEvaluationAxios(
      roomNo,
      sessionStorage.getItem("userId"),
      score,
      description
    );
    setRegistered(res);
    console.log('registered', registered)
  };

  const onChangeDescription = (e) => {
    if (!registered) {
      setDescription(e.target.value);
    }
  };

  return (
    <>
      <Box
        component="form"
        sx={{
          border: "3px solid #111",
          position: "relative",
          width: "100%",
        }}
      >
        <StarRating registered={registered} score={Math.max(1, score)} setScore={setScore} />
        <Input
          rows={4}
          multiline={true}
          value={description}
          onChange={onChangeDescription}
          sx={{
            width: "100%",
            backgroundColor: "white",
            padding: "1rem 5.5rem 1rem 1rem",
          }}
        />

        {!registered && (
          <Button
            variant="contained"
            component="label"
            sx={{ position: "absolute", bottom: "24px", right: "24px" }}
            onClick={onEvaluationHandler}
          >
            등록
            <input hidden type="submit"></input>
          </Button>
        )}
      </Box>
    </>
  );
}

export default SelfEvaluationInput;
