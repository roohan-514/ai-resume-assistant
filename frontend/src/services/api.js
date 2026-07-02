import axios from "axios";

const API_BASE = process.env.REACT_APP_API_URL || "http://localhost:8000";

const api = axios.create({
  baseURL: API_BASE,
  headers: { "Content-Type": "application/json" },
});

export const generateResume = (data) => api.post("/api/resume/generate", data);
export const parseResume = (data) => api.post("/api/resume/parse", data);
export const optimizeResume = (data) => api.post("/api/resume/optimize", data);
export const getInterviewQuestions = (data) => api.post("/api/interview/questions", data);
export const getInterviewFeedback = (data) => api.post("/api/interview/feedback", data);
export const getCareerRecommendations = (data) => api.post("/api/career/recommend", data);

export default api;
