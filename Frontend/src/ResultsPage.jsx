import React from "react";

function ResultsPage({ results, onBackToLanding }) {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            Your Internship Recommendations
          </h1>
          <button
            onClick={onBackToLanding}
            className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
          >
            ← Upload New CV
          </button>
        </div>

        <div className="mb-6 bg-white rounded-lg p-4 shadow">
          <p className="text-gray-600">
            Found <span className="font-semibold text-blue-600">{results.length}</span> internship opportunities that match your profile
          </p>
        </div>

        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {results.map((internship, index) => (
            <div
              key={index}
              className="bg-white shadow-lg rounded-xl p-6 hover:shadow-xl transition-shadow duration-300 border border-gray-200"
            >
              <h2 className="text-xl font-semibold text-gray-800 mb-3">
                {internship.title}
              </h2>
              
              <div className="space-y-2 mb-4">
                <p className="text-gray-600">
                  <span className="font-medium">Skills:</span> {internship.skills.join(", ")}
                </p>
                <p className="text-gray-600">
                  <span className="font-medium">Location:</span> {internship.location}
                </p>
                <p className="text-gray-600">
                  <span className="font-medium">Sector:</span> {internship.sector}
                </p>
              </div>

              <div className="flex gap-2">
                <button className="flex-1 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors font-medium">
                  Apply Now
                </button>
                <button className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                  ♡
                </button>
              </div>
            </div>
          ))}
        </div>

        {results.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No recommendations found. Try uploading a different CV.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default ResultsPage;