import { useState } from "react";
import "./Counter.css";

function Counter2() {
  const [firstName, setFirstName] = useState("Abdullah");
  const [lastName, setLastName] = useState("Motiwala");

  function changeName() {
    setFirstName("Mohd.");
    setLastName("Abdullah");
  }

  function checkName() {
    console.log(firstName, lastName);
  }

  return (
    <>
      componet2
      <h1>Mr.</h1>
      <p>{`${firstName}`}</p>
      <button onClick={changeName}>ChangeName</button>
      <button onClick={checkName}>Check Name</button>
    </>
  );
}

function Counter1() {
  const firstName = "Abdullah";
  const lastName = "Motiwala";

  return <p>componet1 - Pakistan</p>;
}

export default Counter1;
export { Counter2 };
