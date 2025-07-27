import React, { useState } from "react";
import "./ResultCard.css"; // Or use a dedicated MCQblock.css

function MCQBlock({ data }) {
  const { question, alternatives, correct_answer, explanation } = data;
  const [selected, setSelected] = useState(null);
  const [showAnswer, setShowAnswer] = useState(false);

  const handleSelect = (key) => {
    if (!showAnswer) setSelected(key);
  };

  const handleShowAnswer = () => {
    if (selected) setShowAnswer(true);
  };

  return (
    <div className="mcq-block-glass">
      <h4 className="mcq-question">{question}</h4>
      <ul className="mcq-options">
        {Object.entries(alternatives).map(([key, value]) => (
          <li
            key={key}
            className={
              showAnswer
                ? key === correct_answer
                  ? "mcq-option mcq-correct"
                  : key === selected
                  ? "mcq-option mcq-wrong"
                  : "mcq-option"
                : selected === key
                ? "mcq-option mcq-selected"
                : "mcq-option"
            }
            onClick={() => handleSelect(key)}
            style={{ cursor: showAnswer ? "default" : "pointer" }}
          >
            <strong>{key}.</strong> {value}
          </li>
        ))}
      </ul>
      {!showAnswer && (
        <button
          className="mcq-get-answer-btn"
          onClick={handleShowAnswer}
          disabled={!selected}
          style={{
            marginTop: "1em",
            padding: "0.5em 1.2em",
            borderRadius: "0.7em",
            background: "#38bdf8",
            color: "#fff",
            border: "none",
            fontWeight: "bold",
            cursor: selected ? "pointer" : "not-allowed",
            opacity: selected ? 1 : 0.6,
          }}
        >
          Get Answer
        </button>
      )}
      {showAnswer && (
        <>
          <div className="mcq-answer" style={{ marginTop: "1em" }}>
            {selected === correct_answer ? (
              <span style={{ color: "#22c55e" }}>✅ Correct!</span>
            ) : (
              <span style={{ color: "#ef4444" }}>
                ❌ Wrong. Correct Answer: <strong>{correct_answer}</strong>
              </span>
            )}
          </div>
          <div className="mcq-explanation" style={{ marginTop: "1em" }}>
            <strong>Explanation:</strong> {explanation}
          </div>
        </>
      )}
    </div>
  );
}

export default MCQBlock;