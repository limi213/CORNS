import React from 'react';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';


function LogHeader() {
    return (
        <TableRow>
            <TableCell>북마크</TableCell>
            <TableCell>주제</TableCell>
            <TableCell>제목</TableCell>
            <TableCell>
                <select>
                    <option value="newest">최신순</option>
                    <option value="oldest">오래된순</option>
                </select>
            </TableCell>
            <TableCell>대화시간</TableCell>
            <TableCell>인원</TableCell>
            <TableCell>자기평가</TableCell>
            <TableCell>따봉개수</TableCell>
        </TableRow>
    )
}

export default LogHeader;