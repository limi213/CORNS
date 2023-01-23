import React from "react";
import LogItem from "./LogItem";

function LogList({ logs }) {
  return (
    <ul>
      {logs.map((item, index) => {
        return <LogItem log={item} key={index} />;
      })}
    </ul>
  );
}

export default LogList;
