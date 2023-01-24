import React from 'react';
import ParticipantCard from './ParticipantCard';


function ParticipantList({participants}) {
    return (
        <ul>
          {participants.map((item, index) => {
            return <ParticipantCard participant={item} key={index} />;
          })}
        </ul>
      );
}

export default ParticipantList;