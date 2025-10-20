import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import Nav from "../components/Nav";
import ProtectedRoute from "./ProtectedRoute";
import TaskPage from "../pages/TaskPage";

const AppRoutes = () =>{
    return (
        <>
        <Nav/>
         <Routes>
  <Route path="/" element={<Home />} />           {/* Landing page */}
  <Route path="/login" element={<Login />} />
  <Route path="/register" element={<Register />} />
  <Route path="/tasks" element={
      <ProtectedRoute>
        <TaskPage />                               {/* Admin: Create Task + View Tasks */}
      </ProtectedRoute>
  } />
</Routes>

    </>
    )
}
export default AppRoutes;

