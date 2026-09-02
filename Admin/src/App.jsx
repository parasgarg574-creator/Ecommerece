import { Routes,Route,Link,Navigate } from "react-router-dom"
import React from "react"
import Dashboard from "./Pages/Dashboard";
const Login = React.lazy(()=> import("./Authentication/Login"))
const Forgot = React.lazy(()=> import("./Authentication/ForgotPassword"));
const Reset = React.lazy(()=> import("./Authentication/ResetPassword"))
function App() {
  return (
    <>
 <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login/>} />
        <Route path="/forgot" element={<Forgot/>}/>
        <Route path="/reset" element= {<Reset/>}/>
        <Route path="/dashboard" element={<Dashboard/>}/>
      </Routes>
    </>
  )
}

export default App
