import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import ResumeBuilder from "./pages/ResumeBuilder";
import InterviewPrep from "./pages/InterviewPrep";
import CareerPaths from "./pages/CareerPaths";

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/resume-builder" element={<ResumeBuilder />} />
            <Route path="/interview-prep" element={<InterviewPrep />} />
            <Route path="/career-paths" element={<CareerPaths />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
