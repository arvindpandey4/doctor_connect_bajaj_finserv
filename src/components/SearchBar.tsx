"use client";

import React, { useState } from "react";

interface SearchBarProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  suggestions: string[];
}

const SearchBar: React.FC<SearchBarProps> = ({ searchTerm, setSearchTerm, suggestions }) => {
  const [showSuggestions, setShowSuggestions] = useState(false);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setShowSuggestions(true);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setSearchTerm(suggestion);
    setShowSuggestions(false);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowSuggestions(false);
  };

  return (
    <div className="relative w-full mb-6">
      <form onSubmit={handleSearchSubmit} className="w-full">
        <input
          type="text"
          data-testid="autocomplete-input"
          placeholder="Search doctor by name"
          className="w-full p-3 border border-gray-300 rounded-md"
          value={searchTerm}
          onChange={handleSearchChange}
          onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
          onFocus={() => setShowSuggestions(true)}
        />
        {showSuggestions && suggestions.length > 0 && (
          <div className="absolute z-10 w-full bg-white border border-gray-300 rounded-md mt-1 shadow-lg">
            {suggestions.map((suggestion, index) => (
              <div
                key={index}
                data-testid="suggestion-item"
                className="p-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => handleSuggestionClick(suggestion)}
              >
                {suggestion}
              </div>
            ))}
          </div>
        )}
      </form>
    </div>
  );
};

export default SearchBar; 