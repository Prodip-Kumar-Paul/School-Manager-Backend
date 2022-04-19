/**
 * @description: This function is used to get a 6 digit otp and a expiry time for the otp
 */

const getOtp = () => {
  const otp = Math.floor(100000 + Math.random() * 900000);
  const dateInstance = new Date();
  dateInstance.setMinutes(dateInstance.getMinutes() + 10);

  return { otp: otp.toString(), otpExpiry: dateInstance };
};

export default getOtp;
