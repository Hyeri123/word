import React, { useState, useEffect } from "react";
import "./WordManager.css";
import { fetchWords, createWord, updateWord, deleteWord } from "../api";

function EditMode({
  english,
  korean,
  onEnglishChange,
  onKoreanChange,
  onSave,
  onCancel,
  onKeyDown,
}) {
  return (
    <div className="word-item">
      <input
        type="text"
        placeholder="English Word"
        value={english}
        onChange={onEnglishChange}
        onKeyDown={onKeyDown}
      />
      <input
        type="text"
        placeholder="Korean Definition"
        value={korean}
        onChange={onKoreanChange}
        onKeyDown={onKeyDown}
      />
      <div className="buttons">
        <button className="save" onClick={onSave}>
          저장
        </button>
        <button className="cancel" onClick={onCancel}>
          취소
        </button>
      </div>
    </div>
  );
}

function ViewMode({ english, korean, onEdit, onDelete }) {
  return (
    <li className="word-item">
      <div className="word-column english">{english}</div>
      <div className="word-column korean">{korean}</div>
      <div className="buttons">
        <button className="edit" onClick={onEdit}>
          편집
        </button>
        <button className="delete" onClick={onDelete}>
          삭제
        </button>
      </div>
    </li>
  );
}

function WordManager() {
  const [words, setWords] = useState([]);
  const [newEnglish, setNewEnglish] = useState("");
  const [newKorean, setNewKorean] = useState("");
  const [editingWordId, setEditingWordId] = useState(null);
  const [editingWord, setEditingWord] = useState({ word: "", meaning: "" });
  const [sortOption, setSortOption] = useState("recent");

  useEffect(() => {
    fetchWords()
      .then((response) => setWords(response.data))
      .catch((error) => console.error("Error fetching words:", error));
  }, []);

  // 단어 추가
  const addWord = () => {
    if (newEnglish.trim() === "" || newKorean.trim() === "") return;
    createWord({ word: newEnglish.trim(), meaning: newKorean.trim() })
      .then((response) => {
        setWords([response.data, ...words]);
        setNewEnglish("");
        setNewKorean("");
      })
      .catch((error) => console.error("Error adding word:", error));
  };

  const removeWord = (id) => {
    deleteWord(id)
      .then(() => {
        setWords(words.filter((word) => word.id !== id)); // 삭제 후 상태 업데이트
      })
      .catch((error) => console.error("Error deleting word:", error));
  };

  const handleKeyDown = (e, mode) => {
    if (e.key === "Enter") {
      if (mode === "add") {
        addWord();
      } else if (mode === "edit") {
        saveEditedWord();
      }
    }
  };

  // 편집 모드 활성화
  const startEditing = (id) => {
    const wordToEdit = words.find((word) => word.id === id);
    setEditingWordId(id);
    setEditingWord(wordToEdit);
  };

  // 단어 수정 저장
  const saveEditedWord = () => {
    if (!editingWord.word.trim() || !editingWord.meaning.trim()) return;

    updateWord(editingWordId, {
      word: editingWord.word,
      meaning: editingWord.meaning,
    })
      .then((response) => {
        const updatedWords = words.map((word) =>
          word.id === editingWordId ? response.data : word
        );
        setWords(updatedWords);
        setEditingWordId(null);
        setEditingWord({ word: "", meaning: "" });
      })
      .catch((error) => console.error("Error updating word:", error));
  };

  const sortedWords = [...words].sort((a, b) => {
    if (sortOption === "alphabetical") {
      return a.word.localeCompare(b.word); // 영어 단어 기준 정렬
    } else if (sortOption === "recent") {
      return b.id - a.id;
    }
    return 0;
  });

  return (
    <div className="vocabulary-container">
      <h1>Vocabulary</h1>
      <div class="input-container">
        <input
          type="text"
          placeholder="English Word"
          value={newEnglish}
          onChange={(e) => setNewEnglish(e.target.value)}
          onKeyDown={(e) => handleKeyDown(e, "add")}
        />
        <input
          type="text"
          placeholder="Korean Definition"
          value={newKorean}
          onChange={(e) => setNewKorean(e.target.value)}
          onKeyDown={(e) => handleKeyDown(e, "add")}
        />
        <button onClick={addWord}>추가</button>
      </div>
      <div className="sort-container">
        <select
          id="sort-options"
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
        >
          <option value="recent">최근순</option>
          <option value="alphabetical">알파벳순</option>
        </select>
      </div>
      <ul className="word-list">
        {sortedWords.map((word) =>
          editingWordId === word.id ? (
            <EditMode
              key={word.id}
              english={editingWord.word}
              korean={editingWord.meaning}
              onEnglishChange={(e) =>
                setEditingWord({ ...editingWord, word: e.target.value })
              }
              onKoreanChange={(e) =>
                setEditingWord({ ...editingWord, meaning: e.target.value })
              }
              onSave={saveEditedWord}
              onCancel={() => setEditingWordId(null)}
              onKeyDown={(e) => handleKeyDown(e, "edit")}
            />
          ) : (
            <ViewMode
              key={word.id}
              english={word.word}
              korean={word.meaning}
              onEdit={() => startEditing(word.id)}
              onDelete={() => removeWord(word.id)}
            />
          )
        )}
      </ul>
    </div>
  );
}

export default WordManager;
