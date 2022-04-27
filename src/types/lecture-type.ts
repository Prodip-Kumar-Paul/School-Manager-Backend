export default interface Lecture {
  id: string;
  subject: string;
  day: string;
  schoolId: string;
  teacherId: string;
  classId: string;
  startTime: Date;
  endTime: Date;
  createdAt: Date;
  updatedAt: Date;
}
