"use client";

import { useCallback, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

interface UseUrlParamsProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  consultationType: string;
  setConsultationType: (value: string) => void;
  selectedSpecialties: string[];
  setSelectedSpecialties: (value: string[]) => void;
  sortBy: string;
  setSortBy: (value: string) => void;
}

export const useUrlParams = ({
  searchTerm,
  setSearchTerm,
  consultationType,
  setConsultationType,
  selectedSpecialties,
  setSelectedSpecialties,
  sortBy,
  setSortBy,
}: UseUrlParamsProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Initialize filters from URL params
  useEffect(() => {
    if (searchParams) {
      const search = searchParams.get("search") || "";
      const consult = searchParams.get("consultationType") || "";
      const specialties = searchParams.getAll("specialty");
      const sort = searchParams.get("sortBy") || "";

      setSearchTerm(search);
      setConsultationType(consult);
      setSelectedSpecialties(specialties);
      setSortBy(sort);
    }
  }, [searchParams, setSearchTerm, setConsultationType, setSelectedSpecialties, setSortBy]);

  // Update URL with current filters
  const updateUrlParams = useCallback(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams();
      
      if (searchTerm) params.append("search", searchTerm);
      if (consultationType) params.append("consultationType", consultationType);
      selectedSpecialties.forEach(specialty => params.append("specialty", specialty));
      if (sortBy) params.append("sortBy", sortBy);
      
      const newUrl = `${window.location.pathname}?${params.toString()}`;
      router.push(newUrl, { scroll: false });
    }
  }, [searchTerm, consultationType, selectedSpecialties, sortBy, router]);

  // Clear all filters
  const clearAllFilters = useCallback(() => {
    setSearchTerm("");
    setConsultationType("");
    setSelectedSpecialties([]);
    setSortBy("");
    router.push(window.location.pathname);
  }, [router, setSearchTerm, setConsultationType, setSelectedSpecialties, setSortBy]);

  return { updateUrlParams, clearAllFilters };
}; 