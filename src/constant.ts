export const successMess = {
  success: "Successful",
  login: "Logged in successfully",
  Logout: "Logged out successful",
  created: "Created successfully",
};

export const statusCodes = {
  successCode: 200,
  createdCode: 201,
  badRequestCode: 400,
  unauthorizedCode: 401,
  notFoundCode: 404,
  serverErrorCode: 500,
};

export const errorMess = {
  loginError: "invalid Email or Password",
  passError: 'Password cannot contain "password"',
  invalidEmail: "Invalid Email",
  ageError: "Age must be positive",
  badRequest: "Invalid request",
  serverError: "There is an internal server error.",
  unauthorized: "Access denied",
  notFound: (value: string) => `${value} Not found, Please try again.`,
  invalidUpdate: (value: string[]) =>
    !`${value}`
      ? `All fields are correct`
      : `( ' ${value} ' ) are invalid fields`,
};

export const constants = {
  task: "Task",
  user: "User",
};
