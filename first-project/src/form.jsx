import { useReducer, useRef, useState } from "react";

const initialState = { cnic: "", counter: 0 };

const reducer = (state, action) => {
  switch (action.type) {
    case "cnic":
      return { ...state, cnic: action.payload };
    case "counter":
      return { ...state, counter: action.payload };
      
    default:
      return state;
  }
};


const Form = () => {
  //   const [cnicValue, setCnicValue] = useState("");
  //   const [counter, setCounter] = useState(0);

  const [state, dispatch] = useReducer(reducer, initialState);
  console.log(state);

  function handleChange(e) {
    const value = e.target.value;
    if (value.length > 15) return;

    let latestValue = value;

    if (value.length === 5 || value.length === 13) latestValue = value + "-";
    // else setCnicValue(value);

    // setCnicVaue(latestValue);
    dispatch({ type: "cnic", payload: latestValue });

    // // cnicValue = value;
    // if (value.length == 5) cnicValue += "-";
  }

  function checkValue() {
    console.log(cnicValue);
    console.log(userNameRef.current.value, "===ref");
  }
  console.log("render");

  const userNameRef = useRef();

  function handleCounterClick() {
    dispatch({ type: "counter", payload: state.counter + 2 });
    // setCounter(counter + 2)
    // setCounter((prev) => {
    //   console.log(prev);
    //   if (counter > 10) return counter + 1;
    //   return counter + 2;
    //   //   return counter + 2;
    // });
  }

  return (
    <div>
      <input
        type="text"
        placeholder="cnic"
        value={state.cnic}
        onChange={handleChange}
      />
      <input
        type="text"
        placeholder="Name as per cnic"
        ref={userNameRef}
        // value={cnicValue}
        // onChange={handleChange}
      />
      <p>{state.counter}</p>
      <button onClick={handleCounterClick}>Increment</button>
      <button type="button" onClick={checkValue}>
        Check
      </button>
    </div>
  );
};

export default Form;
