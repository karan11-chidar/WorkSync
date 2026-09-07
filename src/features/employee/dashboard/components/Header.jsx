/**
 * ============================================================================
 * Header.jsx
 * ============================================================================
 *
 * Employee Dashboard Header Component
 *
 * Responsibility:
 * ============================================================================
 * Provides the primary header/navigation bar for the employee dashboard.
 * Displays personalized greeting, helpful instructions, and employee
 * identification. Serves as the top-level orientation component for
 * dashboard users and provides context about available dashboard features.
 *
 * Features:
 * ============================================================================
 * - Responsive personalized greeting message
 * - Contextual help text describing dashboard features
 * - Employee ID badge with monospace styling
 * - Mobile-responsive layout with breakpoint-specific visibility
 * - Flexible spacing and typography scaling
 * - Professional card styling with border and shadow
 * - Accessibility-friendly semantic HTML structure
 *
 * Layout Sections:
 * ============================================================================
 * 1. Left Section: Greeting & Description
 *    - Main greeting: "Welcome back, [Name]! 👋"
 *    - Subtext: Feature navigation instructions (hidden on small screens)
 *    - Responsive typography with lg/md/sm breakpoints
 *
 * 2. Right Section: Employee ID Badge
 *    - Employee ID display in monospace font
 *    - Indigo theme with border and background
 *    - Responsive padding and text sizing
 *    - Non-wrapping layout for consistency
 *
 * Data Integration:
 * ============================================================================
 * - Consumes employeeData from DashboardContext
 * - Displays employee identification information
 * - Relies on parent context for dynamic greeting personalization
 * - No props required - uses React Context API
 *
 * Responsive Design:
 * ============================================================================
 * - Mobile (< 640px):
 *   - Stacked layout (flex-col)
 *   - Hidden help text (hidden lg:block)
 *   - Reduced padding and text sizes
 *   - Single column alignment
 *
 * - Tablet (640px - 1024px):
 *   - Flex row layout (md:flex-row)
 *   - Text adjustments (md:text-sm, md:text-2xl)
 *   - Increased spacing (md:items-center)
 *
 * - Desktop (1024px+):
 *   - Full horizontal layout
 *   - Visible help text
 *   - Maximum padding (lg:p-6)
 *   - Larger typography (lg:text-xl)
 *
 * Styling:
 * ============================================================================
 * - Container: White background with rounded corners (rounded-2xl)
 * - Border: Subtle slate border (border-slate-100)
 * - Shadow: Minimal shadow for depth (shadow-xs)
 * - Typography: Bold sans-serif for greeting
 * - Color Scheme:
 *   - Text: slate-900 (heading), slate-500 (description)
 *   - Badge: indigo theme (indigo-50 bg, indigo-900 text, indigo-100 border)
 *
 * Accessibility:
 * ============================================================================
 * - Semantic HTML: <h2> for main greeting
 * - <p> for descriptive text
 * - Proper contrast ratios for readability
 * - Responsive text sizing maintains legibility
 * - Font weight and tracking improve clarity
 *
 * Performance:
 * ============================================================================
 * - Stateless component (no hooks)
 * - Uses Context API efficiently (single value extraction)
 * - Minimal re-renders (only on context changes)
 * - No expensive computations
 * - CSS classes are static and optimized
 *
 * Dependencies:
 * ============================================================================
 * - React: Component framework
 * - DashboardContext: Provides employeeData from parent
 * - Tailwind CSS: Responsive utility styling
 *
 * Future Enhancements:
 * ============================================================================
 * - Dynamic greeting with employee name injection
 * - Time-based greeting variants (Good morning/afternoon/evening)
 * - Quick action buttons in header
 * - Status indicator (logged in, clocked in, etc.)
 * - Notification badges
 * - Dark mode support
 *
 * ============================================================================
 */

import { useDashboardContext } from "../contexts/DashboardContext";

