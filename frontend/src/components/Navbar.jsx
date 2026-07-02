import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <svg className="h-8 w-8 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <span className="text-xl font-bold text-gray-900">AI Resume Assistant</span>
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <Link to="/" className="text-gray-600 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium">Home</Link>
            <Link to="/resume-builder" className="text-gray-600 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium">Resume Builder</Link>
            <Link to="/interview-prep" className="text-gray-600 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium">Interview Prep</Link>
            <Link to="/career-paths" className="text-gray-600 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium">Career Paths</Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
