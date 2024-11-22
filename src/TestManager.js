import React, { useState } from "react";
import "./TestManager.css";

function TestManager({ onBack }) {
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
    <div>
      <h2>단어 테스트</h2>
      <button onClick={onBack}>메인</button>
      {currentQuestionIndex < questions.length ? (
        <div>
          <p>
            다음 단어의 뜻은? <strong>{questions[currentQuestionIndex]}</strong>
          </p>
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
        <div>
          <p>
            <span>점수</span> {score}/{questions.length}
          </p>
          <p>
            <span>결과</span>
          </p>
          <ul>
            {answers.map((item, index) => (
              <li key={index}>
                {item.question} - {item.answer} ({item.correct ? "O" : "X"})
              </li>
            ))}
          </ul>
          <button onClick={resetTest}>다시 시작</button>
          <p>
            <span>오답노트</span>
          </p>
          <ul>
            {answers
              .filter((item) => !item.correct)
              .map((item, index) => (
                <li key={index}>
                  {item.question} - {item.correctAnswer}
                </li>
              ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default TestManager;
