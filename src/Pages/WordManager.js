import React, { useState } from "react";
import "./WordManager.css";

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
    <div className="word-item">
      <span className="word-text">
        {english} : {korean}
      </span>
      <div className="buttons">
        <button className="edit" onClick={onEdit}>
          편집
        </button>
        <button className="delete" onClick={onDelete}>
          삭제
        </button>
      </div>
    </div>
  );
}

function WordManager() {
  const [words, setWords] = useState([]);
  const [newEnglish, setNewEnglish] = useState("");
  const [newKorean, setNewKorean] = useState("");
  const [editingIndex, setEditingIndex] = useState(null);
  const [editingEnglish, setEditingEnglish] = useState("");
  const [editingKorean, setEditingKorean] = useState("");
  const [sortOption, setSortOption] = useState("recent");

  const addWord = () => {
    if (newEnglish.trim() === "" || newKorean.trim() === "") return;
    setWords([
      {
        english: newEnglish.trim(),
        korean: newKorean.trim(),
        timestamp: Date.now(),
      },
      ...words,
    ]);
    setNewEnglish("");
    setNewKorean("");
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

  const deleteWord = (index) => {
    setWords(words.filter((_, i) => i !== index));
  };

  const editWord = (index) => {
    setEditingIndex(index);
    setEditingEnglish(words[index].english);
    setEditingKorean(words[index].korean);
  };

  const saveEditedWord = () => {
    if (editingEnglish.trim() === "" || editingKorean.trim() === "") return;
    const updatedWords = [...words];
    updatedWords[editingIndex] = {
      english: editingEnglish.trim(),
      korean: editingKorean.trim(),
    };
    setWords(updatedWords);
    setEditingIndex(null);
    setEditingEnglish("");
    setEditingKorean("");
  };

  const sortedWords = [...words].sort((a, b) => {
    if (sortOption === "alphabetical") {
      return a.english.localeCompare(b.english);
    } else if (sortOption === "recent") {
      return b.timestamp - a.timestamp;
    }
    return 0;
  });

  return (
    <div>
      <h1>Vocabulary</h1>
      <div class="input-container">
        <input
          type="text"
          placeholder="English"
          value={newEnglish}
          onChange={(e) => setNewEnglish(e.target.value)}
          onKeyDown={(e) => handleKeyDown(e, "add")}
        />
        <input
          type="text"
          placeholder="Korean"
          value={newKorean}
          onChange={(e) => setNewKorean(e.target.value)}
          onKeyDown={(e) => handleKeyDown(e, "add")}
        />
        <button onClick={addWord}>추가</button>
      </div>
      <div>
        <label htmlFor="sort-options">정렬 방법</label>
        <select
          id="sort-options"
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
        >
          <option value="recent">최근순</option>
          <option value="alphabetical">알파벳순</option>
        </select>
      </div>
      <ul>
        {sortedWords.map((word, index) => (
          <li key={index}>
            {editingIndex === index ? (
              <EditMode
                english={editingEnglish}
                korean={editingKorean}
                onEnglishChange={(e) => setEditingEnglish(e.target.value)}
                onKoreanChange={(e) => setEditingKorean(e.target.value)}
                onSave={saveEditedWord}
                onCancel={() => setEditingIndex(null)}
                onKeyDown={(e) => handleKeyDown(e, "edit")}
              />
            ) : (
              <ViewMode
                english={word.english}
                korean={word.korean}
                onEdit={() => editWord(index)}
                onDelete={() => deleteWord(index)}
              />
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default WordManager;
