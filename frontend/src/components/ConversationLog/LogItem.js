import React from 'react';

function LogItem({log}) {
    // dummy data
    const { room_no, bookmark, subject, title, start_date, time, max_member, self_score, ddabong} = log

    return (
        <li>
            <button>bookmark</button>
            <span>{subject}</span>
            <span>{title}</span>
            <span>{start_date}</span>
            <span>{time}</span>
            <span>{max_member}</span>
            <span>{self_score}</span>
            <span>{ddabong}</span>
        </li>
    )
}

export default LogItem;