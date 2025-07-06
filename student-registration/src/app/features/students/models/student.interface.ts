export interface Student {
    id?: number;
    name: string;
    email: string;
    subjects?: Subject[];
}

export interface Subject {
    id: number;
    name: string;
    credits: number;
    teacher: Teacher;
}

export interface Teacher {
    id: number;
    name: string;
    subjects: Subject[];
}

export interface StudentWithSubjects {
    studentId: number;
    subjectId: number;
}

export interface SharedSubjectsResponse {
    subjectId: number;
    subjectName: string;
    classmates: string[];
} 