import React from "react";
import GrandChildrenCom from "./grandChildren";

const ChildrenCom = ({ testState }) => {
  const envVariable = "machinENVVariable";
  return (
    <div>
      <GrandChildrenCom testState={testState} />
    </div>
  );
};

export default ChildrenCom;
