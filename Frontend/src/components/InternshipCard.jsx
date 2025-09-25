import React from "react";

function InternshipCard({ internship, showMatchScore = false, matchScore }) {
  // Handle both old format (title, skills, location, sector) and new format (jobTitle, company, etc.)
  const jobTitle = internship.jobTitle || internship.title;
  const company = internship.company || "Company Name";
  const position = internship.position || jobTitle;
  const description = internship.description || "No description available";
  const skills = internship.skills || [];
  const location = internship.location || "Location not specified";
  const duration = internship.duration || "Duration not specified";
  const stipend = internship.stipend || "Stipend not specified";
  const sector = internship.sector;

  return (
    <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-300 hover:scale-105 group">
      {/* Match Score Badge (only for recommendation results) */}
      {showMatchScore && (
        <div className="flex justify-end mb-2">
          <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
            {Math.round(matchScore * 100)}% Match
          </div>
        </div>
      )}

      {/* Card Header */}
      <div className="mb-4">
        <h4 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 group-hover:bg-clip-text transition-all duration-300">
          {jobTitle}
        </h4>
        <p className="text-lg font-semibold text-blue-600 mb-1">{company}</p>
        <p className="text-md text-gray-700 font-medium">{position}</p>
        
        {/* Sector Badge (for old format compatibility) */}
        {sector && (
          <div className="mt-2">
            <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-sm font-medium">
              {sector}
            </span>
          </div>
        )}
      </div>
      
      {/* Description */}
      <p className="text-gray-600 text-sm mb-4 leading-relaxed line-clamp-3">
        {description}
      </p>
      
      {/* Details Section */}
      <div className="space-y-2 mb-4">
        <div className="flex items-center text-sm text-gray-600">
          <svg className="w-4 h-4 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span>{location}</span>
        </div>
        
        {/* Duration (only for new format) */}
        {internship.duration && (
          <div className="flex items-center text-sm text-gray-600">
            <svg className="w-4 h-4 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{duration}</span>
          </div>
        )}
        
        {/* Stipend (only for new format) */}
        {internship.stipend && (
          <div className="flex items-center text-sm text-green-600 font-semibold">
            <svg className="w-4 h-4 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
            </svg>
            <span>{stipend}</span>
          </div>
        )}
      </div>
      
      {/* Skills Section */}
      <div className="mb-4">
        <p className="text-sm font-semibold text-gray-700 mb-2">Required Skills:</p>
        <div className="flex flex-wrap gap-2">
          {skills.slice(0, 4).map((skill, skillIndex) => (
            <span key={skillIndex} className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
              {skill}
            </span>
          ))}
          {skills.length > 4 && (
            <span className="px-3 py-1 bg-gray-100 text-gray-500 rounded-full text-xs font-medium">
              +{skills.length - 4} more
            </span>
          )}
        </div>
      </div>
      
      {/* Action Buttons */}
      <div className="flex gap-3 pt-4 border-t border-gray-100">
        <button className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2 px-4 rounded-xl font-semibold hover:scale-105 transition-all duration-200 hover:shadow-lg">
          Apply Now
        </button>
        <button className="p-2 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 hover:border-purple-300 transition-all duration-200 group">
          <svg className="w-5 h-5 text-gray-400 group-hover:text-purple-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default InternshipCard;