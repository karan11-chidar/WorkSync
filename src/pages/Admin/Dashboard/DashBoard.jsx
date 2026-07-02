import React from "react";
import Header from "./Header";
import CardsGrid from "./CardsGrid";
import AnalyticsCharts from "./AnalyticsCharts";
import BottomSection from "./BottomSection";
function DashBoard() {
  return (
    <main
      className="
        flex-1
        bg-slate-50
        px-4
        py-5
        sm:px-5
        md:px-6
        md:py-6
        lg:px-8
      "
    >
      <div
        className="
          max-w-7xl
          mx-auto
          space-y-5
          md:space-y-6
        "
      >
        <Header />

        <CardsGrid />

        <AnalyticsCharts />
        <BottomSection />
      </div>
    </main>
  );
}

export default DashBoard;
