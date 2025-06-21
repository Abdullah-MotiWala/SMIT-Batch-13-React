import React from "react";

const Testing = ({ children }) => {
  alert("alert");
  return (
    <div>
      <p>This is children wrapper</p>
      {children}
      <p>This is children wrapper</p>
    </div>
  );
};

export default Testing;
