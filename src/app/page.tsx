"use client";

export const dynamic = 'force-dynamic';

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import DoctorCard from "@/components/DoctorCard";
import FilterPanel from "@/components/FilterPanel";
import SearchBar from "@/components/SearchBar";
import LoadingState from "@/components/LoadingState";
import ErrorState from "@/components/ErrorState";
import { useUrlParams } from "@/utils/useUrlParams";
import { Doctor } from "@/types";

// Create a client component to handle search params
function DoctorContent() {
  // State for doctors data
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [filteredDoctors, setFilteredDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  
  // State for filters and search
  const [searchTerm, setSearchTerm] = useState("");
  const [searchSuggestions, setSearchSuggestions] = useState<string[]>([]);
  const [consultationType, setConsultationType] = useState<string>("");
  const [selectedSpecialties, setSelectedSpecialties] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<string>("");
  const [allSpecialties, setAllSpecialties] = useState<string[]>([]);

  // Initialize URL params handling
  const { updateUrlParams, clearAllFilters } = useUrlParams({
    searchTerm,
    setSearchTerm,
    consultationType,
    setConsultationType,
    selectedSpecialties,
    setSelectedSpecialties,
    sortBy,
    setSortBy
  });

  // Fetch doctors data from API
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        setLoading(true);
        const response = await fetch("https://srijandubey.github.io/campus-api-mock/SRM-C1-25.json");
        
        if (!response.ok) {
          throw new Error(`Failed to fetch doctors data: ${response.status} ${response.statusText}`);
        }
        
        const data = await response.json();
        
        // Adapt API format to our Doctor interface
        if (Array.isArray(data) && data.length > 0) {
          const processedData: Doctor[] = data.map((item: any, index: number) => {
            // Extract specialties array
            const specialties = item.specialities 
              ? item.specialities.map((s: any) => s.name || "General") 
              : ["General"];

            // Get fee as number by removing currency and non-numeric characters
            const feeStr = item.fees ? item.fees.replace(/[^\d]/g, '') : '';
            const fee = feeStr ? parseInt(feeStr, 10) : 500;
            
            // Extract years from experience string
            let experience = 0;
            if (item.experience) {
              const experienceMatch = item.experience.match(/(\d+)/);
              experience = experienceMatch ? parseInt(experienceMatch[1], 10) : 0;
            }

            return {
              id: parseInt(item.id) || index + 1,
              name: item.name || "Unknown Doctor",
              specialties: specialties,
              experience: experience,
              fee: fee,
              rating: 4.5, // Default since API doesn't provide this
              location: item.clinic?.address?.city || "Not specified",
              consultationMode: [
                ...(item.video_consult ? ["Video Consult"] : []),
                ...(item.in_clinic ? ["In-clinic"] : [])
              ],
              imageUrl: item.photo || undefined
            };
          });
          
          setDoctors(processedData);
          
          // Extract all unique specialties
          const specialtiesSet = new Set<string>();
          processedData.forEach((doctor: Doctor) => {
            doctor.specialties.forEach((specialty: string) => {
              if (specialty) specialtiesSet.add(specialty);
            });
          });
          setAllSpecialties(Array.from(specialtiesSet));
        } else {
          throw new Error("Invalid data format: Expected an array of doctors");
        }
        
        setLoading(false);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : "Failed to load doctors data";
        setError(errorMessage);
        setLoading(false);
        console.error(err);
      }
    };

    fetchDoctors();
  }, []);

  // Apply filters and update URL whenever filters change
  useEffect(() => {
    if (doctors.length === 0) return;

    let result = [...doctors];

    // Apply search filter
    if (searchTerm) {
      result = result.filter(doctor => 
        doctor.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply consultation type filter
    if (consultationType) {
      result = result.filter(doctor => 
        doctor.consultationMode.includes(consultationType)
      );
    }

    // Apply specialty filters
    if (selectedSpecialties.length > 0) {
      result = result.filter(doctor => 
        selectedSpecialties.some(specialty => 
          doctor.specialties.includes(specialty)
        )
      );
    }

    // Apply sorting
    if (sortBy === "fees") {
      result.sort((a, b) => a.fee - b.fee);
    } else if (sortBy === "experience") {
      result.sort((a, b) => b.experience - a.experience);
    }

    setFilteredDoctors(result);
    updateUrlParams();
  }, [doctors, searchTerm, consultationType, selectedSpecialties, sortBy, updateUrlParams]);

  // Generate search suggestions
  useEffect(() => {
    if (!searchTerm) {
      setSearchSuggestions([]);
      return;
    }

    const suggestions = doctors
      .map(doctor => doctor.name)
      .filter(name => 
        name.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .slice(0, 3);

    setSearchSuggestions(suggestions);
  }, [searchTerm, doctors]);

  // Handle checkbox change for specialties
  const handleSpecialtyChange = (specialty: string) => {
    setSelectedSpecialties(prev => {
      if (prev.includes(specialty)) {
        return prev.filter(s => s !== specialty);
      } else {
        return [...prev, specialty];
      }
    });
  };

  if (loading) {
    return <LoadingState />;
  }

  if (error) {
    return <ErrorState message={error} />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto py-4 px-4">
          <h1 className="text-2xl font-bold text-blue-600">Doctor Connect</h1>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 px-4">
        {/* Search Bar */}
        <SearchBar 
          searchTerm={searchTerm} 
          setSearchTerm={setSearchTerm} 
          suggestions={searchSuggestions} 
        />

        <div className="flex flex-col md:flex-row gap-6">
          {/* Filters and Sort Panel */}
          <FilterPanel 
            allSpecialties={allSpecialties}
            consultationType={consultationType}
            setConsultationType={setConsultationType}
            selectedSpecialties={selectedSpecialties}
            handleSpecialtyChange={handleSpecialtyChange}
            sortBy={sortBy}
            setSortBy={setSortBy}
            clearAllFilters={clearAllFilters}
          />

          {/* Doctor List */}
          <div className="w-full md:w-3/4">
            {filteredDoctors.length > 0 ? (
              <div className="grid grid-cols-1 gap-6">
                {filteredDoctors.map((doctor) => (
                  <DoctorCard key={doctor.id} doctor={doctor} />
                ))}
              </div>
            ) : (
              <div className="bg-white p-8 rounded-lg shadow-md text-center">
                <p className="text-gray-500 text-lg">No doctors match your search criteria.</p>
              </div>
            )}
          </div>
        </div>
      </main>

      <footer className="bg-white border-t border-gray-200 mt-8">
        <div className="max-w-7xl mx-auto py-6 px-4">
          <p className="text-center text-gray-500">© 2025 Doctor Connect For Bajaj Finserv. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

// Main page component with Suspense boundary
export default function Home() {
  return (
    <Suspense fallback={<LoadingState />}>
      <DoctorContent />
    </Suspense>
  );
}
