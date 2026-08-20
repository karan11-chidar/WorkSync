import { createContext, useContext } from "react";

/**
 * Shared state container for the admin task board feature.
 *
 * The matching provider owns the task board state and actions. Consumers
 * should access that value through `useTaskBoard` instead of reading the
 * context directly. The context intentionally has no fallback value so an
 * incorrectly configured provider hierarchy is visible during development.
 */
export const TaskBoardContext = createContext();

TaskBoardContext.displayName = "TaskBoardContext";

/**
 * Reads the task board context for the nearest provider in the React tree.
 *
 * @returns {*} The task board state and actions supplied by the provider.
 * @example
 * const { tasks, moveTask } = useTaskBoard();
 */
export const useTaskBoard = () => {
    return useContext(TaskBoardContext);
}