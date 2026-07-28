import React from 'react';
import { Link } from 'react-router-dom';

const AutoCorrectBanner = ({ originalTerm, correctedTerm, onSearchOriginal }) => {
  if (!originalTerm || !correctedTerm || originalTerm.toLowerCase() === correctedTerm.toLowerCase()) {
    return null;
  }

  return (
    <div className="w-full bg-primary/10 border border-primary/30 rounded-xl p-4 mb-6 flex items-start gap-4 shadow-sm backdrop-blur-md">
      <div className="mt-1">
        <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
      <div>
        <p className="text-slate-200">
          Showing results for <span className="font-bold text-white text-lg">"{correctedTerm}"</span>
        </p>
        <p className="text-slate-400 text-sm mt-1">
          Search instead for{" "}
          <button 
            onClick={() => onSearchOriginal(originalTerm)}
            className="text-primary hover:text-white hover:underline transition-colors font-medium cursor-pointer"
          >
            "{originalTerm}"
          </button>
        </p>
      </div>
    </div>
  );
};

export default AutoCorrectBanner;
