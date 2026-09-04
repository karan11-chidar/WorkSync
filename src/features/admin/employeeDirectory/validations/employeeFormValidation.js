/**
 * ============================================================================
 * EmployeeValidation.js
 * ============================================================================
 *
 * Responsibility:
 * ----------------------------------------------------------------------------
 * Validates employee data before submission.
 *
 * @param {Object} employeeData - The employee data to validate.
 * Contains the following fields:
 * {
 *   firstName: string,
 *   lastName: string,
 *   email: string,
 *   phone: string,
 *   department: string,
 *   jobRole: string,
 *   salary: number,
 *   employmentStatus: string,
 *   gender: string,
 *   performanceRating: number,
 *   address: string,
 *   privateNotes: string
 * }
 * 
 * @returns {Object} - An object containing validation errors and a boolean indicating if the data is valid.
 * returns an object with the following structure:
 * {
 *   errors: {
 *     firstName: "",
 *     lastName: "",
 *     email: "",
 *     password: "",
 *     phone: "",
 *     department: "",
 *     jobRole: "",
 *     salary: "",
 *     employmentStatus: "",
 *     gender: "",
 *     performanceRating: "",
 *     address: "",
 *     privateNotes: ""
 *   },
 *   isValid: boolean
 * }
 *
 * Features:
 * ----------------------------------------------------------------------------
 * 1. Validates required fields (first name, last name, email, phone, department, job role, salary, employment
 * status, gender, performance rating, address, private notes).
 * 2. Checks for valid email format.
 * 3. Ensures phone number is a valid 10-digit number or a valid +91 number.
 * 4. Validates salary as a number.
 * 5. Validates performance rating to be between 1 and 5.
 * 6. Validates required fields including password.
 * 
 * Workflow:
 * ----------------------------------------------------------------------------
 * 1. Receives employee data as input.
 * 2. Initializes an errors object with empty strings for each field.
 * 3. Performs validation checks for each field and populates the errors object with appropriate messages.
 * 4. Determines if the data is valid by checking if all error messages are empty.
 * 5. Returns an object containing the errors and a boolean indicating if the data is valid.
 * 
 * Does NOT Handle:
 * ----------------------------------------------------------------------------
 * ✗ Firebase Operations
 * ✗ Business Logic
 * ✗ Toast Notifications
 * ✗ Global State Management
 *
 * Dependencies:
 * ----------------------------------------------------------------------------
 * ✗ None
 *
 * ============================================================================
 */

const employeeValidation = ({
  firstName,
  lastName,
  email,
  phone,
  department,
  jobRole,
  salary,
  employmentStatus,
  gender,
  performanceRating,
  address,
  privateNotes,
  password,
}) => {

  const errors = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phone: "",
    department: "",
    jobRole: "",
    salary: "",
    employmentStatus: "",
    gender: "",
    performanceRating: "",
    address: "",
    privateNotes: "",
  };
  // Validation logic for each field
  
  // Validate first name and last name
  errors.firstName = firstName.trim() === "" ? "First name is required" : "";
  errors.lastName = lastName.trim() === "" ? "Last name is required" : "";

  // Validate email
  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  errors.email =
    email.trim() === "" || !isEmailValid
      ? "Email is required and must be a valid email address"
      : "";
  
  // Validate phone number
  const phoneDigits = (phone || "").replace(/\D/g, "");
  const isPhoneValid =
    phoneDigits.length === 10 ||
    (phoneDigits.length === 12 && phoneDigits.startsWith("91"));
  errors.phone =
    phone.trim() === "" || !isPhoneValid
      ? "Phone number is required and must be a valid 10-digit number or a valid +91 number"
      : "";
  
  // Validate password
errors.password =
  password.trim() === ""
    ? "Password is required"
    : password.length < 6
      ? "Password must be at least 6 characters"
      : "";
  // Validate department
  errors.department = department.trim() === "" ? "Department is required" : "";

  // Validate job role
  errors.jobRole = jobRole.trim() === "" ? "Job role is required" : "";

  // Validate salary
  errors.salary =
    salary === "" || isNaN(Number(salary)) || Number(salary) <= 0
      ? "Salary must be greater than zero."
      : "";
  
  // Validate employment status
  errors.employmentStatus =
    employmentStatus.trim() === "" ? "Employment status is required" : "";
  
  // Validate gender
  errors.gender = gender.trim() === "" ? "Gender is required" : "";

  // Validate performance rating
  errors.performanceRating =
    performanceRating === "" ||
    isNaN(Number(performanceRating)) ||
    Number(performanceRating) < 1 ||
    Number(performanceRating) > 5
      ? "Performance rating must be a number between 1 and 5"
      : "";
  
  // Validate address and private notes
  errors.address = address.trim() === "" ? "Address is required" : "";
  errors.privateNotes =
    privateNotes.trim() === "" ? "Private notes are required" : "";

  // Determine if the data is valid by checking if all error messages are empty
  const isValid = Object.values(errors).every((error) => error === "");
  return { errors, isValid };
};

export default employeeValidation;
