
import React, { useState } from 'react';
import './Flashcard.css';

function Flashcard({ question, options, correctAnswer, explanation, onClose }) {
  const [selected, setSelected] = useState(null);
  const [flipped, setFlipped] = useState(false);

  const handleSelect = (idx) => {
    setSelected(idx);
    setTimeout(() => setFlipped(true), 300); // slight delay for effect
  };

  const handleClose = () => {
    if (onClose) onClose();
  };

  return (
    <div className={`flashcard-container flashcard-flip${flipped ? ' flashcard-flipped' : ''}`}>
      <button className="flashcard-close-btn" onClick={handleClose} aria-label="Close flashcard">✖</button>
      <div className="flashcard-inner">
        {/* Front Side */}
        <div className="flashcard-front">
          <h2>Interdisciplinary Flashcard</h2>
          <div className="flashcard-question">{question}</div>
          <div className="flashcard-options">
            {options.map((opt, idx) => (
              <button
                key={idx}
                className={`flashcard-option ${selected === idx ? 'selected' : ''}`}
                onClick={() => handleSelect(idx)}
                disabled={selected !== null}
              >
                {String.fromCharCode(65 + idx)}: {opt}
              </button>
            ))}
          </div>
        </div>
        {/* Back Side */}
        <div className="flashcard-back">
          <h2>Interdisciplinary Flashcard</h2>
          <div className="flashcard-question">{question}</div>
          <div className="flashcard-result">
            <div>
              {selected === correctAnswer ? (
                <span className="correct">Correct!</span>
              ) : (
                <span className="incorrect">Incorrect.</span>
              )}
            </div>
            <div className="flashcard-explanation">
              <strong>Explanation:</strong> {explanation}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Flashcard;
