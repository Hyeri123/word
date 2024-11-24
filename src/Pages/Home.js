import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
    return (
        <div className="home">
            <h1>Title</h1>
            {/* 단어장으로 이동 */}
            <Link to="/home/wordManager">
                <button className="wordManager">단어장</button>
            </Link>

            {/* 테스트로 이동 */}
            <Link to="/home/testManager" style={{ marginLeft: "10px" }}>
                <button className="testManager">테스트</button>
            </Link>
        </div>
    );
};

export default Home;
