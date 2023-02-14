import React from "react";
import LogItem from "./LogItem";

function LogList({ logs }) {  
  return (
    <>
      {logs.map((item, index) => {
        return <LogItem log={item} key={item.roomNo} />;
      })}
    </>
  );
}

export default LogList;
