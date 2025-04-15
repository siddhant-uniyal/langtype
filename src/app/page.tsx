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
    </div>
  );
};

export default page;
