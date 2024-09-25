const validateEmail = (value) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!value) {
    return "Email is required";
  } else if (!emailRegex.test(value)) {
    return "Invalid email format";
  }
  return true;
};

export { validateEmail };
