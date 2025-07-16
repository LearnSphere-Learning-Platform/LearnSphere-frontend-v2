export interface InstructorCourse {
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

export interface CourseStats {
  totalCourses: number;
  totalStudents: number;
  averageRating: number;
  publishedCourses: number;
}

export interface CourseFormData {
  title: string;
  description: string;
  level: string;
  duration: string;
  status: 'published' | 'draft';
}