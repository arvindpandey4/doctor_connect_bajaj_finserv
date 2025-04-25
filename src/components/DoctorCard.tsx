"use client";

import React from "react";
import { Doctor } from "@/types";

interface DoctorCardProps {
  doctor: Doctor;
}

const DoctorCard: React.FC<DoctorCardProps> = ({ doctor }) => {
  // Helper function to safely join arrays
  const safeJoin = (arr: string[] | undefined, separator: string = ", ", fallback: string = "Not specified") => {
    if (!arr || !Array.isArray(arr) || arr.length === 0) {
      return fallback;
    }
    return arr.join(separator);
  };

  return (
    <div 
      data-testid="doctor-card"
      className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow"
    >
      <div className="flex flex-col md:flex-row gap-4">
        <div className="w-full md:w-3/4">
          <h3 data-testid="doctor-name" className="text-xl font-bold">{doctor.name || "Unknown Doctor"}</h3>
          <p data-testid="doctor-specialty" className="text-blue-600 mt-1">
            {safeJoin(doctor.specialties, ", ", "No specialties listed")}
          </p>
          <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2">
            <div>
              <span className="text-gray-600">Experience: </span>
              <span data-testid="doctor-experience">{doctor.experience ?? 'N/A'} {doctor.experience ? 'years' : ''}</span>
            </div>
            <div>
              <span className="text-gray-600">Fee: </span>
              <span data-testid="doctor-fee">{doctor.fee ? `₹${doctor.fee}` : 'N/A'}</span>
            </div>
            <div>
              <span className="text-gray-600">Rating: </span>
              <span>{doctor.rating ? `${doctor.rating}/5` : 'Not rated'}</span>
            </div>
            <div>
              <span className="text-gray-600">Location: </span>
              <span>{doctor.location || 'Location not specified'}</span>
            </div>
          </div>
          <div className="mt-2">
            <span className="text-gray-600">Available for: </span>
            <span>
              {safeJoin(doctor.consultationMode, ", ", "Consultation mode not specified")}
            </span>
          </div>
        </div>
        <div className="w-full md:w-1/4 flex justify-center items-center">
          <button className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors">
            Book Appointment
          </button>
        </div>
      </div>
    </div>
  );
};

export default DoctorCard; 