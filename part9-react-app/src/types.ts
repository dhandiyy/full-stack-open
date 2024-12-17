interface CourseBase {
    name: string;
    exerciseCount: number;
}

interface CoursePartBasic extends CourseBase {
    description: string;
    kind: "basic";
}

interface CoursePartGroup extends CourseBase {
    groupProjectCount: number;
    kind: "group";
}

interface CoursePartBackground extends CourseBase {
    description: string;
    backgroundMaterial: string;
    kind: "background";
}

export interface Note {
    id: string;
    content: string;
}
export type NewNote = Omit<Note, 'id'>

export type CoursePart = CoursePartBasic | CoursePartGroup | CoursePartBackground;
