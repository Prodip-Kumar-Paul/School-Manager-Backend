const users = Array(10)
  .fill(0)
  .map((item, index) => ({
    email: `${index}@gmail.com`,
    password: `${index}`,
    name: `User ${index}`,
    type: 'ASSISTANT_TEACHER',
    schoolId: 'ea13d4aa-642b-4783-a085-d27582bfe29d',
    teacherId: `T-${index}`,
    phone: `${index}`,
    description: `${index}`,
  }));

export default users;
