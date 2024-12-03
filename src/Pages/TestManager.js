import React, { useState, useEffect } from "react";
import "./TestManager.css";
import { fetchWords } from "../api"; // Django API에서 랜덤 단어 가져오기

function TestManager() {
  const [questions, setQuestions] = useState([]); // 질문 리스트
  const [answers, setAnswers] = useState([]); // 사용자 답변
  const [currentAnswer, setCurrentAnswer] = useState(""); // 현재 입력된 답변
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0); // 현재 질문 인덱스
  const [score, setScore] = useState(0); // 점수
  const [loading, setLoading] = useState(true); // 로딩 상태

  // 단어 가져오기 및 질문 초기화
  useEffect(() => {
    setLoading(true);
    fetchWords()
      .then((response) => {
        // 랜덤으로 질문 섞기
        const fetchedQuestions = response.data
          .map((item) => ({
            question: item.word,
            correctAnswer: item.meaning,
          }))
          .sort(() => Math.random() - 0.5);

        setQuestions(fetchedQuestions);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching words:", error);
        setLoading(false);
      });
  }, []);

  const handleAnswer = () => {
    if (!currentAnswer.trim()) return;

    const isCorrect =
      currentAnswer.trim() === questions[currentQuestionIndex].correctAnswer;

    setAnswers([
      ...answers,
      {
        question: questions[currentQuestionIndex].question,
        answer: currentAnswer.trim(),
        correctAnswer: questions[currentQuestionIndex].correctAnswer,
        correct: isCorrect,
      },
    ]);

    if (isCorrect) {
      setScore((prevScore) => prevScore + 1);
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
          <p>{questions[currentQuestionIndex].question}</p>
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
