import { useState } from "react";
import "./App.css";

function App() {
  // State
  let [query, setQuery] = useState("");

  let handleQueryInputChange = (event) => {
    setQuery(event.target.value);
  };

  // Retrieving Query Result
  let fetchQueryResult = (query) => {
    let params = encodeURIComponent(query);
    let uri = "https://8ball.delegator.com/magic/JSON/" + params;
    fetch(uri)
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
      });
  };

  let handleQueryFormSubmission = (event) => {
    event.preventDefault();
    fetchQueryResult(query);
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
      <p id="queryResult"></p>
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
