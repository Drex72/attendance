import React from "react";
import HomeSection from "./sections/home-section/home-section";
import Header from "./sections/header";

export default function Page() {
  return (
    <div>
      <Header />
      <div className="w-9/12  mx-auto pt-14  flex justify-center tablet_min:w-[95%]">
        <HomeSection />
      </div>
    </div>
  );
}
