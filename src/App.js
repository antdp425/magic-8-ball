import { useState } from "react";
import "./App.css";
import { Dialog } from "@reach/dialog";
import "@reach/dialog/styles.css";

import Result from "./Result";
import HistoryItem from "./HistoryItem";

function App() {
  //// State
  // Query
  let [query, setQuery] = useState("");
  let [validQuery, setValidQuery] = useState(false);

  // Result
  let [loadingResult, setLoadingResult] = useState(false);
  let [result, setResult] = useState("");

  // History
  let [resultHistory, setResultHistory] = useState([]);
  let [showHistoryDialog, setHistoryDiaglog] = useState(false);
  let openHistory = () => setHistoryDiaglog(true);
  let closeHistory = () => setHistoryDiaglog(false);

  //// Handling Result History
  let updateResultHistory = (result) => {
    if (resultHistory.length < 10) {
      setResultHistory((prevHistory) => [result, ...prevHistory]);
    } else {
      let prev = [...resultHistory];
      prev.pop();
      setResultHistory([result, ...prev]);
    }
  };

  //// Handling Query Input
  let handleQueryInputChange = (event) => {
    setQuery(event.target.value);
  };
  // ---------------------------------------

  //// Handling Query Result
  let fetchQueryResult = (query) => {
    // Setting to true to display loading animation
    setLoadingResult(true);
    let params = encodeURIComponent(query);
    let uri = "https://8ball.delegator.com/magic/JSON/" + params;
    fetch(uri)
      .then((response) => response.json())
      .then((json) => {
        // Setting to false to stop loading animation
        setLoadingResult(false);
        // Destructuring response for cleaner use
        let { question, answer } = json.magic;
        let result = { question, answer };
        setResult(answer);
        updateResultHistory(result);
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
    // Ensuring that we can consistently get the last char, rather than an accidental blank from user
    let isValidQuery = query.trim().substr(-1) === "?";
    // If query is valid -> fetch : otherwise trigger approriate error message
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
          placeholder="Type Your Question Here"
          value={query}
        ></input>
        <input id="getResult" type="submit" value="Ask"></input>
      </form>
      <div id="history">
        <button onClick={openHistory}>Show History</button>
        <Dialog isOpen={showHistoryDialog} onDismiss={closeHistory}>
          <div className="historyResults">
          {/* Logic to display appropriate header message in History Modal */}
            {resultHistory.length === 0 ? (
              "You haven't asked any questions yet 👀"
            ) : (
              <h2>History</h2>
            )}
            {/* Mapping through each history result and returning a History Item */}
            {resultHistory.map(({ answer, question }) => (
              <HistoryItem answer={answer} question={question} />
            ))}
          </div>
          <button className="close-button" onClick={closeHistory}>
            <span aria-hidden>Close</span>
          </button>
        </Dialog>
      </div>
    </div>
  );
}

export default App;
