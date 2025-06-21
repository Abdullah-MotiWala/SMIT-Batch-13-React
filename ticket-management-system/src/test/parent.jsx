import React, { useState } from "react";
import ChildrenCom from "./children";
import Testing from "./testing";

const Parent = () => {
  const [testState, setTestState] = useState(1);
  return (
    <div>
      <Testing>
        <ChildrenCom testState={testState} />
      </Testing>
    </div>
  );
};

export default Parent;
