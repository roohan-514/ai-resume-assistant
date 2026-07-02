import React, { useState } from "react";
import { getInterviewQuestions, getInterviewFeedback } from "../services/api";

const InterviewPrep = () => {
  const [mode, setMode] = useState("questions");
  const [formData, setFormData] = useState({ job_title: "", experience_level: "mid", question_types: "", question: "", answer: "" });
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      let res;
      if (mode === "questions") {
        const types = formData.question_types ? formData.question_types.split(",").map((t) => t.trim()) : undefined;
        res = await getInterviewQuestions({
          job_title: formData.job_title,
          experience_level: formData.experience_level,
          question_types: types,
        });
      } else {
        res = await getInterviewFeedback({
          question: formData.question,
          answer: formData.answer,
          job_title: formData.job_title,
        });
      }
      setResult(res.data);
    } catch (err) {
      setResult({ error: err.response?.data?.detail || err.message });
    }
    setLoading(false);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Interview Preparation</h1>

      <div className="mb-6 flex gap-2">
        <button onClick={() => { setMode("questions"); setResult(null); }} className={`px-4 py-2 rounded-md text-sm font-medium ${mode === "questions" ? "bg-primary-600 text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"}`}>Generate Questions</button>
        <button onClick={() => { setMode("feedback"); setResult(null); }} className={`px-4 py-2 rounded-md text-sm font-medium ${mode === "feedback" ? "bg-primary-600 text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"}`}>Get Feedback</button>
      </div>

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 space-y-4">
        <input name="job_title" placeholder="Job Title" value={formData.job_title} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-md" required />
        {mode === "questions" && (
          <>
            <select name="experience_level" value={formData.experience_level} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-md">
              <option value="entry">Entry Level</option>
              <option value="mid">Mid Level</option>
              <option value="senior">Senior Level</option>
            </select>
            <input name="question_types" placeholder="Question types (behavioral, technical, situational) - optional" value={formData.question_types} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-md" />
          </>
        )}
        {mode === "feedback" && (
          <>
            <textarea name="question" placeholder="Paste the interview question" value={formData.question} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-md" rows={3} required />
            <textarea name="answer" placeholder="Paste your answer" value={formData.answer} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-md" rows={5} required />
          </>
        )}
        <button type="submit" disabled={loading} className="w-full py-3 bg-primary-600 text-white rounded-md font-medium hover:bg-primary-700 disabled:opacity-50">
          {loading ? "Processing..." : mode === "questions" ? "Generate Questions" : "Get Feedback"}
        </button>
      </form>

      {result && (
        <div className="mt-6 bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-xl font-semibold mb-4">{mode === "questions" ? "Interview Questions" : "Feedback"}</h2>
          {result.error ? (
            <p className="text-red-600">{result.error}</p>
          ) : (
            <pre className="whitespace-pre-wrap text-sm text-gray-700">{JSON.stringify(result, null, 2)}</pre>
          )}
        </div>
      )}
    </div>
  );
};

export default InterviewPrep;
