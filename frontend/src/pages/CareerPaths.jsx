import React, { useState } from "react";
import { getCareerRecommendations } from "../services/api";

const CareerPaths = () => {
  const [formData, setFormData] = useState({ current_role: "", skills: "", interests: "", experience_years: 0 });
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const value = e.target.name === "experience_years" ? parseInt(e.target.value) || 0 : e.target.value;
    setFormData({ ...formData, [e.target.name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await getCareerRecommendations({
        current_role: formData.current_role,
        skills: formData.skills.split(",").map((s) => s.trim()),
        interests: formData.interests ? formData.interests.split(",").map((i) => i.trim()) : [],
        experience_years: formData.experience_years,
      });
      setResult(res.data);
    } catch (err) {
      setResult({ error: err.response?.data?.detail || err.message });
    }
    setLoading(false);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Career Paths</h1>

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 space-y-4">
        <input name="current_role" placeholder="Current Role" value={formData.current_role} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-md" required />
        <input name="skills" placeholder="Skills (comma separated)" value={formData.skills} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-md" required />
        <input name="interests" placeholder="Interests (comma separated, optional)" value={formData.interests} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-md" />
        <input name="experience_years" type="number" placeholder="Years of Experience" value={formData.experience_years} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-md" min="0" />
        <button type="submit" disabled={loading} className="w-full py-3 bg-primary-600 text-white rounded-md font-medium hover:bg-primary-700 disabled:opacity-50">
          {loading ? "Analyzing..." : "Get Career Recommendations"}
        </button>
      </form>

      {result && (
        <div className="mt-6 bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-xl font-semibold mb-4">Recommendations</h2>
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

export default CareerPaths;
