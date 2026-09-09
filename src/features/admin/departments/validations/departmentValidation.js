/**
 * Validates department form input and returns field-level errors.
 *
 * @param {Object} formData - Department values to validate.
 * @returns {{isValid: boolean, formError: Object}} Validation result and errors.
 */
export const departmentFormValidation = (formData) => {
  const formError = {
    departmentName: "",
    location: "",
    budget: "",
    manager: "",
    description: "",
    themeColor: "",
  };
  formError.departmentName =
    formData.departmentName.trim() === "" ? "❌ Fill Department Name." : "";
  formError.budget =
    Number(formData.budget) > 0 ? "" : "❌ Fill Positive Value";
  formError.description =
    formData.description.trim() === ""
      ? "❌ Fill Description On Department Data"
      : "";
  formError.location =
    formData.location.trim() === "" ? "❌ Fill Department Location" : "";
  formError.themeColor =
    formData.themeColor.trim() === "" ? "❌ Fill Theme Color" : "";
  const isValid =
    formError.departmentName === "" &&
    formError.description === "" &&
    formError.location === "" &&
    formError.budget === "" &&
    formError.themeColor === ""
      ? true
      : false;
  return { isValid, formError };
};
