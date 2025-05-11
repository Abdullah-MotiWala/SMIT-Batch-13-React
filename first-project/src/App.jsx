import { Fragment, useState } from "react";
import "./App.css";

function App() {
  const [payload, setPayload] = useState({ firstName: "" });
  const [errors, setErrors] = useState({});

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

  const onChange = (e) => {
    // if (name === "firstName") {
    //   setPayload({ ...payload, firstName: e.target.value });
    // }
    // if (name === "lastName") {
    //   // setPayload({
    //   //   lastName: e.target.value,
    //   //   firstName: payload.firstName,
    //   //   password: payload.password,
    //   //   email: payload.email,
    //   //   phone: payload.phone,
    //   // });
    //   setPayload({ ...payload, lastName: e.target.value });
    // }

    // if (name === "password") {
    //   setPayload({ ...payload, password: e.target.value });
    // }
    const inputName = e.target.name;
    const inputValue = e.target.value;
    setPayload({ ...payload, [inputName]: inputValue });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    checkErrors(payload);
    console.log(payload);
  };

  function checkErrors(payload) {
    // const myObj = {};
    // myObj.a = 1
    // myObj.b = 1
    // myObj.c = 1
    // myObj.d = 1
    // myObj.e = 1

    // const arr = ["a", "b", "c", "d", "e"];
    // arr.forEach(ele=>{myObj[ele] = 1})

    // const payloadArr = Object.keys(payload);
    // const payloadArr = Object.values(payload);
    // const tempPayload = { firstName: "abc", lastName: "" };
    // const tempPayloadArr = [
    //   ["fristName", "abc"],
    //   ["lastName", ""],
    // ];
    const currentErrors = {};
    const payloadArr = Object.entries(payload);
    payloadArr.forEach((ele) => {
      const [key, value] = ele;
      if (!value) currentErrors[key] = "This input is required";
      // if (!value) {
      //   currentErrors[key] = "This input is required";
      // }
    });
    setErrors(currentErrors);

    console.log(currentErrors);
    // console.log(payloadArr);
    // const firstNameValue = payload.firstName;
    // if (!firstNameValue) {
    //   setErrors({ ...errors, firstName: "First name is required" });
    // } else {
    //   if (firstNameValue.length < 3) {
    //     // setFirstNameError("First name must be greater than 3");
    //     setErrors({ firstName: "First name must be greater than 3" });
    //   } else {
    //     // setFirstNameError("");
    //     setErrors({ firstName: null });
    //   }
    // }
    // console.log(firstNameValue, firstNameError);
  }

  // const name = "Abdullah" && "Ahsan" //only second value if first is truthy
  // const firstName = null || "Mr." //if first is truthy, select first otherwise fall to other value
  // console.log(name,firstName)

  // const students = 49
  // const classStatus = students > 50 ? "Continue" : "Closed"

  // console.log(classStatus);
  return (
    <>
      <form>
        <input
          type="text"
          className={errors.firstName && "error"}
          name="firstName"
          onChange={onChange}
        />
        {errors.firstName && (
          <p className="error-message">{errors.firstName}</p>
        )}
        <input
          className={errors.lastName && "error"}
          type="text"
          name="lastName"
          onChange={onChange}
        />
        {errors.lastName && <p className="error-message">{errors.lastName}</p>}
        <input
          type="password"
          name="password"
          onChange={onChange}
          // onChange={(e) => {
          //   onChange(e, "password");
          // }}
        />
        <input type="email" name="email" onChange={onChange} />
        <input type="phone" name="phone" onChange={onChange} />
        <input type="number" name="age" onChange={onChange} />
        <button onClick={onSubmit}>Submit</button>
      </form>
    </>
  );
}

export default App;
