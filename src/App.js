import { useState } from "react";
import "./App.css";
import Result from "./Result";

import { Dialog } from "@reach/dialog";
import "@reach/dialog/styles.css";
import HistoryItem from "./HistoryItem";

function App() {
  //// State
  // Query
  let [query, setQuery] = useState("");
  let [validQuery, setValidQuery] = useState(false);

  // Result
  let [loadingResult, setLoadingResult] = useState(false);
  let [result, setResult] = useState("");

  // Histroy
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
    setLoadingResult(true);
    let params = encodeURIComponent(query);
    let uri = "https://8ball.delegator.com/magic/JSON/" + params;
    fetch(uri)
      .then((response) => response.json())
      .then((json) => {
        setLoadingResult(false);
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
        <button onClick={openHistory}>Show History</button>
        <Dialog isOpen={showHistoryDialog} onDismiss={closeHistory}>
          <div className="historyResults">
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
