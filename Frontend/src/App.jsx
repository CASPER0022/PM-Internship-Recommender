import React, { useState } from "react";
import LandingPage from "./LandingPage";
import ResultsPage from "./ResultsPage";

function App() {
  const [currentPage, setCurrentPage] = useState("landing");
  const [results, setResults] = useState([]);

  const handleResultsReady = (recommendationData) => {
    setResults(recommendationData);
    setCurrentPage("results");
  };

  const handleBackToLanding = () => {
    setCurrentPage("landing");
    setResults([]);
  };

  return (
    <div>
      {currentPage === "landing" && (
        <LandingPage onResultsReady={handleResultsReady} />
      )}
      {currentPage === "results" && (
        <ResultsPage results={results} onBackToLanding={handleBackToLanding} />
      )}
    </div>
  );
}

export default App;
