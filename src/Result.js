import React from "react";

function Result({ validQuery, result }) {
  return validQuery ? (
    <p id="queryResult">{result}</p>
  ) : (
    <p style={!validQuery && { color: "red" }} id="queryResult">
      {result}
    </p>
  );
}

export default Result;
