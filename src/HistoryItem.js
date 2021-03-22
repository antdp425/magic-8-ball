import React from "react";

function HistoryItem({ question, answer }) {
  return (
    <p className="historyItem">
      <span className="question">{question}</span>
      <span className="answer">{answer}</span>
    </p>
  );
}

export default HistoryItem;
