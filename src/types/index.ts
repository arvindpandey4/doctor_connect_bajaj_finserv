export interface Doctor {
  id: number;
  name: string;
  specialties: string[];
  experience: number;
  fee: number;
  rating: number;
  location: string;
  consultationMode: string[];
  imageUrl?: string;
} 