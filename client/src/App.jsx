import React from 'react'

import {Routes, Route} from "react-router"
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import EmailVerify from "./pages/EmailVerify.jsx";
import ResetPassword from "./pages/ResetPassword.jsx";

const App = () => {
    return (
        <div className="">
            <Routes>
                <Route path="/" element={<Home/>} />
                <Route path="/login" element={<Login/>} />
                <Route path="/email-verify" element={<EmailVerify/>} />
                <Route path="/reset-password" element={<ResetPassword/>} />
            </Routes>
        </div>
    )
}
export default App
