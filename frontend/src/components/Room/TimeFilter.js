import React, { useState } from "react";
import Select from 'react-select'

/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

export default function TimeFilter() {
  const options = [
    { label: "5분", value: "5" },
    { label: "10분", value: "10" },
    { label: "15분", value: "15" },
    { label: "20분", value: "20" },
    { label: "25분", value: "25" },
    { label: "30분", value: "30" },
  ]

  const [selected, setSelected] = useState([]);

  return (
    <div
      css={css`
        border: 3px solid #111;
        width: 200px;
      `}
    >
      <Select
        options={options}
        value={selected}
        onChange={setSelected}
        labelledBy={"Select"}
        isCreatable={true}
      />
    </div>
  );
}
