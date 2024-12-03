import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Bookmark.css";

const Bookmark = () => {
  const [bookmarks, setBookmarks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // 로컬 스토리지에서 북마크된 단어들을 가져오기
    const savedBookmarks = JSON.parse(localStorage.getItem("bookmarks")) || [];
    setBookmarks(savedBookmarks);
  }, []);

  const handleWordClick = (word) => {
    // 선택한 단어의 검색 결과 페이지로 이동
    navigate(`/search/${word}`);
  };

  return (
    <div className="bookmark">
      <h1>Bookmarked Words</h1>
      {bookmarks.length > 0 ? (
        <ul className="bookmark-list">
          {bookmarks.map((word, index) => (
            <li
              key={index}
              className="bookmark-item"
              onClick={() => handleWordClick(word)}
            >
              {word}
            </li>
          ))}
        </ul>
      ) : (
        <p>No bookmarks found.</p>
      )}
    </div>
  );
};

export default Bookmark;
