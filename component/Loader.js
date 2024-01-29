import React from "react";
import { useSelector } from "react-redux";
import { loaderSelector } from "../redux/loader/loaderSlice";

const Loader = () => {
  const isLoader = useSelector(loaderSelector).loading;
  return (
    <>
      {isLoader && (
        <div className="loader-inn">
          <div className="loader"></div>
        </div>
      )}
    </>
  );
};

export default Loader;
