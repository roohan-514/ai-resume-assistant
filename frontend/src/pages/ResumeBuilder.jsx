import React, { useState } from "react";
import { generateResume, parseResume, optimizeResume } from "../services/api";

const ResumeBuilder = () => {
  const [mode, setMode] = useState("generate");
  const [formData, setFormData] = useState({ job_title: "", experience: "", skills: "", achievements: "", resume_text: "", job_description: "" });
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      let res;
      if (mode === "generate") {
        res = await generateResume({
          job_title: formData.job_title,
          experience: formData.experience,
          skills: formData.skills.split(",").map((s) => s.trim()),
          achievements: formData.achievements ? formData.achievements.split(",").map((a) => a.trim()) : [],
        });
      } else if (mode === "parse") {
        res = await parseResume({ resume_text: formData.resume_text });
      } else {
        res = await optimizeResume({ resume_text: formData.resume_text, job_description: formData.job_description });
      }
      setResult(res.data);
    } catch (err) {
      setResult({ error: err.response?.data?.detail || err.message });
    }
    setLoading(false);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Resume Builder</h1>

      <div className="mb-6 flex gap-2">
        {["generate", "parse", "optimize"].map((m) => (
          <button key={m} onClick={() => { setMode(m); setResult(null); }} className={`px-4 py-2 rounded-md text-sm font-medium ${mode === m ? "bg-primary-600 text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"}`}>
            {m === "generate" ? "Generate" : m === "parse" ? "Parse" : "Optimize"}
          </button>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 space-y-4">
        {mode === "generate" && (
          <>
            <input name="job_title" placeholder="Job Title" value={formData.job_title} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-md" required />
            <textarea name="experience" placeholder="Describe your experience..." value={formData.experience} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-md" rows={4} required />
            <input name="skills" placeholder="Skills (comma separated)" value={formData.skills} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-md" required />
            <input name="achievements" placeholder="Achievements (comma separated, optional)" value={formData.achievements} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-md" />
          </>
        )}
        {(mode === "parse" || mode === "optimize") && (
          <textarea name="resume_text" placeholder="Paste your resume text here..." value={formData.resume_text} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-md" rows={8} required />
        )}
        {mode === "optimize" && (
          <textarea name="job_description" placeholder="Paste the job description..." value={formData.job_description} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-md" rows={4} required />
        )}
        <button type="submit" disabled={loading} className="w-full py-3 bg-primary-600 text-white rounded-md font-medium hover:bg-primary-700 disabled:opacity-50">
          {loading ? "Processing..." : mode === "generate" ? "Generate Resume" : mode === "parse" ? "Parse Resume" : "Optimize Resume"}
        </button>
      </form>

      {result && (
        <div className="mt-6 bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-xl font-semibold mb-4">Result</h2>
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

export default ResumeBuilder;
