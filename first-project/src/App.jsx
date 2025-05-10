import { useState } from "react";
import "./App.css";

function App() {
  const [payload, setPayload] = useState({ firstName: "", lastName: "" });
  let firstName = "abc";
  const [a,setA] = useState()
  const [b,setB] = useState()

  // const [name, setName] = useState("");
  // const [lastName, setLastName] = useState("");

  // const onNameChange = (e) => {
  //   const value = e.target.value;
  //   console.log("<--name | value-->", value);
  //   console.log(payload);
  //   const newObj = { firstName: value, lastName: payload.lastName };
  //   setPayload(newObj);
  // };

  // const onLastNameChange = (e) => {
  //   const value = e.target.value;
  //   console.log("<--name | value-->", value);
  //   setPayload({ lastName: value, firstName: payload.firstName });
  // };

  const onChange = (e, name) => {
    firstName = "abcde";
    if (name === "firstName") {
      setPayload({ firstName: e.target.value, lastName: payload.lastName });
    }
    if (name === "lastName") {
      setPayload({ lastName: e.target.value, firstName: payload.firstName });
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(payload);
  };
  return (
    <form>
      {/* {payload.firstName} */}
      {/* {firstName} */}
      <input
        type="text"
        name="firstName"
        onChange={(e) => {
          onChange(e, "firstName");
        }}
      />
      <input
        type="text"
        name="lastName"
        onChange={(e) => {
          onChange(e, "lastName");
        }}
      />
      <input type="password" name="password" />
      <input type="email" name="email" />
      <input type="phone" name="phone" />
      <button onClick={onSubmit}>Submit</button>
    </form>
  );
}

export default App;
