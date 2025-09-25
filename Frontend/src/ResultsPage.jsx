import React from "react";
import InternshipCard from "./components/InternshipCard";

function ResultsPage({ results, onBackToLanding }) {
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Gradient Background matching landing page */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-200 rounded-full filter blur-3xl opacity-30 animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-200 rounded-full filter blur-3xl opacity-30 animate-pulse"></div>
      </div>

      <div className="relative z-10 p-8">
        <div className="max-w-7xl mx-auto">
          {/* Header Section */}
          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center gap-4">
              {/* Icon matching landing page style */}
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Your Internship Recommendations
                </h1>
                <p className="text-gray-600 mt-1">Personalized matches from the PM Internship Portal</p>
              </div>
            </div>
            
            <button
              onClick={onBackToLanding}
              className="bg-white/80 backdrop-blur text-gray-700 px-6 py-3 rounded-xl hover:bg-white transition-all duration-300 shadow-md hover:shadow-lg font-medium flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Upload New CV
            </button>
          </div>

          {/* Stats Card */}
          <div className="mb-8 bg-white/80 backdrop-blur rounded-2xl p-6 shadow-xl border border-white/50">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Total Matches Found</p>
                <p className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  {results.length}
                </p>
              </div>
              <div className="text-right">
                <p className="text-gray-600 text-sm">Based on your</p>
                <p className="text-lg font-semibold text-gray-800">Skills & Qualifications</p>
              </div>
            </div>
          </div>

          {/* Results Grid */}
          <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {results.map((internship, index) => (
              <InternshipCard 
                key={index} 
                internship={internship} 
                showMatchScore={true}
                matchScore={internship.matchScore || 0}
              />
            ))}
          </div>

          {/* Empty State */}
          {results.length === 0 && (
            <div className="text-center py-16 bg-white/80 backdrop-blur rounded-2xl border border-white/50">
              <div className="w-20 h-20 bg-gradient-to-br from-gray-200 to-gray-300 rounded-full mx-auto mb-4 flex items-center justify-center">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M12 12h.01M12 12h-.01M12 20h.01M12 20h-.01M12 20a8 8 0 100-16 8 8 0 000 16z" />
                </svg>
              </div>
              <p className="text-gray-600 text-lg mb-2">No recommendations found</p>
              <p className="text-gray-500">Try uploading a different CV to find matching opportunities.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ResultsPage;