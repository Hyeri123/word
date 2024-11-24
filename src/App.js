import "./App.css";

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import SignInUp from "./Pages/SignInUp";
import Home from "./Pages/Home";
import TestManager from "./Pages/TestManager";
import WordManager from "./Pages/WordManager";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Navigate to="/home" />} />
                <Route path="/login" element={<SignInUp />} />
                <Route path="/home" element={<Home />} />
                <Route path="/home/wordManager" element={<WordManager />} />
                <Route path="/home/testManager" element={<TestManager />} />
                <Route path="*" element={<Navigate to="/login" />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
