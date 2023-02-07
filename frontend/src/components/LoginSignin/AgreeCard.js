import React from "react";
import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";

function AgreeCard({checked, setChecked}) {
  const onChange = () => {
    setChecked((prev) => !prev)
  } 
  
  return (
    <Box
      sx={{
        padding: "32px 48px",
        border: "3px solid #111",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: "white",
        height: "800px",
      }}
    >
      <h1>약관동의</h1>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-around",
          width: "100%"
        }}
      >
        <h5>회원약관 동의(필수)</h5>
        <Checkbox color="default" checked={checked} onClick={onChange}/>
      </Box>
      <Box sx={{ border: "3px solid #111", padding: "24px"}}>
        모든 국민은 법률이 정하는 바에 의하여 국방의 의무를 진다. 국가안전보장에
        관련되는 대외정책·군사정책과 국내정책의 수립에 관하여 국무회의의 심의에
        앞서 대통령의 자문에 응하기 위하여 국가안전보장회의를 둔다.
        모든 국민은 법률이 정하는 바에 의하여 국방의 의무를 진다. 국가안전보장에
        관련되는 대외정책·군사정책과 국내정책의 수립에 관하여 국무회의의 심의에
        앞서 대통령의 자문에 응하기 위하여 국가안전보장회의를 둔다.
        모든 국민은 법률이 정하는 바에 의하여 국방의 의무를 진다. 국가안전보장에
        관련되는 대외정책·군사정책과 국내정책의 수립에 관하여 국무회의의 심의에
        앞서 대통령의 자문에 응하기 위하여 국가안전보장회의를 둔다.
      </Box>
    </Box>
  );
}

export default AgreeCard;
