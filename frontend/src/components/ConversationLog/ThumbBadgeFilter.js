import React, { useState } from "react";
import { MultiSelect } from "react-multi-select-component";

/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

export default function SelfEvaluationFilter() {
  const options = [
    { label: "없음", value: "0" },
    { label: "있음", value: "1" },
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
