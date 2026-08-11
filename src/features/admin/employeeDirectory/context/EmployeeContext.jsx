/**
 * Employee Directory Context
 *
 * Purpose:
 * Provides a centralized React context for the admin Employee Directory feature.
 * The context should expose the current employee list and actions (fetch/update/get),
 * while the Provider (implemented elsewhere) contains the actual logic and side-effects.
 *
 * Exports:
 * - `employeeContext` (React.Context): the raw context object.
 * - `useEmployees()` (hook): safe accessor that throws if used outside a Provider.
 *
 * Context value shape (recommended):
 * @typedef {Object} Employee
 * @property {string} id - Unique employee identifier
 * @property {string} firstName
 * @property {string} lastName
 * @property {string} email
 * @property {string} department
 *
 * @typedef {Object} EmployeesContextValue
 * @property {Employee[]} employees - Current list of employees
 * @property {(query?: string) => Promise<void>} fetchEmployees - Fetch employees (optional query)
 * @property {(id: string) => Employee|undefined} getEmployeeById - Get employee by id
 * @property {(employee: Partial<Employee>) => Promise<void>} updateEmployee - Update an employee
 *
 * Usage example:
 * ```js
 * import { useEmployees } from '.../EmployeeContext';
 * const { employees, fetchEmployees } = useEmployees();
 * useEffect(() => { fetchEmployees(); }, []);
 * ```
 *
 * Notes:
 * - Keep the context value serializable where possible.
 * - Implement provider logic in an `EmployeeProvider` component (not included here).
 */

import { createContext, useContext } from "react";

export const EmployeeContext = createContext(/** @type {EmployeesContextValue | null} */ (null));
EmployeeContext.displayName = "employeeContext";

/**
 * Hook: useEmployees
 * Returns the `EmployeesContextValue` provided by an `employeeContext.Provider`.
 * @returns {EmployeesContextValue}
 * @throws {Error} if no Provider is found in the component tree
 */
export function useEmployee() {
    const ctx = useContext(EmployeeContext);
    if (ctx === null) {
        throw new Error("useEmployees must be used within an employeeContext.Provider");
    }
    return ctx;
}