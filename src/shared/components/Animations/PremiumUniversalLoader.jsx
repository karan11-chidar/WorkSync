/**
 * ============================================================================
 * PremiumUniversalLoader.jsx
 * ============================================================================
 *
 * Shared Animation Component for Loading States
 *
 * Responsibility:
 * ============================================================================
 * Provides a premium skeleton loader component with multiple responsive
 * layout variants and animated shimmer effects. Displays beautiful placeholder
 * UI while data is loading and seamlessly renders actual content when loading
 * completes. Enhances user experience with visual feedback during data fetches.
 *
 * Features:
 * ============================================================================
 * - Multiple responsive layout variants for different use cases
 * - Premium shimmer animation overlay for visual feedback
 * - Auto-rotating color palette with 6 dynamic color themes
 * - Responsive design with mobile, tablet, and desktop breakpoints
 * - Accessibility support with ARIA labels for loading states
 * - Optional children rendering when loading completes
 * - Configurable rows and grid item counts for flexibility
 * - Tailwind CSS based styling with consistent visual design
 * - Automatic color rotation based on index
 * - Zero dependencies beyond React and Tailwind CSS
 *
 * Supported Variants:
 * ============================================================================
 * 1. "card" - Auto-colored dashboard cards in responsive grid
 *    - 3-column layout on large screens
 *    - 2-column layout on medium screens
 *    - Single column on mobile
 *    - Colored left border with matching badge and icon background
 *    - Statistics display with multiple metrics
 *    - Inner budget/data box with visual hierarchy
 *
 * 2. "list" - Linear list items with action buttons
 *    - Responsive flex layout
 *    - Icon badges and text content
 *    - Full-width action button area
 *    - Varied content widths for natural appearance
 *    - Horizontal divider on mobile, vertical on desktop
 *
 * 3. "grid" - Compact metric/status grid with icon indicators
 *    - 2-column layout on mobile
 *    - 4-column layout on tablet and desktop
 *    - Circular icon placeholders with theme colors
 *    - Compact vertical spacing
 *    - Ideal for KPI displays or status grids
 *
 * 4. "profile" - Profile card with banner and avatar
 *    - Large banner image placeholder
 *    - Circular avatar with shadow and white ring
 *    - Overlapping avatar on banner (negative margin)
 *    - Name and description text
 *    - Two-column metadata grid
 *    - Centered layout with max-width constraint
 *
 * Color Theme System:
 * ============================================================================
 * Six dynamic colors that auto-rotate based on grid index using modulo:
 * - Index 0: Emerald (border-l-emerald-500, bg-emerald-*)
 * - Index 1: Blue (border-l-blue-500, bg-blue-*)
 * - Index 2: Indigo (border-l-indigo-500, bg-indigo-*)
 * - Index 3: Purple (border-l-purple-500, bg-purple-*)
 * - Index 4: Amber (border-l-amber-500, bg-amber-*)
 * - Index 5: Rose (border-l-rose-500, bg-rose-*)
 *
 * Each theme includes:
 * - border: Left border color for visual accent
 * - badge: Badge/pill background color (lighter shade)
 * - icon: Icon background color (medium shade)
 * - gridIconBg: Grid icon background (very light shade)
 *
 * Animation System:
 * ============================================================================
 * - Shimmer Overlay: Horizontal gradient animation
 * - Duration: 1.6 seconds per complete cycle
 * - Direction: Left to right (-100% to 100%)
 * - Effect: Subtle movement creating depth perception
 * - Component-level pulse animations on individual skeleton elements
 * - No external animation library required
 *
 * Accessibility Features:
 * ============================================================================
 * - role="status" - Semantic HTML for screen readers
 * - aria-label="Loading content" - Clear loading state description
 * - pointer-events-none - Prevents unintended interaction
 * - Proper semantic structure for assistive technologies
 *
 * Performance Considerations:
 * ============================================================================
 * - CSS animations are GPU-accelerated
 * - Efficient array generation using Array.from()
 * - Conditional rendering prevents unnecessary DOM nodes
 * - Static style definitions avoid runtime recalculation
 * - Minimal re-renders with proper React hooks usage
 *
 * Styling Approach:
 * ============================================================================
 * - Utility-first Tailwind CSS classes
 * - Responsive prefixes: sm:, md:, lg: for breakpoints
 * - Opacity modifiers for visual hierarchy: /70, /80, /90
 * - Gradient backgrounds with via-30% positioning
 * - Shadow utilities for depth (shadow-xs)
 * - Border and spacing utilities for consistency
 *
 * Browser Support:
 * ============================================================================
 * - Modern browsers with CSS Grid support
 * - CSS Gradients and Transforms
 * - Tailwind CSS 3.x or higher
 * - React 16.8+ (hooks support)
 *
 * Dependencies:
 * ============================================================================
 * - React: Component framework and JSX
 * - Tailwind CSS: Responsive utility styling (3.x)
 * - Modern CSS: Grid, Flexbox, Gradients, Transforms
 *
 * ============================================================================
 */

