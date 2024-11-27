import React, { useState } from "react";
import "./TestManager.css";

function TestManager() {
  const [questions] = useState(["apple", "banana", "cherry"]);
  const [correctAnswers] = useState(["사과", "바나나", "체리"]);
  const [answers, setAnswers] = useState([]);
  const [currentAnswer, setCurrentAnswer] = useState("");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);

  const handleAnswer = () => {
    if (!currentAnswer.trim()) return;

    const isCorrect =
      currentAnswer.trim() === correctAnswers[currentQuestionIndex];

    setAnswers([
      ...answers,
      {
        question: questions[currentQuestionIndex],
        answer: currentAnswer.trim(),
        correctAnswer: correctAnswers[currentQuestionIndex],
        correct: isCorrect,
      },
    ]);

    if (isCorrect) {
      setScore(score + 1);
    }

    setCurrentAnswer("");
    setCurrentQuestionIndex(currentQuestionIndex + 1);
  };

  const resetTest = () => {
    setAnswers([]);
    setCurrentAnswer("");
    setCurrentQuestionIndex(0);
    setScore(0);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleAnswer();
    }
  };

  return (
    <div className="test-container">
      <h1>{currentQuestionIndex < questions.length ? "Test" : "Result"}</h1>
      {currentQuestionIndex < questions.length ? (
        <div className="problem">
          <p>다음 단어의 뜻은?</p>
          <p>{questions[currentQuestionIndex]}</p>
          <input
            type="text"
            placeholder="답변 입력"
            value={currentAnswer}
            onChange={(e) => setCurrentAnswer(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button onClick={handleAnswer}>완료</button>
        </div>
      ) : (
        <div className="result">
          <p>
            {score}/{questions.length}
          </p>
          <div className="result-list">
            {answers.map((item, index) => (
              <div className="result-item" key={index}>
                <div className="result-column english">{item.question}</div>
                <div
                  className={`result-column korean ${
                    item.correct ? "" : "incorrect"
                  }`}
                >
                  {item.answer}
                </div>
              </div>
            ))}
          </div>
          <button id="reset-button" onClick={resetTest}>
            다시 시작
          </button>

          <h1>오답노트</h1>
          <div className="result-list">
            {answers
              .filter((item) => !item.correct)
              .map((item, index) => (
                <div className="result-item" key={index}>
                  <div className="result-column english">{item.question}</div>
                  <div className="result-column korean">
                    {item.correctAnswer}
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default TestManager;
