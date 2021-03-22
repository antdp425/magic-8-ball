import React from "react";
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

function Result({ loadingResult, validQuery, result }) {
  // If you aren't loading a result AND have a valid query, display the result normally
  return !loadingResult && validQuery ? (
    <p id="queryResult">{result}</p>
  ) : // If you aren't loading a result AND have an invalid query, display an error
  !loadingResult && !validQuery ? (
    <p style={!validQuery && { color: "red" }} id="queryResult">
      {result}
    </p>
  ) : (
    //  Otherwise, display Loader
    <p id="queryResult">
      <Loader type="ThreeDots" color="#585858" height={15} width={80} />
    </p>
  );
}

export default Result;
