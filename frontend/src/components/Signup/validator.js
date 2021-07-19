export const validateUserName = (username) => {
  if (username.length < 1) {
    return "Invalid Username!";
  }
  return null;
};

export const validateEmail = (mail) => {
  let ml = mail.length;
  if (ml < 3) {
    return "Email must be atleast 3 characters long..";
  }
  let flag = -1,
    flag2 = 0;
  for (let i = 1; i < ml - 1; i++) {
    if (mail[i] === "@" && flag !== -1) {
      return "Invalid Email";
    }
    if ((mail[i] === "." && mail[i - 1] === ".") || mail[i] === " ") {
      return "Invalid Email";
    }
    if (mail[i] === "@") {
      flag = i;
    }
  }
  if (
    mail[0] === "." ||
    mail[ml - 1] === "." ||
    flag === 0 ||
    (mail[ml - 1] === "." && mail[ml - 2] === ".")
  ) {
    return "Invalid Email";
  }
  for (let i = flag; i < ml; i++) {
    if (mail[i] === ".") {
      flag2 = 1;
    }
  }
  if (flag2 === 0) {
    return "Invalid Email";
  }
  return null;
};

export const validatePassword = (password) => {
  let pl = password.length;
  if (pl < 8) {
    return "Password must be atleast 8 characters long..";
  }
  let lower = 0,
    upper = 0,
    number = 0,
    specialChar = 0;
  for (let i = 0; i < pl; i++) {
    if (password[i] >= "a" && password[i] <= "z") {
      lower++;
    }
    if (password[i] >= "A" && password[i] <= "Z") {
      upper++;
    }
    if (password[i] >= 0 && password[i] <= 9) {
      number++;
    }
    if (
      password[i] === "!" ||
      password[i] === "~" ||
      password[i] === "@" ||
      password[i] === "#" ||
      password[i] === "$" ||
      password[i] === "%" ||
      password[i] === "^" ||
      password[i] === "&" ||
      password[i] === "*" ||
      password[i] === "(" ||
      password[i] === ")" ||
      password[i] === "?" ||
      password[i] === "<" ||
      password[i] === ">"
    ) {
      specialChar++;
    }
  }
  if (lower === 0) {
    return "Password must contain atleast one lowercase character..";
  }
  if (upper === 0) {
    return "Password must contain atleast one uppercase character..";
  }
  if (number === 0) {
    return "Password must contain atleast one numerical character..";
  }
  if (specialChar === 0) {
    return "Password must contain atleast one special character..";
  }
  return null;
};
