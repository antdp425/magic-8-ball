import "./App.css";

function App() {
  return (
    <div className="App">
      <h1>Magic 8-Ball</h1>
      <img
        className="main8BallImage"
        src="./magic8ball.jpeg"
        alt="Magic 8Ball"
      ></img>
      <p id="queryResult"></p>
      <form id="queryInput">
        <input id="query" type="text"></input>
        <input id="getResult" type="submit" value="Ask"></input>
      </form>
      <div id="history">
        <button>Show History</button>
      </div>
    </div>
  );
}

export default App;
