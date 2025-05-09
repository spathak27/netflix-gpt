export const checkValid = (email, password) => {
  const emailValid = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email);
  const passwordValid =
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(password);

  if (!emailValid) return "Email id is not valid";
  if (!passwordValid) return "Password is not valid!";

  return null;
};
