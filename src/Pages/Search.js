import { React, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faArrowLeft,
    faBookmark as faSolidBookmark,
} from "@fortawesome/free-solid-svg-icons";
import { faBookmark as faRegularBookmark } from "@fortawesome/free-regular-svg-icons";
import "./Search.css";
import axios from "axios";

const Search = () => {
    const navigate = useNavigate();
    const { word } = useParams();
    const [definitions, setDefinitions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isBookmarked, setIsBookmarked] = useState(false);

    useEffect(() => {
        const fetchDefinition = async () => {
            try {
                const resp = await axios.get(
                    `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
                );
                setDefinitions(resp.data); // 정의 데이터를 state에 저장
                setLoading(false); // 로딩 완료
            } catch (error) {
                console.error("Error fetching data: ", error);
                setError("Sorry, we couldn't find the definition."); // 오류 메시지
                setLoading(false);
            }
        };

        // 로컬 스토리지에서 북마크 상태 확인
        const savedBookmarks =
            JSON.parse(localStorage.getItem("bookmarks")) || [];
        setIsBookmarked(savedBookmarks.includes(word));

        fetchDefinition();
    }, [word]);

    const handleBackClick = () => {
        navigate(-1); // 뒤로 가기
    };

    const handleBookmarkClick = () => {
        const savedBookmarks =
            JSON.parse(localStorage.getItem("bookmarks")) || [];
        if (isBookmarked) {
            // 이미 북마크된 경우 -> 삭제
            const updatedBookmarks = savedBookmarks.filter(
                (item) => item !== word
            );
            localStorage.setItem("bookmarks", JSON.stringify(updatedBookmarks));
        } else {
            // 북마크 추가
            savedBookmarks.push(word);
            localStorage.setItem("bookmarks", JSON.stringify(savedBookmarks));
        }
        setIsBookmarked(!isBookmarked); // 북마크 상태 토글
    };

    // 로딩 중일 때 표시할 메시지
    if (loading) {
        return <p>Loading...</p>;
    }

    // 오류가 있을 경우 표시할 메시지
    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div className="search">
            <div className="option-bar">
                <button onClick={handleBackClick} className="back-btn">
                    <FontAwesomeIcon icon={faArrowLeft} />
                </button>
                <button onClick={handleBookmarkClick} className="bookmark-btn">
                    <FontAwesomeIcon
                        icon={
                            isBookmarked ? faSolidBookmark : faRegularBookmark
                        }
                    />
                </button>
            </div>
            <div className="result">
                <h1>Search Results for: {word}</h1>
                {definitions.length > 0 ? (
                    definitions.map((definition, index) => {
                        return (
                            <div key={index} className="definition">
                                <h2>Meaning {index + 1}</h2>
                                {definition.meanings?.map((meaning, idx) => (
                                    <div key={idx}>
                                        <p className="pos">
                                            <strong>Part of speech:</strong>{" "}
                                            {meaning.partOfSpeech || "N/A"}
                                        </p>
                                        <ul>
                                            {meaning.definitions?.map(
                                                (def, defIdx) => (
                                                    <li key={defIdx}>
                                                        <div className="definition-text">
                                                            {def.definition}
                                                        </div>
                                                        {def.example && (
                                                            <div className="example-text">
                                                                <p>
                                                                    <em>
                                                                        Example:{" "}
                                                                        {
                                                                            def.example
                                                                        }
                                                                    </em>
                                                                </p>
                                                            </div>
                                                        )}
                                                    </li>
                                                )
                                            )}
                                        </ul>
                                    </div>
                                ))}
                            </div>
                        );
                    })
                ) : (
                    <p>No definitions found for "{word}".</p>
                )}
            </div>
        </div>
    );
};

export default Search;
