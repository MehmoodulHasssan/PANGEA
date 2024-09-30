export function isEmail(value) {
  return value.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/);
}

export function isNotEmpty(value) {
  return value.trim() !== '';
}
export function optionalInput(value) {
  return true;
}

// export function canBeEmpty(value) {
//   return true;
// }

export function isBirthDateValid(value) {
  if (value.trim() === '') return true;
  return value.match(/^\d{4}-\d{2}-\d{2}$/);
}

export function isPasswordValid(value) {
  return value.trim().length >= 8;
  // return value.match(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}$/);
}

// const isEmailInvalid = isEdited.email && (!enteredValue.email || !enteredValue.email.includes('@'))
// const isPasswordInvalid = isEdited.password && !enteredValue.password.match(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}$/)

export function hasMinLength(value, minLength) {
  return value.length >= minLength;
}

export function isEqualsToOtherValue(value, otherValue) {
  return value === otherValue;
}
