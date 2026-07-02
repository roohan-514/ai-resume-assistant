import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const features = [
    { title: "Resume Builder", description: "Generate ATS-optimized resumes tailored to your target role.", path: "/resume-builder", icon: "📝" },
    { title: "Interview Coach", description: "Practice with AI-generated questions and get instant feedback.", path: "/interview-prep", icon: "🎯" },
    { title: "Career Advisor", description: "Discover career paths and skill development recommendations.", path: "/career-paths", icon: "🚀" },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
          AI Resume &amp; Career Assistant
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
          Build standout resumes, ace your interviews, and discover your next career move with AI-powered guidance.
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <Link to="/resume-builder" className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700">
            Build Your Resume
          </Link>
          <Link to="/interview-prep" className="inline-flex items-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
            Practice Interviews
          </Link>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-8 mb-16">
        {features.map((feature) => (
          <Link key={feature.title} to={feature.path} className="block p-6 bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
            <div className="text-4xl mb-4">{feature.icon}</div>
            <h3 className="text-lg font-semibold text-gray-900">{feature.title}</h3>
            <p className="mt-2 text-gray-500">{feature.description}</p>
          </Link>
        ))}
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">How It Works</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary-100 text-primary-600 font-bold mb-3">1</div>
            <h3 className="font-semibold">Enter Your Details</h3>
            <p className="text-gray-500 text-sm mt-1">Share your experience, skills, and career goals.</p>
          </div>
          <div>
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary-100 text-primary-600 font-bold mb-3">2</div>
            <h3 className="font-semibold">AI Processes</h3>
            <p className="text-gray-500 text-sm mt-1">OpenAI analyzes your profile for optimal results.</p>
          </div>
          <div>
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary-100 text-primary-600 font-bold mb-3">3</div>
            <h3 className="font-semibold">Get Results</h3>
            <p className="text-gray-500 text-sm mt-1">Receive tailored resumes, feedback, or career paths.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
