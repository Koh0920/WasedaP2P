export interface TimetableEntry {
  courseId: string;
  courseName: string;
  professor: string;
  room: string;
  day: "Mon" | "Tue" | "Wed" | "Thu" | "Fri";
  period: 1 | 2 | 3 | 4 | 5 | 6;
}

export interface Timetable {
  semester: string;
  year: number;
  entries: TimetableEntry[];
}

export interface User {
  id: string;
  username: string;
  email?: string;
  totalNotes: number;
  totalUpvotes: number;
  coursesContributed: number;
  timetables?: Timetable[];
}

export interface Note {
  id: string;
  courseName: string;
  professorName: string;
  faculty: string;
  department: string;
  year: number;
  semester: "Spring" | "Fall";
  uploader: {
    username: string;
    id: string;
  };
  uploadDate: Date;
  fileType: "PDF" | "Image" | "Document";
  fileName: string;
  upvotes: number;
  downvotes: number;
  netScore: number;
  description?: string;
}

export interface Faculty {
  id: string;
  name: string;
  departments: Department[];
}

export interface Department {
  id: string;
  name: string;
  courses: Course[];
}

export interface Course {
  id: string;
  name: string;
  professor: string;
}

export type SortOption = "recent" | "upvoted" | "name";

export interface FilterState {
  faculty: string;
  department: string;
  course: string;
}
