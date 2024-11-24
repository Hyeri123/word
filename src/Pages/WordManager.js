import React, { useState } from "react";
import "./WordManager.css";
import { useNavigate } from "react-router-dom";

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
    const navigate = useNavigate();

    const addWord = () => {
        if (newEnglish.trim() === "" || newKorean.trim() === "") return;
        setWords([
            ...words,
            { english: newEnglish.trim(), korean: newKorean.trim() },
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

    return (
        <div>
            <h2>단어장</h2>
            <button
                onClick={() => {
                    navigate("/home");
                }}
            >
                메인
            </button>
            <div>
                <input
                    type="text"
                    placeholder="영단어"
                    value={newEnglish}
                    onChange={(e) => setNewEnglish(e.target.value)}
                    onKeyDown={(e) => handleKeyDown(e, "add")}
                />
                <input
                    type="text"
                    placeholder="뜻"
                    value={newKorean}
                    onChange={(e) => setNewKorean(e.target.value)}
                    onKeyDown={(e) => handleKeyDown(e, "add")}
                />
                <button onClick={addWord}>추가</button>
            </div>
            <ul>
                {words.map((word, index) => (
                    <li key={index}>
                        {editingIndex === index ? (
                            <EditMode
                                english={editingEnglish}
                                korean={editingKorean}
                                onEnglishChange={(e) =>
                                    setEditingEnglish(e.target.value)
                                }
                                onKoreanChange={(e) =>
                                    setEditingKorean(e.target.value)
                                }
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
