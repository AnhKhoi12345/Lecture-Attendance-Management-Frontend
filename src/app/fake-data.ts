import { CoursesList } from './interfaces/coursesList';
import { Classes } from './interfaces/classesList';
export const fakeCourses: CoursesList[] = [
  {
    id: 1,
    name: 'Business Administration (M5)',
    semester: 'Winter 2020',
    lecturer: 'Pham Quoc Hung',
    active: false,
  },
  {
    id: 2,
    name: 'English 1 (M6)',
    semester: 'Winter 2020',
    lecturer: 'Truong Tuan Anh',
    active: false,
  },
  {
    id: 3,
    name: 'Introduction to Computer Science (M3)',
    semester: 'Winter 2020',
    lecturer: 'Huỳnh Trung Hiếu',
    active: false,
  },
  {
    id: 4,
    name: 'Algorithms and Data Structures (M9)',
    semester: 'Summer 2021',
    lecturer: 'Nguyen Tuan Duc',
    active: true,
  },
];
export const fakeClass: Classes[] = [
  {
    module_id: 1,
    class_date: '25-12-2021',
    start_time: '9AM',
    end_time: '12AM',
  },
  {
    module_id: 2,
    class_date: '25-12-2021',
    start_time: '9AM',
    end_time: '12AM',
  },
  {
    module_id: 3,
    class_date: '25-12-2021',
    start_time: '9AM',
    end_time: '12AM',
  },
  {
    module_id: 4,
    class_date: '12-1-2022',
    start_time: '9AM',
    end_time: '12AM',
  },
  {
    module_id: 4,
    class_date: '19-1-2022',
    start_time: '9AM',
    end_time: '12AM',
  },
];
