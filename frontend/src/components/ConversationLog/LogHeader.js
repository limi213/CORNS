import React from 'react';

function LogHeader() {
    return (
        <div>
            <span>북마크</span>
            <span>주제</span>
            <span>제목</span>
            <select>
                <option value="newest">최신순</option>
                <option value="oldest">오래된순</option>
            </select>
            <span>대화시간</span>
            <span>인원</span>
            <span>자기평가</span>
            <span>따봉개수</span>
        </div>
    )
}

export default LogHeader;