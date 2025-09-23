import React, { useState } from "react";

function App() {
  const [file, setFile] = useState(null);
  const [results, setResults] = useState([]);
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
    setResults([]);

    try {
      const formData = new FormData();
      formData.append("cv", file);

      const response = await fetch("http://127.0.0.1:5000/recommend", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Server error");

      const data = await response.json();
      setResults(data);
    } catch (err) {
      setError("Failed to fetch recommendations.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-2xl font-bold text-center mb-6">
        Internship Recommendation Engine
      </h1>

      <form
        onSubmit={handleUpload}
        className="flex flex-col items-center space-y-4"
      >
        <input
          type="file"
          accept="application/pdf"
          onChange={(e) => setFile(e.target.files[0])}
          className="p-2 border rounded bg-white"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          Get Recommendations
        </button>
      </form>

      {loading && <p className="text-center mt-6">🔄 Processing CV...</p>}
      {error && <p className="text-center text-red-600 mt-6">{error}</p>}

      <div className="mt-8 grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {results.map((internship, index) => (
          <div
            key={index}
            className="bg-white shadow-lg rounded-xl p-4 hover:shadow-xl transition"
          >
            <h2 className="text-lg font-semibold">{internship.title}</h2>
            <p className="text-gray-600">
              <b>Skills:</b> {internship.skills.join(", ")}
            </p>
            <p className="text-gray-600">
              <b>Location:</b> {internship.location}
            </p>
            <p className="text-gray-600">
              <b>Sector:</b> {internship.sector}
            </p>
            <button className="mt-3 bg-green-500 text-white px-3 py-1 rounded-lg hover:bg-green-600">
              Apply Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
