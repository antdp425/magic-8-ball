import { useState } from "react";
import "./App.css";
import Result from "./Result";

function App() {
  // State
  let [query, setQuery] = useState("");
  let [validQuery, setValidQuery] = useState(false);
  let [result, setResult] = useState("");

  // Handling Query Input
  let handleQueryInputChange = (event) => {
    setQuery(event.target.value);
  };
  // ---------------------------------------

  // Retrieving Query Result
  let fetchQueryResult = (query) => {
    let params = encodeURIComponent(query);
    let uri = "https://8ball.delegator.com/magic/JSON/" + params;
    fetch(uri)
      .then((response) => response.json())
      .then((json) => {
        let { answer } = json.magic;
        setResult(answer);
      });
  };

  let warnOfInvalidQuery = () => {
    setValidQuery(false);
    setResult(`Invalid Question -- be sure to end your question with a "?"`);
  };

  let handleQueryFormSubmission = (event) => {
    event.preventDefault();
    setValidQuery(true);
    let endsInQuestionMark = query.trim().substr(-1) === "?";
    return endsInQuestionMark ? fetchQueryResult(query) : warnOfInvalidQuery();
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

      <Result validQuery={validQuery} result={result} />

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
