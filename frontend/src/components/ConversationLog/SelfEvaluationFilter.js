import React, { useState } from "react";
import { MultiSelect } from "react-multi-select-component";

/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

export default function SelfEvaluationFilter() {
  const options = [
    { label: "없음", value: "0" },
    { label: "1", value: "1" },
    { label: "2", value: "2" },
    { label: "3", value: "3" },
    { label: "4", value: "4" },
    { label: "5", value: "5" },
  ];

  const [selected, setSelected] = useState([]);

  return (
    <div
      css={css`
        border: 3px solid #111;
        width: 200px;
      `}
    >
      <MultiSelect
        options={options}
        value={selected}
        onChange={setSelected}
        labelledBy={"Select"}
        isCreatable={true}
      />
    </div>
  );
}
