const users = Array(10)
  .fill(0)
  .map((item, index) => ({
    email: `${index}@gmail.com`,
    password: `${index}`,
    name: `User ${index}`,
    type: 'ASSISTANT_TEACHER',
    schoolId: 'cff52cf7-d67d-4535-bb85-ad21a87e30b7',
  }));

export default users;
