import Lecture from './lecture.model';

export default interface Grade {
  name: string;
  schoolId: string;
  lectures: Lecture[];
}
