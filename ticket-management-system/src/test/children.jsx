import { memo } from "react";
import GrandChildrenCom from "./grandChildren";

const Children = ({ testState, onChange }) => {
  const envVariable = "machinENVVariable";
  console.log("===rerender children");
  console.log(onChange);
  return (
    <div>
      <GrandChildrenCom testState={testState} />
    </div>
  );
};

const ChildrenCom = memo(Children);
export default ChildrenCom;
