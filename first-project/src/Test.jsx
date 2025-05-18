import { useEffect, useState } from "react";

const Test = ({ abasit, user }) => {
  //   console.log(props, "===props");
  //   const { abasit, user } = props;
  const [test, setTest] = useState(0);
  const [test1, setTest1] = useState(0);
  // on mount(load)
  // code here
  useEffect(() => {
    console.log("running (on mount)");
    return () => {
      alert("alert");
      console.log("on unmounting");
    };
  }, [test]);

  return (
    <div>
      <p onClick={abasit}>{user.name}</p>
      <p>{user.surname}</p>
      <p>{user.age}</p>
    </div>
  );
};

export default Test;
