import React from "react";

const GrandGrandChildrenCom = ({ testState }) => {
  console.log("===grand grand child ");
  return <div>{`Parent State : ${testState}`}</div>;
};

export default GrandGrandChildrenCom;
