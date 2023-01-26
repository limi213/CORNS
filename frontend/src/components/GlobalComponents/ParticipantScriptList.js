import React from "react";
import ParticipantScriptCard from "./ParticipantScriptCard";

function ParticipantScriptList({ participants }) {
  return (
    <ul>
      {participants.map((item, index) => {
        return <ParticipantScriptCard participant={item} key={index} />;
      })}
    </ul>
  );
}

export default ParticipantScriptList;
