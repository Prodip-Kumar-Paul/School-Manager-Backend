const validateType = (type: string) => {
  const types = ['ASSISTANT_TEACHER', 'SENIOR_TEACHER'];
  if (!types.includes(type)) {
    return false;
  } else {
    return true;
  }
};

export default validateType;
