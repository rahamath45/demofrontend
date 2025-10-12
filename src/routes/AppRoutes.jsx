import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import Nav from "../components/Nav";

const AppRoutes = () =>{
    return (
        <>
        <Nav/>
    <Routes>
        <Route path="/" element ={<Home/>}/>
         <Route path="/login" element ={<Login/>}/>
          <Route path="/register" element ={<Register/>}/>
    </Routes>
    </>
    )
}
export default AppRoutes;

