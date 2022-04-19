/**
 * @description: This function is used to get a 6 digit otp
 */

const getOtp = () => {
  const otp = Math.floor(100000 + Math.random() * 900000);
  return otp;
};

export default getOtp;
