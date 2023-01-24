import React from 'react';
import { Link } from 'react-router-dom';

function LogItem({log}) {
    // dummy data
    const { room_no, bookmark, subject, title, start_date, time, max_member, self_score, ddabong} = log
    const logUrl = `/conversationLog/logdetail/${room_no}`

    return (
        <li>
            <button>bookmark</button>
            <Link to={logUrl}>
                <span>{subject}</span>
                <span>{title}</span>
                <span>{start_date}</span>
                <span>{time}</span>
                <span>{max_member}</span>
                <span>{self_score}</span>
                <span>{ddabong}</span>
            </Link>
        </li>
    )
}

export default LogItem;