"use client";

import Footer from "../components/Footer";
import HomeScreen from "../components/HomeScreen";
import Navbar from "../components/Navbar";

const page = () => {
  return (
    <div className="h-screen flex flex-col gap-y-4">
      <Navbar></Navbar>
      <HomeScreen></HomeScreen>
      <Footer></Footer>
      {/* <span className=" border-white absolute">
        <span className="border border-pink-300 relative left-0"></span>
        a
      </span> */}
    </div>
  );
};

export default page;
