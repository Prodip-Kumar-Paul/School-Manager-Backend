const schools = Array(10)
  .fill(0)
  .map((item, index) => ({
    email: `${index}@gmail.com`,
    name: `School ${index}`,
    address: `Address ${index}`,
    phone: `Phone ${index}`,
  }));

export default schools;
