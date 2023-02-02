import React, {useState} from "react";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

function LogHeader() {
  const [type, setType] = useState("newest");
  
  const handleChange = (e) => {
    setType(e.target.value);
  };
  
  return (
    <TableRow>
      <TableCell width="10%" align="center">
        북마크
      </TableCell>

      <TableCell width="10%" align="center">
        주제
      </TableCell>

      <TableCell width="25%" align="center">
        제목
      </TableCell>

      <TableCell width="15%" align="center">
        <Select value={type} variant="standard" size="small" onChange={handleChange} sx={{fontSize: "14px"}}>
          <MenuItem value={"newest"}>최신순</MenuItem>
          <MenuItem value={"oldest"}>오래된순</MenuItem>
        </Select>
      </TableCell>

      <TableCell width="10%" align="center">
        대화시간
      </TableCell>

      <TableCell width="10%" align="center">
        인원
      </TableCell>

      <TableCell width="10%" align="center">
        자기평가
      </TableCell>

      <TableCell width="10%" align="center">
        따봉개수
      </TableCell>
    </TableRow>
  );
}

export default LogHeader;
