const verifyOTP = (givenOtp: string, requiredOtp: string, otpExpiry: Date) => {
  const currentDate = new Date();
  const isOtpExpired = currentDate > otpExpiry;
  const isOtpValid = givenOtp === requiredOtp;

  if (isOtpExpired) {
    return {
      isValid: false,
      message: 'OTP expired',
    };
  }

  if (!isOtpValid) {
    return {
      isValid: false,
      message: 'OTP is invalid',
    };
  }

  return {
    isValid: true,
    message: 'OTP is valid',
  };
};

export default verifyOTP;