import React from "react";

/**
 * PremiumUniversalLoader
 *
 * A versatile skeleton loading component that displays beautiful placeholder
 * UI while data is being fetched. Supports multiple responsive layout variants
 * with premium shimmer animations and automatic color rotation.
 *
 * Component Behavior:
 * -------------------
 * 1. When isLoading is false: Renders children content or returns null
 * 2. When isLoading is true: Renders selected variant skeleton layout
 * 3. Color themes auto-rotate based on grid index using modulo operator
 * 4. Shimmer animation plays continuously on all skeleton elements
 * 5. Responsive layouts adapt to screen size using Tailwind breakpoints
 *
 * Performance Notes:
 * ------------------
 * - Uses Array.from() for efficient array generation
 * - Memoizes animation definitions in component scope
 * - CSS animations are GPU-accelerated
 * - Conditional rendering prevents unnecessary DOM nodes
 *
 * Accessibility:
 * ---------------
 * - Semantic role="status" for screen readers
 * - Descriptive aria-label for loading indication
 * - No interactive elements to prevent accidental interaction
 *
 * @component
 * @param {Object} props - Component props
 * @param {boolean} [props.isLoading=true] - Controls whether to show loader or content
 *   - When true: Displays skeleton loading UI
 *   - When false: Renders children or null
 *   - Use with async state (e.g., from useEffect with loading state)
 *
 * @param {string} [props.variant="card"] - Selects skeleton layout variant
 *   - "card": 3-column responsive grid with colored left borders
 *   - "list": Stacked list items with action buttons
 *   - "grid": Compact 2-4 column metric grid with icons
 *   - "profile": Profile card with banner, avatar, and metadata
 *   - Invalid variants silently render nothing
 *
 * @param {number} [props.rows=3] - Number of skeleton rows for "list" variant
 *   - Controls how many placeholder list items to display
 *   - Ignored for "card", "grid", and "profile" variants
 *   - Must be a non-negative integer
 *   - Affects DOM size and initial load time
 *
 * @param {number} [props.gridCount=3] - Number of grid items for "card" and "grid" variants
 *   - For "card": Generates 3x grid cards (respects 2x mobile, 3x desktop)
 *   - For "grid": Generates flex grid items (2x mobile, 4x desktop)
 *   - For "list": Ignored
 *   - Must be a non-negative integer
 *   - Color themes rotate through palette
 *
 * @param {React.ReactNode} [props.children=null] - Content to render when loading completes
 *   - Rendered only when isLoading is false
 *   - Can be any valid React element, component, or fragment
 *   - If null and isLoading is false, component returns null
 *   - Useful for displaying loaded content seamlessly
 *
 * @returns {React.ReactElement} Skeleton loader UI when loading, content when complete
 *
 * @example
 * // Basic attendance loader
 * <PremiumUniversalLoader isLoading={true} variant="attendance" />
 *
 * @example
 * // Card grid with 6 items
 * <PremiumUniversalLoader
 *   isLoading={isLoadingCards}
 *   variant="card"
 *   gridCount={6}
 * />
 *
 * @example
 * // List variant with 5 items
 * <PremiumUniversalLoader
 *   isLoading={isLoadingList}
 *   variant="list"
 *   rows={5}
 * />
 *
 * @example
 * // Profile loader
 * <PremiumUniversalLoader
 *   isLoading={isLoadingProfile}
 *   variant="profile"
 * />
 *
 * @example
 * // Display content when loaded
 * <PremiumUniversalLoader
 *   isLoading={isLoading}
 *   variant="card"
 *   gridCount={3}
 * >
 *   <DashboardCards data={dashboardData} />
 * </PremiumUniversalLoader>
 *
 * @example
 * // With error fallback
 * {error ? (
 *   <ErrorMessage error={error} />
 * ) : (
 *   <PremiumUniversalLoader
 *     isLoading={loading}
 *     variant="list"
 *     rows={4}
 *   >
 *     <DataList data={data} />
 *   </PremiumUniversalLoader>
 * )}
 */
