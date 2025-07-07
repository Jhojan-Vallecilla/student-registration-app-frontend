export interface Teacher {
  id: number;
  name: string;
  email?: string;
  subjects?: Subject[];
}

export interface Subject {
  id: number;
  name: string;
  credits: number;
  teachers?: Teacher[];
  teacher?: Teacher; // Keep for backward compatibility
}

export interface Student {
  id: number;
  name: string;
  email: string;
  subjects?: Subject[];
}

export interface StudentCreateDto {
  name: string;
  email: string;
}

export interface StudentUpdateDto {
  name: string;
  email: string;
}

export interface SharedSubjectsResponse {
  studentName: string;
  subjectName: string;
  sharedWith: string[];
}

export interface StudentWithSubjects {
  id: number;
  name: string;
  subjects: string[];
}

export interface SubjectCreateDto {
  name: string;
  credits: number;
  teacherId: number;
}

export interface SubjectUpdateDto {
  name: string;
  credits: number;
  teacherId: number;
} 