/**
 * Header
 *
 * The primary header component for the employee dashboard. Displays a
 * personalized greeting, helpful instructions about dashboard features,
 * and the employee's identification information.
 *
 * Component Architecture:
 * -----------------------
 * Composition: Simple presentational component with two main sections
 * - Left: Greeting and descriptive text
 * - Right: Employee ID badge
 *
 * Data Flow:
 * -----------
 * Retrieves employeeData from DashboardContext hook
 * employeeData → Used to personalize greeting (currently hardcoded placeholder)
 *
 * Layout Behavior:
 * -----------------
 * - Mobile: Vertical stack layout
 * - Tablet+: Horizontal flex layout with space-between
 * - All sizes: Proper alignment and spacing adjustments
 *
 * Responsive Breakpoints:
 * ----------------------
 * - sm: (640px) - Text size adjustments
 * - md: (768px) - Layout and flex direction changes
 * - lg: (1024px) - Full horizontal layout, help text visible
 *
 * Props:
 * ------
 * None - Component uses context directly
 *
 * Context Dependencies:
 * ----------------------
 * - DashboardContext.employeeData: Employee profile information
 *   Required fields for future implementation:
 *   - name: Employee's full name for personalized greeting
 *   - employeeId: Unique identifier (e.g., "EMP-12345")
 *
 * State:
 * ------
 * None - Stateless functional component
 *
 * Integration Points:
 * --------------------
 * - Parent: EmployeeDashboard component
 * - Context: DashboardContext (useDashboardContext hook)
 * - Sibling: Other dashboard sections (attendance, tasks, team)
 *
 * Customization:
 * ----------------
 * - Greeting Message: Update text in <h2> tag
 * - Help Text: Modify <p> tag content or add FAQ link
 * - Employee ID Format: Change display format in badge
 * - Colors: Modify indigo-* and slate-* Tailwind classes
 * - Spacing: Adjust p-*, px-*, py-*, gap-* values
 *
 * @component
 * @returns {React.ReactElement} Header component with greeting and employee ID
 *
 * @example
 * // Usage in EmployeeDashboard
 * <Header />
 *
 * @example
 * // With context provider
 * <DashboardProvider>
 *   <Header />
 * </DashboardProvider>
 */
function Header() {
  const { employeeData } = useDashboardContext();

  return (
    // =========================================================================
    // HEADER CONTAINER
    // =========================================================================
    // Main header card with responsive layout and styling
    // - bg-white: Clean white background
    // - rounded-2xl: Modern rounded corners
    // - border border-slate-100: Subtle separator line
    // - shadow-xs: Minimal depth effect
    // - flex flex-col md:flex-row: Vertical on mobile, horizontal on tablet+
    // - justify-between items-center: Space distribution and alignment
    // - gap-2 lg:gap-4: Responsive spacing between sections
    // =========================================================================
    <div className="bg-white p-4 lg:p-6 rounded-2xl border border-slate-100 shadow-xs flex flex-col md:flex-row justify-between items-start md:items-center gap-2 lg:gap-4">
      {/* ==================================================================== */}
      {/* LEFT SECTION: Greeting & Description                                */}
      {/* ==================================================================== */}
      {/* Personalized welcome message and contextual help text               */}
      {/* Responsive text sizing and visibility:                             */}
      {/* - Main greeting scales from 1rem (mobile) to 1.25rem (desktop)      */}
      {/* - Help text hidden on mobile/tablet, visible on desktop (lg:block)  */}
      {/* ==================================================================== */}
      <div>
        {/* Main Greeting Message */}
        {/* Typography: Bold, dark color, tight letter spacing                */}
        {/* Responsive sizes: sm=1rem, md=2xl, lg=xl with careful prioritization */}
        <h2 className="text-[1rem] lg:text-xl md:text-2xl font-bold text-slate-900 tracking-tight">
          Welcome back,{`${employeeData?.firstName} ${employeeData?.lastName} `}
          ! 👋
        </h2>

        {/* Help Text: Dashboard Feature Description */}
        {/* Hidden on mobile and tablet (hidden lg:block)                     */}
        {/* Provides context about available features to new users            */}
        {/* Subtle gray color (text-slate-500) to maintain visual hierarchy   */}
        <p className="text-xs md:text-sm text-slate-500 mt-1 hidden lg:block">
          Select any hub page below to clock-in, track your month attendance,
          file a time-off or manage assignments.
        </p>
      </div>

      {/* ==================================================================== */}
      {/* RIGHT SECTION: Employee ID Badge                                    */}
      {/* ==================================================================== */}
      {/* Displays unique employee identifier in monospace font               */}
      {/* Indigo color theme: bg-indigo-50, text-indigo-900, border-indigo   */}
      {/* text-nowrap: Prevents ID from wrapping to multiple lines           */}
      {/* Responsive padding and text sizing for all screen sizes            */}
      {/* ==================================================================== */}
      <div className="flex items-center text-nowrap bg-indigo-50 border border-indigo-100 rounded-xl px-2 py-2 lg:px-4 lg:py-2.5 text-indigo-900 text-[0.625rem] lg:text-xs font-bold font-mono">
        Employee ID: {`${employeeData?.employeeId}` || ""}
      </div>
    </div>
  );
}

// ============================================================================
// COMPONENT EXPORT
// ============================================================================
// Export Header as default export for use in dashboard layouts
// Default export pattern allows for lazy loading and code splitting
// Can be imported as: import Header from './Header'
// ============================================================================
export default Header;
