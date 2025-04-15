"use client"

import Footer from "./footer"
import App from "./app"
import Navbar from "./navbar"
import Test from "./test"

const page = () => {
  return (
    <div className="h-screen flex flex-col gap-y-4">
        <Navbar></Navbar>
        <App></App>
        <Footer></Footer>
    </div>
  )
}

export default page