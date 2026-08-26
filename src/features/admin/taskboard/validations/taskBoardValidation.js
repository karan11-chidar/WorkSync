/**
 * Validates the editable fields used when creating or updating a task.
 *
 * Each field is required. Text fields are considered valid when they contain
 * non-whitespace characters, while the remaining fields are considered valid
 * when they contain a truthy value.
 *
 * @param {Object} taskData Task form data to validate.
 * @param {string} taskData.taskTitle Task title.
 * @param {string|number} taskData.assignEmployee Employee assigned to the task.
 * @param {string} taskData.priority Task priority.
 * @param {string} taskData.dueDate Task due date.
 * @param {string|number} taskData.estimateHour Estimated task duration.
 * @param {string} taskData.status Current task status.
 * @param {string} taskData.workingProject Project associated with the task.
 * @param {string} taskData.description Task description.
 * @returns {{errors: Object, isValid: boolean}} Validation messages and an
 *   overall validity flag.
 */
const formValidation = ({
  taskTitle,
  assignEmployee,
  priority,
  dueDate,
  estimateHour,
  status,
  workingProject,
  description,
}) => {
  const errors = {
    taskTitle: taskTitle.trim() ? "" : "Task title is required.",
    assignEmployee: assignEmployee ? "" : "Please assign an employee.",
    priority: priority ? "" : "Please select a priority.",
    dueDate: dueDate ? "" : "Please select a due date.",
    estimateHour: estimateHour ? "" : "Please enter an estimate.",
    status: status ? "" : "Please select a status.",
    workingProject: workingProject.trim() ? "" : "Project is required.",
    description: description.trim() ? "" : "Description is required.",
  };
  const isValid = Object.values(errors).every((error) => error === "");
  return { errors, isValid };
};

export default formValidation;
