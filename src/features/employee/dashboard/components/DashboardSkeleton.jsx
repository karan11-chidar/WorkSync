/**
 * ============================================================================
 * DashboardSkeleton.jsx
 * ============================================================================
 *
 * Employee Dashboard Loading Skeleton Component
 *
 * Responsibility:
 * ============================================================================
 * Provides a premium skeleton loader for the employee dashboard. Displays
 * beautiful placeholder UI that matches the actual dashboard layout while
 * employee data is being fetched from Firestore. Enhances user experience
 * with visual feedback during data loading and prevents layout shift.
 *
 * Features:
 * ============================================================================
 * - Responsive 3-column layout matching dashboard structure
 * - Two-column left section (attendance + tasks)
 * - One-column right section (team members)
 * - Premium shimmer animation overlay on all sections
 * - Mobile-responsive design with breakpoints
 * - Accessibility support with ARIA labels
 * - GPU-accelerated smooth animations
 * - Visual hierarchy with varied skeleton widths and heights
 * - Matches actual dashboard component styles
 * - No external animation libraries required
 *
 * Layout Structure:
 * ============================================================================
 * Desktop (lg: breakpoint):
 * ┌─────────────────────────────────┬──────────────┐
 * │                                 │              │
 * │  Left Column (lg:col-span-2)    │   Right      │
 * │  ├─ Attendance Card Skeleton     │   Column     │
 * │  └─ Task List Skeleton           │   (Team)     │
 * │                                 │              │
 * └─────────────────────────────────┴──────────────┘
 *
 * Mobile (< lg): Full width, single column stacked
 *
 * Dashboard Sections Replicated:
 * ============================================================================
 * 1. Attendance & Clock Card (Top Left)
 *    - Header with title and date pill
 *    - Status box with clock-in info
 *    - Time/break information
 *    - Action buttons (clock-in/out, break)
 *
 * 2. Task Checklist (Bottom Left)
 *    - Header with title and count badge
 *    - Repeating task items (3 placeholders)
 *    - Task title and metadata
 *    - Status/priority indicator
 *
 * 3. Team Members Sidebar (Right)
 *    - Header with title
 *    - Repeating team member cards (5 placeholders)
 *    - Member avatar placeholder
 *    - Member name and role
 *    - Action icons placeholder
 *
 * Animation System:
 * ============================================================================
 * - Shimmer Overlay: Horizontal gradient sweep effect
 * - Duration: 1.6 seconds per complete cycle
 * - Direction: Left (-100%) to right (100%)
 * - Effect: Creates depth perception during loading
 * - GPU-accelerated with CSS transforms
 * - Applied to all major skeleton sections
 *
 * Color Scheme:
 * ============================================================================
 * - Primary backgrounds: slate-200 (various opacities)
 * - Accent colors:
 *   - Attendance card: amber-100/70 (for status icon)
 *   - Clock button: emerald-200/60 (for primary action)
 *   - Sidebar: slate tones with subtle variations
 * - Border colors: slate-100 to slate-200 (with opacity)
 * - Shimmer gradient: slate-200/60 with transparency
 *
 * Accessibility Features:
 * ============================================================================
 * - role="status" on main container
 * - aria-label="Loading dashboard" for screen readers
 * - pointer-events-none on shimmer to prevent interaction
 * - Proper semantic HTML structure
 * - Meaningful height and width proportions for skeletons
 *
 * Performance Optimization:
 * ============================================================================
 * - CSS animations are GPU-accelerated (transform property)
 * - No JavaScript calculations during animation
 * - Efficient DOM structure with minimal nodes
 * - Static inline styles for CSS keyframes
 * - Minimal re-renders (stateless component)
 * - Smooth 60fps animation performance
 *
 * Responsive Behavior:
 * ============================================================================
 * - lg: (1024px+): 3-column layout (2+1 split)
 * - md: (768px+): Hidden elements toggle (sm: prefixes)
 * - sm: (640px+): Adjusted padding and spacing
 * - <640px: Single column full-width layout
 * - Gap: 6px on desktop, reduces on smaller screens
 *
 * Usage Context:
 * ============================================================================
 * - Used by EmployeeDashboard component during initial load
 * - Displayed while fetching employee profile and dashboard data
 * - Replaced with actual content when data loading completes
 * - Provides visual continuity during data fetch
 *
 * Dependencies:
 * ============================================================================
 * - React: Component framework
 * - Tailwind CSS: Responsive utility styling (3.x)
 * - Modern CSS: Grid, Flexbox, Gradients, Transforms
 *
 * ============================================================================
 */

