import React from "react";
import GrandGrandChildrenCom from "./grandGrandChildren";

const GrandChildrenCom = ({ testState }) => {
  console.log("===rerender grandchild");

  return (
    <div>
      <GrandGrandChildrenCom testState={testState} />
    </div>
  );
};

export default GrandChildrenCom;
