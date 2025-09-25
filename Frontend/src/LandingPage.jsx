import React, { useState } from "react";

function LandingPage({ onResultsReady }) {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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
      setError("Failed to fetch recommendations.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">
          Internship Recommendation Engine
        </h1>
        
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-xl font-semibold mb-6 text-center">
            Upload your CV to get personalized internship recommendations
          </h2>
          
          <form
            onSubmit={handleUpload}
            className="flex flex-col items-center space-y-6"
          >
            <div className="w-full">
              <label htmlFor="cv-upload" className="block text-sm font-medium text-gray-700 mb-2">
                Choose your CV (PDF format)
              </label>
              <input
                id="cv-upload"
                type="file"
                accept="application/pdf"
                onChange={(e) => {
                  setFile(e.target.files[0]);
                  setError(""); // Clear error when file is selected
                }}
                className="w-full p-3 border-2 border-gray-300 rounded-lg bg-white hover:border-blue-400 focus:border-blue-500 focus:outline-none transition-colors"
              />
              {file && (
                <p className="mt-2 text-sm text-green-600">
                  ✓ Selected: {file.name}
                </p>
              )}
            </div>
            
            <button
              type="submit"
              disabled={loading}
              className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors font-medium"
            >
              {loading ? "🔄 Processing CV..." : "Get Recommendations"}
            </button>
          </form>

          {error && (
            <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-600 text-center">{error}</p>
            </div>
          )}
        </div>
        
        <div className="mt-8 text-center text-gray-600">
          <p className="text-sm">
            Our AI will analyze your CV and match you with the best internship opportunities
          </p>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;