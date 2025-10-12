import { useEffect, useState } from "react";
import { useLoginMutation } from "../../slices/apiSlice";
import { useDispatch, useSelector } from "react-redux";
import { setstate } from "../../slices/authSlice";
import { useNavigate } from "react-router-dom";

const Login = () =>{
    const defaultState = {
        email:"",
        password:""
    };
    const [ data,setData] = useState({...defaultState });
const [login,{isLoading}] = useLoginMutation();
const dispatch = useDispatch();
const navigate = useNavigate();
const user = useSelector((s)=>s.auth.user)
useEffect(()=>{
    if(user) navigate("/")
},[])


const handlesubmit = async (e) =>{
    e.preventDefault();
    try {
    const res = await login(data).unwrap(); // ✅ success response
    dispatch(setstate(res.data)); 
    setData({...defaultState})
        navigate("/") ;          // store user/token
    console.log("Login success:", res);
  } catch (err) {
    console.error("Login failed:", err);
  }
}
const handlechange = (e) =>{
    setData((state)=>({
        ...state,[e.target.name] : e.target.value
    }))
}


    return(
       <div>
        <h2>Login page</h2>
        <form onSubmit={handlesubmit}>
        <input type="email" name="email" 
           className="border" required value={data.email} 
           onChange={handlechange}/>
        <input type="password"
             name="password"className="border" required 
             value={data.password}
              onChange={handlechange}/>
            <button  className="border" type="submit" 
            disabled={isLoading}>{isLoading ? "Loading...":"Login"}</button>
        </form>
       </div>
    )
}

export default Login;