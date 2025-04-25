"use client";

import React from "react";

interface FilterPanelProps {
  allSpecialties: string[];
  consultationType: string;
  setConsultationType: (value: string) => void;
  selectedSpecialties: string[];
  handleSpecialtyChange: (specialty: string) => void;
  sortBy: string;
  setSortBy: (value: string) => void;
  clearAllFilters: () => void;
}

const FilterPanel: React.FC<FilterPanelProps> = ({
  allSpecialties,
  consultationType,
  setConsultationType,
  selectedSpecialties,
  handleSpecialtyChange,
  sortBy,
  setSortBy,
  clearAllFilters,
}) => {
  return (
    <div className="w-full md:w-1/4 space-y-4">
      {/* Sort Options */}
      <div className="bg-white p-4 rounded-lg shadow-md">
        <h2 data-testid="filter-header-sort" className="text-lg font-semibold mb-4">Sort By</h2>
        <div className="space-y-2">
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="radio"
              data-testid="sort-fees"
              name="sortBy"
              checked={sortBy === "fees"}
              onChange={() => setSortBy("fees")}
              className="form-radio"
            />
            <span>Fees (Low to High)</span>
          </label>
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="radio"
              data-testid="sort-experience"
              name="sortBy"
              checked={sortBy === "experience"}
              onChange={() => setSortBy("experience")}
              className="form-radio"
            />
            <span>Experience (High to Low)</span>
          </label>
        </div>
      </div>

      {/* Consultation Type Filter */}
      <div className="bg-white p-4 rounded-lg shadow-md">
        <h2 data-testid="filter-header-moc" className="text-lg font-semibold mb-4">Consultation Type</h2>
        <div className="space-y-2">
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="radio"
              data-testid="filter-video-consult"
              name="consultationType"
              value="Video Consult"
              checked={consultationType === "Video Consult"}
              onChange={() => setConsultationType("Video Consult")}
              className="form-radio"
            />
            <span>Video Consult</span>
          </label>
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="radio"
              data-testid="filter-in-clinic"
              name="consultationType"
              value="In-clinic"
              checked={consultationType === "In-clinic"}
              onChange={() => setConsultationType("In-clinic")}
              className="form-radio"
            />
            <span>In-clinic</span>
          </label>
        </div>
      </div>

      {/* Specialty Filters */}
      <div className="bg-white p-4 rounded-lg shadow-md">
        <div className="flex justify-between items-center mb-4">
          <h2 data-testid="filter-header-speciality" className="text-lg font-semibold">Specialties</h2>
        </div>
        <div className="space-y-2 max-h-60 overflow-y-auto">
          {allSpecialties && allSpecialties.length > 0 ? (
            allSpecialties.map((specialty, index) => (
              <label key={index} className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  data-testid={`filter-specialty-${specialty.replace(/\s+/g, '-')}`}
                  checked={selectedSpecialties.includes(specialty)}
                  onChange={() => handleSpecialtyChange(specialty)}
                  className="form-checkbox"
                />
                <span>{specialty}</span>
              </label>
            ))
          ) : (
            <p className="text-gray-500 italic">No specialties available</p>
          )}
        </div>
      </div>

      {/* Clear All Filters */}
      <button 
        onClick={clearAllFilters}
        className="w-full py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors"
      >
        Clear All
      </button>
    </div>
  );
};

export default FilterPanel; 