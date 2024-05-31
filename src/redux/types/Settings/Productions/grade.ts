export interface GradeRequest extends Record<string, number | string> {
  gradeId: number;
  name: string;
}
