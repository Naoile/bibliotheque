export interface Book {
  id: string;
  title: string;
  author: string;
  genre?: string;
  year?: number;
  read: boolean;
  rating?: number; // 1 à 5 étoiles
  notes?: string; // Fiche de lecture / commentaire personnel
}