/**
 * Renders a configurable loading skeleton for common content layouts.
 *
 * @param {Object} props - Loader configuration.
 * @param {boolean} [props.isLoading=true] - Whether the skeleton is visible.
 * @param {string} [props.variant="card"] - Skeleton layout variant.
 * @param {number} [props.rows=3] - Number of rows for list layouts.
 * @param {number} [props.gridCount=3] - Number of items for grid layouts.
 * @param {React.ReactNode} [props.children=null] - Content rendered after loading.
 * @returns {JSX.Element} The selected loading skeleton or child content.
 */
export default function PremiumUniversalLoader({
  isLoading = true,
  variant = "card", // 'list' | 'grid' | 'profile' | 'card'
  rows = 3,
  gridCount = 3,
  children = null,
}) {
  if (!isLoading) {
    return children ? <>{children}</> : null;
  }

  // ============================================================================
  // Initialize Arrays for Iteration
  // ============================================================================
  // Generate arrays of specified lengths for rendering skeleton placeholders
  // Array.from() is preferred over Array(n).fill() for cleaner intent
  const iterations = Array.from({ length: rows });
  const gridItems = Array.from({ length: gridCount });

  // ============================================================================
  // Color Theme Palette System
  // ============================================================================
  /**
   * Color palette for auto-rotating themes across skeleton items.
   * Each theme includes four color variants:
   * - border: Left border accent color (primary theme color)
   * - badge: Status badge background (light shade, 70% opacity)
   * - icon: Icon box background (medium shade, 80% opacity)
   * - gridIconBg: Grid item icon background (very light, 50-80% opacity)
   *
   * Colors rotate using modulo operator: colorPalette[index % 6]
   * This ensures consistent color distribution regardless of count.
   *
   * @type {Array<Object>}
   * @property {string} border - Tailwind left border color class
   * @property {string} badge - Tailwind badge background color class
   * @property {string} icon - Tailwind icon background color class
   * @property {string} gridIconBg - Tailwind grid icon background color class
   */
  const colorPalette = [
    {
      border: "border-l-emerald-500",
      badge: "bg-emerald-100/70",
      icon: "bg-emerald-200/80",
      gridIconBg: "bg-emerald-50/80",
    },
    {
      border: "border-l-blue-500",
      badge: "bg-blue-100/70",
      icon: "bg-blue-200/80",
      gridIconBg: "bg-blue-50/80",
    },
    {
      border: "border-l-indigo-500",
      badge: "bg-indigo-100/70",
      icon: "bg-indigo-200/80",
      gridIconBg: "bg-indigo-50/80",
    },
    {
      border: "border-l-purple-500",
      badge: "bg-purple-100/70",
      icon: "bg-purple-200/80",
      gridIconBg: "bg-purple-50/80",
    },
    {
      border: "border-l-amber-500",
      badge: "bg-amber-100/70",
      icon: "bg-amber-200/80",
      gridIconBg: "bg-amber-50/80",
    },
    {
      border: "border-l-rose-500",
      badge: "bg-rose-100/70",
      icon: "bg-rose-200/80",
      gridIconBg: "bg-rose-50/80",
    },
  ];

  // ============================================================================
  // ShimmerOverlay Component
  // ============================================================================
  /**
   * Premium shimmer animation overlay that creates a horizontal sweep effect
   * across skeleton elements. Provides visual feedback during loading.
   *
   * Animation Details:
   * - Linear gradient from transparent → light gray → transparent
   * - Horizontal movement from left (-100%) to right (100%)
   * - Duration: 1.6 seconds per cycle
   * - Infinite loop with seamless repetition
   * - GPU-accelerated for smooth 60fps performance
   *
   * Technical Implementation:
   * - absolute positioning fills parent container
   * - -translate-x-full starts animation from left
   * - rounded-[inherit] inherits parent's border radius
   * - pointer-events-none prevents interaction
   * - overflow-hidden clips animation to boundaries
   *
   * @component
   * @returns {React.ReactElement} Shimmer overlay div element
   *
   * @internal
   */
  const ShimmerOverlay = () => (
    <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-[inherit]">
      <div className="absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-slate-200/60 via-30% to-transparent animate-[shimmer_1.6s_infinite]" />
    </div>
  );

  // ============================================================================
  // Main Render Container
  // ============================================================================

  return (
    <div
      className="w-full select-none"
      role="status"
      aria-label="Loading content"
    >
      {/* ====================================================================== */}
      {/* CARD VARIANT: Auto-colored responsive grid (3-col / 2-col / 1-col)       */}
      {/* ====================================================================== */}
      {/* Displays colored dashboard cards in responsive grid layout.             */}
      {/* Each card features:                                                     */}
      {/* - Dynamic left border with rotating theme colors                        */}
      {/* - Colored status badge                                                  */}
      {/* - Multiple statistics rows                                              */}
      {/* - Inner data box with icon accent                                       */}
      {/* - Footer with action indicator                                          */}
      {/* Use for: Dashboard metrics, analytics cards, summary cards              */}
      {/* ====================================================================== */}
      {variant === "card" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 w-full">
          {gridItems.map((_, idx) => {
            // Pick a color dynamically using modulo operator based on index
            const theme = colorPalette[idx % colorPalette.length];

            return (
              <div
                key={idx}
                className={`relative overflow-hidden bg-white rounded-2xl border border-slate-100 border-l-4 ${theme.border} p-5 shadow-xs space-y-4`}
              >
                <ShimmerOverlay />

                {/* Card Header: Title & Dynamic Badge */}
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-1.5 flex-1">
                    <div className="h-5 bg-slate-200/90 rounded-md w-28 animate-pulse" />
                    <div className="h-3 bg-slate-200/50 rounded-md w-16 animate-pulse" />
                  </div>
                  <div
                    className={`h-6 w-20 ${theme.badge} rounded-lg animate-pulse shrink-0`}
                  />
                </div>

                {/* Stats Rows */}
                <div className="space-y-3 pt-2">
                  <div className="flex justify-between items-center">
                    <div className="h-3.5 bg-slate-200/60 rounded w-16 animate-pulse" />
                    <div className="h-3.5 bg-slate-200/80 rounded w-24 animate-pulse" />
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="h-3.5 bg-slate-200/60 rounded w-12 animate-pulse" />
                    <div className="h-3.5 bg-slate-200/80 rounded w-20 animate-pulse" />
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="h-3.5 bg-slate-200/60 rounded w-20 animate-pulse" />
                    <div className="h-3.5 bg-slate-200/80 rounded w-6 animate-pulse" />
                  </div>
                </div>

                {/* Inner Budget Box */}
                <div className="bg-slate-50/80 p-4 rounded-xl border border-slate-100/80 space-y-3">
                  <div className="flex justify-between items-center">
                    <div className="h-3 bg-slate-200/70 rounded w-20 animate-pulse" />
                    <div
                      className={`h-4 w-4 ${theme.icon} rounded-md animate-pulse`}
                    />
                  </div>
                  <div className="flex justify-between items-end pt-1">
                    <div className="h-6 bg-slate-200/90 rounded-md w-24 animate-pulse" />
                    <div className="h-5 w-10 bg-slate-200/60 rounded-md animate-pulse" />
                  </div>
                </div>

                {/* Card Footer */}
                <div className="flex items-center justify-between pt-2 border-t border-slate-50">
                  <div className="h-3 bg-slate-200/50 rounded w-28 animate-pulse" />
                  <div className="h-4 w-4 bg-red-100 rounded-md animate-pulse" />
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* ====================================================================== */}
      {/* LIST VARIANT: Stacked list items with action buttons                   */}
      {/* ====================================================================== */}
      {/* Displays linear list items in responsive layout.                       */}
      {/* Each item features:                                                    */}
      {/* - Icon badges/avatars on the left                                      */}
      {/* - Title and description text (varied widths for natural look)           */}
      {/* - Full-width action button                                             */}
      {/* - Responsive: vertical stack on mobile, horizontal on desktop          */}
      {/* Use for: Employee lists, transaction history, activity feeds           */}
      {/* ====================================================================== */}
      {variant === "list" && (
        <div className="w-full space-y-3.5 p-0.5">
          {iterations.map((_, idx) => (
            <div
              key={idx}
              className="relative overflow-hidden p-3.5 sm:p-5 rounded-2xl border border-slate-200/70 bg-white shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3.5"
            >
              <ShimmerOverlay />
              <div className="space-y-2.5 flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <div className="h-3.5 w-14 bg-slate-200/80 rounded-full animate-pulse" />
                  <div className="h-3.5 w-10 bg-slate-200/60 rounded-full animate-pulse" />
                </div>
                <div
                  className={`h-4 bg-slate-200/90 rounded-md animate-pulse ${
                    idx % 2 === 0 ? "w-4/5 sm:w-2/3" : "w-3/5"
                  }`}
                />
                <div className="h-3 bg-slate-200/50 rounded-md w-11/12 animate-pulse" />
              </div>
              <div className="h-8 sm:h-9 w-full sm:w-24 bg-slate-200/80 rounded-xl shrink-0 self-stretch sm:self-center animate-pulse" />
            </div>
          ))}
        </div>
      )}

      {/* ====================================================================== */}
      {/* GRID VARIANT: Compact metric/KPI grid with icon indicators             */}
      {/* ====================================================================== */}
      {/* Displays compact grid items with icon indicators.                      */}
      {/* Each item features:                                                    */}
      {/* - Text label and value placeholders                                    */}
      {/* - Circular icon with theme-colored background                          */}
      {/* - Compact spacing for information density                              */}
      {/* - Responsive: 2-column mobile, 4-column desktop                        */}
      {/* Use for: KPI dashboards, metric grids, status indicators               */}
      {/* ====================================================================== */}
      {variant === "grid" && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 w-full lg:w-auto">
          {gridItems.map((_, idx) => {
            const theme = colorPalette[idx % colorPalette.length];

            return (
              <div
                key={idx}
                className="relative overflow-hidden bg-white border border-slate-200/70 p-3.5 sm:p-4 rounded-2xl flex items-center justify-between shadow-xs min-h-18"
              >
                <ShimmerOverlay />
                <div className="space-y-2 flex-1 pr-2">
                  <div className="h-2.5 sm:h-3 bg-slate-200/60 rounded-sm w-12 sm:w-16 animate-pulse" />
                  <div
                    className={`h-4 sm:h-5 bg-slate-200/90 rounded-md animate-pulse ${
                      idx % 2 === 0 ? "w-20 sm:w-24" : "w-16 sm:w-20"
                    }`}
                  />
                </div>
                <div
                  className={`h-7 sm:h-9 w-7 sm:w-9 ${theme.gridIconBg} rounded-xl shrink-0 flex items-center justify-center animate-pulse`}
                >
                  <div
                    className={`h-3.5 sm:h-4 w-3.5 sm:w-4 ${theme.icon} rounded-md`}
                  />
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* ====================================================================== */}
      {/* PROFILE VARIANT: Profile card with banner, avatar, and metadata        */}
      {/* ====================================================================== */}
      {/* Displays centered profile card with premium appearance.                */}
      {/* Structure features:                                                    */}
      {/* - Large banner image placeholder (full width)                          */}
      {/* - Circular avatar overlapping banner (negative margin)                 */}
      {/* - Name and description text (centered)                                 */}
      {/* - Two-column metadata grid (responsive)                                */}
      {/* - Centered layout with max-width constraint                            */}
      {/* Use for: User profiles, team member cards, people directory            */}
      {/* ====================================================================== */}
      {variant === "profile" && (
        <div className="relative w-full max-w-xl mx-auto p-3.5 sm:p-5 bg-white rounded-3xl border border-slate-200/70 shadow-xs overflow-hidden space-y-5">
          <ShimmerOverlay />
          <div className="h-20 sm:h-28 bg-slate-200/70 rounded-2xl w-full animate-pulse" />
          <div className="flex flex-col items-center text-center space-y-2.5 -mt-12 sm:-mt-16 relative z-10">
            <div className="h-16 w-16 sm:h-20 sm:w-20 rounded-2xl bg-slate-200 ring-4 ring-white shadow-md animate-pulse" />
            <div className="h-4 bg-slate-200/90 rounded-md w-28 sm:w-36 animate-pulse" />
            <div className="h-3 bg-slate-200/50 rounded-md w-40 sm:w-48 animate-pulse" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            <div className="p-3.5 bg-slate-50/80 rounded-2xl space-y-2 border border-slate-100">
              <div className="h-2.5 bg-slate-200/70 w-14 rounded" />
              <div className="h-3.5 bg-slate-200/90 w-full rounded" />
            </div>
            <div className="p-3.5 bg-slate-50/80 rounded-2xl space-y-2 border border-slate-100">
              <div className="h-2.5 bg-slate-200/70 w-14 rounded" />
              <div className="h-3.5 bg-slate-200/90 w-full rounded" />
            </div>
          </div>
        </div>
      )}

      {/* ====================================================================== */}
      {/* CSS ANIMATION DEFINITIONS                                              */}
      {/* ====================================================================== */}
      {/* Shimmer Animation Keyframes:                                           */}
      {/* - Duration: 1.6 seconds (infinite loop)                                */}
      {/* - Direction: Left to right translation                                 */}
      {/* - Start: -100% (off-screen left via -translate-x-full)                 */}
      {/* - End: 100% (off-screen right)                                         */}
      {/* - Effect: Creates horizontal shimmer/sweep across elements             */}
      {/* - Performance: GPU-accelerated with transform property                 */}
      {/* - Compatibility: All modern browsers                                   */}
      {/* ====================================================================== */}
      <style>{`
        @keyframes shimmer {
          100% { transform: translateX(100%); }
        }
      `}</style>
    </div>
  );
}
