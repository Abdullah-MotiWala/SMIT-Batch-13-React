import React from "react";
import GrandGrandChildrenCom from "./grandGrandChildren";

const GrandChildrenCom = ({ testState }) => {
  return (
    <div>
      <GrandGrandChildrenCom testState={testState} />
    </div>
  );
};

export default GrandChildrenCom;
