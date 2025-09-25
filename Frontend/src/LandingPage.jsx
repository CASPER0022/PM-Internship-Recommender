import React, { useState, useEffect } from "react";
import InternshipCard from "./components/InternshipCard";

function LandingPage({ onResultsReady }) {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [dragActive, setDragActive] = useState(false);
  const [animationStep, setAnimationStep] = useState(0);
  const [activeTab, setActiveTab] = useState('upload');
  const [internships, setInternships] = useState([]);
  const [loadingInternships, setLoadingInternships] = useState(false);

  // Add some smooth entrance animations
  useEffect(() => {
    const timer = setTimeout(() => setAnimationStep(1), 100);
    return () => clearTimeout(timer);
  }, []);

  // Fetch internships data
  useEffect(() => {
    fetchInternships();
  }, []);

  const fetchInternships = async () => {
    setLoadingInternships(true);
    try {
      const response = await fetch("http://127.0.0.1:5000/internships");
      if (response.ok) {
        const data = await response.json();
        setInternships(data);
      }
    } catch (error) {
      console.error("Failed to fetch internships:", error);
    } finally {
      setLoadingInternships(false);
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const droppedFile = e.dataTransfer.files[0];
      if (droppedFile.type === "application/pdf") {
        setFile(droppedFile);
        setError("");
      } else {
        setError("Please upload a PDF file only.");
      }
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) {
      setError("Please upload a CV first!");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const formData = new FormData();
      formData.append("cv", file);

      const response = await fetch("http://127.0.0.1:5000/recommend", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Server error");

      const data = await response.json();
      onResultsReady(data);
    } catch {
      setError("Failed to fetch recommendations. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-r from-pink-400 to-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-indigo-400 to-cyan-400 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse animation-delay-4000"></div>
      </div>

      <div className="relative z-10 min-h-screen p-4 sm:p-8">
        <div className={`w-full max-w-7xl mx-auto transform transition-all duration-1000 ${
          animationStep ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`}>
          
          {/* Header Section */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl mb-4 shadow-2xl">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            
            <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mb-3 leading-tight">
              AI-Powered
            </h1>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4">
              PM Internship Recommender
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed mb-8">
              Get personalized internship recommendations from the PM Internship Portal based on your skills and qualifications. Built for Smart India Hackathon 2025.
            </p>
          </div>

          {/* Tab Navigation */}
          <div className="flex justify-center mb-8">
            <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-2 shadow-lg border border-white/20">
              <button
                onClick={() => setActiveTab('upload')}
                className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                  activeTab === 'upload'
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                    : 'text-gray-600 hover:bg-white/50'
                }`}
              >
                Get Recommendations
              </button>
              <button
                onClick={() => setActiveTab('browse')}
                className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                  activeTab === 'browse'
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                    : 'text-gray-600 hover:bg-white/50'
                }`}
              >
                Browse Internships
              </button>
            </div>
          </div>

          {/* Content based on active tab */}
          {activeTab === 'upload' ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center max-w-6xl mx-auto">
              {/* Left Side - Information */}
              <div className="text-center lg:text-left">
                <h3 className="text-2xl font-bold text-gray-800 mb-4">
                  Upload Your CV
                </h3>
                <p className="text-lg text-gray-600 leading-relaxed mb-6">
                  Upload your CV and our AI will analyze your skills, experience, and qualifications to match you with the most suitable internships from the PM Internship Portal.
                </p>
                <div className="space-y-4 text-left">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-gray-700">AI-powered skill matching</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-gray-700">Personalized recommendations</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-gray-700">Secure and private</span>
                  </div>
                </div>
              </div>

              {/* Right Side - Upload Card */}
              <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/20 p-6 sm:p-8">
                <div className="text-center mb-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">
                    Get Started in Seconds
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Upload your CV and let our AI find perfect matches
                  </p>
                </div>
              
                <form onSubmit={handleUpload} className="space-y-6">
                  {/* Drag & Drop Area */}
                  <div
                    className={`relative border-2 border-dashed rounded-2xl p-8 text-center transition-all duration-300 ${
                      dragActive
                        ? 'border-blue-500 bg-blue-50/50 scale-105'
                        : file
                        ? 'border-green-400 bg-green-50/50'
                        : 'border-gray-300 hover:border-blue-400 hover:bg-blue-50/30'
                    }`}
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                  >
                    <input
                      id="cv-upload"
                      type="file"
                      accept="application/pdf"
                      onChange={(e) => {
                        setFile(e.target.files[0]);
                        setError("");
                      }}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                    
                    <div className="space-y-3">
                      {file ? (
                        <div className="text-center">
                          <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 rounded-xl mb-3">
                            <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                          </div>
                          <p className="font-semibold text-green-700 text-sm">{file.name}</p>
                          <p className="text-xs text-green-600">Ready to analyze!</p>
                        </div>
                      ) : (
                        <div className="text-center">
                          <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-xl mb-3">
                            <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                            </svg>
                          </div>
                          <p className="font-semibold text-gray-700 text-sm mb-1">
                            Drop your CV here or click to browse
                          </p>
                          <p className="text-xs text-gray-500">
                            PDF files only • Maximum 10MB
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  {/* Submit Button */}
                  <div className="text-center">
                    <button
                      type="submit"
                      disabled={loading || !file}
                      className={`
                        inline-flex items-center justify-center px-8 py-3 rounded-xl font-semibold
                        transition-all duration-300 transform hover:scale-105 active:scale-95
                        disabled:transform-none disabled:cursor-not-allowed
                        ${loading || !file
                          ? 'bg-gray-300 text-gray-500'
                          : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-xl hover:shadow-blue-500/25'
                        }
                      `}
                    >
                      {loading ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Analyzing Your CV...
                        </>
                      ) : (
                        <>
                          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                          </svg>
                          Get Recommendations
                        </>
                      )}
                    </button>
                  </div>
                </form>

                {/* Error Display */}
                {error && (
                  <div className="mt-6 p-4 bg-red-50/80 backdrop-blur-sm border border-red-200 rounded-xl">
                    <div className="flex items-center justify-center">
                      <svg className="w-5 h-5 text-red-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <p className="text-red-700 font-medium text-sm">{error}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : (
            // Browse Internships Tab
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-800 mb-2">
                  Available Internships
                </h3>
                <p className="text-gray-600">
                  Explore internship opportunities from the PM Internship Portal
                </p>
              </div>

              {loadingInternships ? (
                <div className="text-center py-12">
                  <svg className="animate-spin h-12 w-12 text-blue-600 mx-auto mb-4" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <p className="text-gray-600">Loading internships...</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {internships.map((internship, index) => (
                    <InternshipCard 
                      key={index} 
                      internship={internship} 
                    />
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default LandingPage;