import React from "react";

/**
 * ============================================================================
 * ShimmerOverlay
 * ============================================================================
 *
 * Sub-component for Animated Shimmer Loading Effect
 *
 * Responsibility:
 * ============================================================================
 * Renders an animated shimmer overlay that creates a horizontal sweep effect
 * across skeleton elements. Provides premium visual feedback during loading
 * by simulating a light wave passing across the placeholder content.
 *
 * Visual Effect:
 * ============================================================================
 * - Creates horizontal gradient animation
 * - Linear gradient: transparent → light gray → transparent
 * - Sweeps from left to right continuously
 * - Duration: 1.6 seconds per complete cycle
 * - Smooth, infinite loop
 *
 * Technical Implementation:
 * ============================================================================
 * - Absolute positioning fills parent container
 * - overflow-hidden clips animation to parent boundaries
 * - rounded-[inherit] inherits parent's border radius for smooth edges
 * - -translate-x-full starts animation at -100% (off-screen left)
 * - animate-[shimmer_1.6s_infinite] applies animation via Tailwind class
 * - pointer-events-none prevents interaction with overlay
 * - GPU-accelerated using CSS transform property
 *
 * Positioning:
 * ============================================================================
 * - Positioned absolutely within parent skeleton container
 * - Covers entire parent area with inset-0
 * - Z-index automatically stacks on top (absolute positioning)
 * - Clips overflow to parent's border radius
 *
 * Performance:
 * ============================================================================
 * - Uses CSS transforms (GPU-accelerated)
 * - No JavaScript calculations
 * - No re-renders during animation
 * - Smooth 60fps animation performance
 * - Minimal memory overhead
 *
 * Browser Compatibility:
 * ============================================================================
 * - All modern browsers with CSS Transforms support
 * - CSS Gradients (linear-gradient)
 * - Tailwind CSS 3.x or higher
 * - No polyfills required
 *
 * Integration:
 * ============================================================================
 * - Used within skeleton container divs
 * - Applied to all major sections (cards, list items)
 * - Creates consistent visual feedback across dashboard
 * - Works with any background color or shape
 *
 * @component
 * @returns {React.ReactElement} Shimmer overlay div element
 *
 * @internal
 * Used internally by DashboardSkeleton - not exported for external use
 *
 * @example
 * <ShimmerOverlay />
 */
function ShimmerOverlay() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-[inherit]">
      <div className="absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-slate-200/60 via-30% to-transparent animate-[shimmer_1.6s_infinite]" />
    </div>
  );
}

/**
 * DashboardSkeleton
 *
 * A responsive skeleton loader component that displays placeholder UI matching
 * the employee dashboard layout. Used to provide visual feedback while dashboard
 * data is being fetched from Firestore, preventing layout shift and improving
 * perceived performance.
 *
 * Component Design:
 * -----------------
 * - Replicates exact structure of employee dashboard
 * - Three main sections: attendance, tasks, and team members
 * - Responsive grid layout that adapts to screen sizes
 * - Premium shimmer animation for visual polish
 * - Matches actual component styling for seamless transition
 *
 * Layout Details:
 * ----------------
 * Left Column (2/3 width on desktop):
 *   - Attendance & Clock Card with time displays
 *   - Task Checklist with task item skeletons
 *
 * Right Column (1/3 width on desktop):
 *   - Team Members Sidebar with member cards
 *   - Each card includes avatar, name, role, and actions
 *
 * Animation:
 * -----------
 * - ShimmerOverlay component creates horizontal sweep effect
 * - Applied to all major skeleton containers
 * - Smooth, infinite animation at 1.6 seconds per cycle
 * - GPU-accelerated for smooth 60fps performance
 *
 * Props:
 * ------
 * None - Component is stateless and takes no props
 *
 * State:
 * ------
 * None - Component is purely presentational
 *
 * Customization:
 * ----------------
 * Adjust these values for different layouts:
 * - Gap: Change "gap-6" to "gap-4" or "gap-8" for tighter/wider spacing
 * - Colors: Modify bg-slate-*, bg-emerald-*, bg-amber-* classes
 * - Columns: Change "lg:col-span-2" to adjust left/right ratio
 * - Animation: Modify shimmer duration in @keyframes
 *
 * @component
 * @returns {React.ReactElement} Responsive dashboard skeleton UI
 *
 * @example
 * // Display during data loading
 * {isLoading ? (
 *   <DashboardSkeleton />
 * ) : (
 *   <EmployeeDashboard data={dashboardData} />
 * )}
 *
 * @example
 * // In a suspense fallback
 * <Suspense fallback={<DashboardSkeleton />}>
 *   <EmployeeDashboard />
 * </Suspense>
 */
