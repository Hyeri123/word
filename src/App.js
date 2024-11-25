import { Routes, Route, Navigate } from "react-router-dom";
import SignInUp from "./Pages/SignInUp";
import Home from "./Pages/Home";
import TestManager from "./Pages/TestManager";
import WordManager from "./Pages/WordManager";
import Navbar from "./Components/Navbar";

function App() {
    return (
        <>
            <Navbar />
            <Routes>
                <Route path="/" element={<Navigate to="/home" />} />
                <Route path="/login" element={<SignInUp />} />
                <Route path="/home" element={<Home />} />
                <Route path="/wordManager" element={<WordManager />} />
                <Route path="/testManager" element={<TestManager />} />
                <Route path="*" element={<Navigate to="/login" />} />
            </Routes>
        </>
    );
}

export default App;
