import React from "react";

const Loading = () => {
  return <p>Loading...</p>;
};

const loadingHOC = (comp, isLoading) => {
  if (isLoading) return <Loading />;
  else return comp;
  //   return ;
};

export default loadingHOC;
