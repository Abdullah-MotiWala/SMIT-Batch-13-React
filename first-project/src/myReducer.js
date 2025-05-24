function reducer(action, state) {
  if (action.type === "cnic") {
    return { ...state, cnic: action.payload };
  } else if (action.type === "counter") {
    return { ...state, counter: action.payload };
  }
  return { counter: "abc", cnic: 123 };
}

function myReducer(reducer, initialState) {
  let myPersonalState = initialState;

  function dispatch(action) {
    const newObj = reducer(action, myPersonalState);
    myPersonalState = newObj;
  }

  return [myPersonalState, dispatch];
}

const [state, dispatch] = myReducer();

state.cnic;
state.counter;

dispatch({ type: "cnic", payload: 456 });
dispatch({ type: "counter", payload: 8 });
