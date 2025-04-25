"use client";

import React from "react";
import { Doctor } from "@/types";
import Image from "next/image";

interface DoctorCardProps {
  doctor: Doctor;
}

const DoctorCard: React.FC<DoctorCardProps> = ({ doctor }) => {
  
  const safeJoin = (arr: string[] | undefined, separator: string = ", ", fallback: string = "Not specified") => {
    if (!arr || !Array.isArray(arr) || arr.length === 0) {
      return fallback;
    }
    return arr.join(separator);
  };

  // Default avatar if not available
  const defaultAvatar = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23ccc'%3E%3Cpath d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2a7.2 7.2 0 01-6-3.22c.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08a7.2 7.2 0 01-6 3.22z'/%3E%3C/svg%3E";

  return (
    <div 
      data-testid="doctor-card"
      className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow"
    >
      <div className="flex flex-col md:flex-row gap-4">
        <div className="w-full md:w-3/4">
          <div className="flex items-center mb-3">
            {doctor.imageUrl ? (
              <div className="h-16 w-16 rounded-full overflow-hidden mr-4 relative bg-gray-200">
                <img 
                  src={doctor.imageUrl} 
                  alt={doctor.name || "Doctor"} 
                  className="h-full w-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = defaultAvatar;
                  }}
                />
              </div>
            ) : (
              <div className="h-16 w-16 rounded-full overflow-hidden mr-4 bg-gray-200 flex items-center justify-center">
                <img 
                  src={defaultAvatar} 
                  alt="Default avatar" 
                  className="h-12 w-12"
                />
              </div>
            )}
            <div>
              <h3 data-testid="doctor-name" className="text-xl font-bold">{doctor.name || "Unknown Doctor"}</h3>
              <p data-testid="doctor-specialty" className="text-blue-600">
                {safeJoin(doctor.specialties, ", ", "No specialties listed")}
              </p>
            </div>
          </div>
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