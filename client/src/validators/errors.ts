export function requiredField(name: string) {
  return `${name.charAt(0).toUpperCase()}${name.slice(1)} is required`;
}

export function invalidFormat(name: string) {
  return `Invalid ${name} format`;
}

export function passwordTooShort(min: number) {
  return `Password must be at least ${min} chars`;
}

export function passwordTooLong(min: number) {
  return `Password must be less than ${min + 1} chars`;
}

export function passwordTooWeak() {
  return "Password too weak (1 lowercase, 1 uppercase, 1 number, 1 special char)";
}

export function doNotMatch(name: string) {
  return `${name.charAt(0).toUpperCase()}${name.slice(1)} do not match`;
}
