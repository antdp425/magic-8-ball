import { useState } from "react";
import "./App.css";
import Result from "./Result";

function App() {
  //// State
  // Query
  let [query, setQuery] = useState("");
  let [validQuery, setValidQuery] = useState(false);

  // Result
  let [loadingResult, setLoadingResult] = useState(false);
  let [result, setResult] = useState("");

  //// Handling Query Input
  let handleQueryInputChange = (event) => {
    setQuery(event.target.value);
  };
  // ---------------------------------------

  //// Handling Query Result
  let fetchQueryResult = (query) => {
    setLoadingResult(true);
    let params = encodeURIComponent(query);
    let uri = "https://8ball.delegator.com/magic/JSON/" + params;
    fetch(uri)
      .then((response) => response.json())
      .then((json) => {
        setLoadingResult(false);
        let { answer } = json.magic;
        setResult(answer);
      });
  };

  let warnOfInvalidQuery = () => {
    setValidQuery(false);
    return !!query
      ? setResult(`Be sure to end your question with a "?"`)
      : setResult(
          `Please enter a question -- be sure to include a "?" at the end`
        );
  };

  let handleQueryFormSubmission = (event) => {
    event.preventDefault();
    setValidQuery(true);
    let isValidQuery = query.trim().substr(-1) === "?";
    return isValidQuery ? fetchQueryResult(query) : warnOfInvalidQuery();
  };
  // ---------------------------------------

  return (
    <div className="App">
      <h1>Magic 8-Ball</h1>
      <img
        className="main8BallImage"
        src="./magic8ball.jpeg"
        alt="Magic 8Ball"
      ></img>

      <Result
        loadingResult={loadingResult}
        validQuery={validQuery}
        result={result}
      />

      <form onSubmit={handleQueryFormSubmission} id="queryInput">
        <input
          onChange={handleQueryInputChange}
          id="query"
          type="text"
          value={query}
        ></input>
        <input id="getResult" type="submit" value="Ask"></input>
      </form>
      <div id="history">
        <button>Show History</button>
      </div>
    </div>
  );
}

export default App;
