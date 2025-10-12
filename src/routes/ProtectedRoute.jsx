import { useSelector } from "react-redux";

const ProtectedRoute = ({children}) =>{
    const state = useSelector((s)=>s.auth);
    if(!state.token || !state.user) return <Navigate to="/login" replace/>;
    return children
}

export default ProtectedRoute;