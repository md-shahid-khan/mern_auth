import React from 'react'
import {assets} from "../assets/assets.js";

const Navbar = () => {
    return (
        <div className="w-full flex justify-between items-center p-4 sm:p-6 sm:px-24 relative top-0">

            <img className="w-28 sm:w-32 cursor-pointer" src={assets.logo} alt="logo-icon"/>

            <button className="flex items-center gap-2 border border-gray-500
                               rounded-full text-gray-800 hover:bg-gray-100
                               transition-all cursor-pointer px-6 py-2
                               ">Login <img src={assets.arrow_icon} alt="arrow-icon"/> </button>

        </div>
    )
}
export default Navbar
