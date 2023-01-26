import React from "react";

function ParticipantScriptCard({ participant }) {
  const { imgUrl, nickname, user_id, ddabong, ignition, script } = participant;

  return (
    <div>
      <img src={imgUrl} alt={nickname} />
      <div>
        {nickname}#{user_id}
      </div>
      <div>ddabong {ddabong}</div>
      <div>발화량: {ignition}</div>
      <button>스크립트 보기</button>
      <button>스크립트 다운</button>
    </div>
  );
}

export default ParticipantScriptCard;
