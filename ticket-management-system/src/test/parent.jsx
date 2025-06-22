import React, { useCallback, useMemo, useState } from "react";
import ChildrenCom from "./children";
import Testing from "./testing";

const Parent = () => {
  // const [testState, setTestState] = useState(1);
  const [value, setValue] = useState("");
  const [value2, setValue2] = useState("");

  console.log("===render parent");

  const changeHandler = useCallback((value) => {
    setValue2(value);
  }, []);

  const sum = (a) => {
    console.log("===calculation");
    a = 1;
    return a;
    // 5 sec
  };

  const memoizeSum = useMemo(() => {
    return sum(value);
  }, [value]);

  const abc = { name: "abc" };

  return (
    <div>
      <Testing>
        <p>Test : {memoizeSum}</p>
        <ChildrenCom testState={value2} onChange={changeHandler} />
        <input
          onChange={(e) => {
            setValue(e.target.value);
          }}
          value={value}
        />
        <input
          onChange={(e) => {
            changeHandler(e.target.value);
          }}
          value={value2}
        />
      </Testing>
    </div>
  );
};

export default Parent;
