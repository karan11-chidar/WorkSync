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
 * Displays a premium loading skeleton for the employee dashboard.
 *
 * This component mirrors the dashboard layout while data is being fetched so the
 * interface remains visually stable and users receive immediate feedback instead
 * of a blank screen. It uses placeholder cards and a shimmer effect to match the
 * real content structure without blocking the page.
 *
 * @component
 * @returns {JSX.Element} A responsive dashboard loading skeleton with
 * placeholder sections for attendance, tasks, and team members.
 */

/**
 * Displays the loading layout for the employee dashboard.
 *
 * @returns {JSX.Element} The dashboard loading skeleton.
 */
export default function DashboardSkeleton() {
  return (
    <div
      className="space-y-6 w-full select-none"
      role="status"
      aria-label="Loading dashboard"
    >
      {/* 1. Header Banner Skeleton (Welcome Back & Employee ID) */}
      <div className="relative overflow-hidden w-full bg-white rounded-3xl border border-slate-200/70 p-6 sm:p-7 shadow-xs">
        <ShimmerOverlay />
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-3 flex-1">
            {/* Welcome Back Title Skeleton */}
            <div className="h-7 sm:h-8 bg-slate-200/90 rounded-xl w-3/4 sm:w-1/2 md:w-2/5 animate-pulse" />
            {/* Subtitle Lines Skeleton */}
            <div className="space-y-2 pt-1">
              <div className="h-3.5 bg-slate-200/60 rounded-md w-11/12 max-w-xl animate-pulse" />
              <div className="h-3.5 bg-slate-200/50 rounded-md w-2/3 max-w-md animate-pulse" />
            </div>
          </div>
          {/* Employee ID Badge Skeleton */}
          <div className="h-10 w-44 bg-slate-100 rounded-2xl border border-slate-200/50 animate-pulse shrink-0 self-start md:self-center" />
        </div>
      </div>

      {/* 2. Main Content Grid (Left Column & Right Sidebar) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 w-full">
        {/* Left Column: Attendance & Task Checklist */}
        <div className="lg:col-span-2 space-y-6">
          {/* Attendance & Clock Card Skeleton */}
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

          {/* Task Checklist Skeleton */}
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

        {/* Right Column: My Team Sidebar Skeleton */}
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
      </div>

      <style>{`
        @keyframes shimmer {
          100% { transform: translateX(100%); }
        }
      `}</style>
    </div>
  );
}
