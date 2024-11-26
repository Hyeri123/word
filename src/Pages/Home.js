import React, { useState } from "react";
import "./Home.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

const Home = () => {
    const [word, setWord] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        const trimmedWord = word.trim();
        if (!trimmedWord || trimmedWord.split(" ").length > 1) return;
        navigate(`/search/${word}`);
    };

    return (
        <div className="home">
            <h1 className="Title">Dictionary</h1>
            <p className="addi">Find meanings and save for quick reference</p>
            <form onSubmit={handleSubmit} className="searchbar">
                <FontAwesomeIcon icon={faMagnifyingGlass} />
                <input
                    className="search"
                    value={word}
                    onChange={(e) => setWord(e.target.value)}
                    placeholder="Type to search...."
                />
            </form>
        </div>
    );
};

export default Home;