export default function DashboardSkeleton() {
  return (
    <div
      className="grid grid-cols-1 lg:grid-cols-3 gap-6 w-full select-none"
      role="status"
      aria-label="Loading dashboard"
    >
      {/* ====================================================================== */}
      {/* LEFT COLUMN: Main Content Area (Attendance + Tasks)                    */}
      {/* ====================================================================== */}
      {/* Spans 2 columns on large screens, full width on smaller screens.       */}
      {/* Contains:                                                              */}
      {/* 1. Attendance & Clock Card - displays check-in status and time info   */}
      {/* 2. Task Checklist - shows pending tasks with priorities                */}
      {/* ====================================================================== */}
      <div className="lg:col-span-2 space-y-6">
        {/* ================================================================== */}
        {/* ATTENDANCE & CLOCK CARD SKELETON                                  */}
        {/* ================================================================== */}
        {/* Replicate of the main attendance tracking card component.          */}
        {/* Structure:                                                         */}
        {/* - Header: Icon + title + date pill (hidden on mobile)              */}
        {/* - Status Box: Avatar + check-in status + time information          */}
        {/* - Action Buttons: Clock-in/out and break buttons (2-column)        */}
        {/* ================================================================== */}
        <div className="relative overflow-hidden w-full bg-white rounded-3xl border border-slate-200/70 p-5 sm:p-6 shadow-xs space-y-5">
          <ShimmerOverlay />

          <div className="flex items-center justify-between gap-3 pb-2 border-b border-slate-100/60">
            <div className="flex items-center gap-2">
              <div className="h-5 w-5 bg-slate-200/80 rounded-full animate-pulse" />
              <div className="h-4 bg-slate-200/90 rounded-md w-44 animate-pulse" />
            </div>
            <div className="h-7 w-36 bg-slate-100 rounded-lg animate-pulse hidden sm:block" />
          </div>

          <div className="bg-slate-50/80 p-4 rounded-2xl border border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <div className="h-12 w-12 bg-amber-100/70 rounded-2xl shrink-0 animate-pulse" />
              <div className="space-y-2">
                <div className="h-3 bg-slate-200/70 rounded w-24 animate-pulse" />
                <div className="h-5 bg-slate-200/90 rounded-md w-36 sm:w-44 animate-pulse" />
              </div>
            </div>
            <div className="flex items-center gap-4 border-t sm:border-t-0 sm:border-l border-slate-200/60 pt-3 sm:pt-0 sm:pl-4">
              <div className="space-y-1.5">
                <div className="h-3 bg-slate-200/60 rounded w-16 animate-pulse" />
                <div className="h-3 bg-slate-200/60 rounded w-14 animate-pulse" />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            <div className="h-12 w-full bg-emerald-200/60 rounded-xl animate-pulse" />
            <div className="h-12 w-full bg-slate-200/80 rounded-xl animate-pulse" />
          </div>
        </div>

        {/* ================================================================== */}
        {/* TASK CHECKLIST SKELETON                                            */}
        {/* ================================================================== */}
        {/* Displays skeleton placeholders for task items.                      */}
        {/* Structure:                                                         */}
        {/* - Header: Icon + title + item count badge                          */}
        {/* - Task Items (3 placeholders):                                      */}
        {/*   - Task title                                                     */}
        {/*   - Task metadata (due date, priority)                             */}
        {/*   - Status badge                                                   */}
        {/* ================================================================== */}
        <div className="relative overflow-hidden w-full bg-white rounded-3xl border border-slate-200/70 p-5 sm:p-6 shadow-xs space-y-4">
          <ShimmerOverlay />

          <div className="flex items-center justify-between gap-3 pb-2 border-b border-slate-100/60">
            <div className="flex items-center gap-2">
              <div className="h-5 w-5 bg-slate-200/80 rounded-full animate-pulse" />
              <div className="h-4 bg-slate-200/90 rounded-md w-32 animate-pulse" />
            </div>
            <div className="h-4 w-20 bg-slate-200/60 rounded-md animate-pulse" />
          </div>

          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="p-4 rounded-2xl border border-slate-100/80 bg-slate-50/50 flex items-center justify-between gap-4"
            >
              <div className="space-y-2 flex-1">
                <div className="h-4 bg-slate-200/90 rounded-md w-3/4 animate-pulse" />
                <div className="flex items-center gap-2">
                  <div className="h-3 bg-slate-200/60 rounded w-20 animate-pulse" />
                  <div className="h-3 bg-red-100/80 rounded w-16 animate-pulse" />
                </div>
              </div>
              <div className="h-6 w-20 bg-slate-200/70 rounded-lg animate-pulse shrink-0" />
            </div>
          ))}
        </div>
      </div>

      {/* ====================================================================== */}
      {/* RIGHT COLUMN: Team Members Sidebar                                    */}
      {/* ====================================================================== */}
      {/* Spans 1 column on large screens, full width below lg breakpoint.      */}
      {/* Contains:                                                              */}
      {/* - Header with title and icon                                          */}
      {/* - Team member cards (5 placeholders) with:                            */}
      {/*   - Member avatar (circular)                                          */}
      {/*   - Member name and role                                              */}
      {/*   - Action icons (message, profile, etc.)                             */}
      {/* ====================================================================== */}
      <div className="lg:col-span-1">
        <div className="relative overflow-hidden w-full bg-white rounded-3xl border border-slate-200/70 p-5 sm:p-6 shadow-xs space-y-4">
          <ShimmerOverlay />

          <div className="flex items-center gap-2 pb-2 border-b border-slate-100/60">
            <div className="h-5 w-5 bg-slate-200/80 rounded-full animate-pulse" />
            <div className="h-4 bg-slate-200/90 rounded-md w-36 animate-pulse" />
          </div>

          {[1, 2, 3, 4, 5].map((member) => (
            <div
              key={member}
              className="p-3.5 rounded-2xl border border-slate-100/80 bg-slate-50/40 flex items-center justify-between gap-3"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="h-10 w-10 bg-slate-200 rounded-full shrink-0 animate-pulse" />
                <div className="space-y-1.5 min-w-0">
                  <div className="h-3.5 bg-slate-200/90 rounded w-24 animate-pulse" />
                  <div className="h-3 bg-slate-200/60 rounded w-16 animate-pulse" />
                </div>
              </div>
              <div className="flex items-center gap-1.5 shrink-0">
                <div className="h-6 w-6 bg-slate-200/60 rounded-md animate-pulse" />
                <div className="h-6 w-6 bg-slate-200/60 rounded-md animate-pulse" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ====================================================================== */}
      {/* CSS ANIMATION KEYFRAMES                                                */}
      {/* ====================================================================== */}
      {/* Shimmer Animation:                                                    */}
      {/* - Transforms horizontal position over time                            */}
      {/* - Creates left-to-right sweep effect across skeleton elements         */}
      {/* - Start: -translate-x-full (-100% off-screen left)                    */}
      {/* - End: translateX(100%) (100% off-screen right)                       */}
      {/* - Duration: 1.6 seconds (specified in Tailwind class)                 */}
      {/* - Performance: GPU-accelerated with transform property                */}
      {/* ====================================================================== */}
      <style>{`
        @keyframes shimmer {
          100% { transform: translateX(100%); }
        }
      `}</style>
    </div>
  );
}
