export interface Course {
  id: string;
  title: string;
  description: string;
  level: string;
  duration: string;
  rating: number;
  students: number;
  status: 'published' | 'draft' | 'intermediate' | 'advanced';
  thumbnail: string;
}