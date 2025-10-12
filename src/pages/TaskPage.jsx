import { useState } from "react";
import { useCreateTaskMutation, useGetAllUsersQuery } from "../slices/apiSlice";
import Loading from "../components/Loading";



const TaskPage = () =>{
     const defaultState = {
                  title:"",
                  description:"",
                  dueDate:"",
                  assignedTo:""
              };
              const [ data,setData] = useState({...defaultState });
             const { data :res, isLoading} = useGetAllUsersQuery();
                const [createTask,{isLoading:isTaskCreationLoading}] = useCreateTaskMutation()

              const handlesubmit = async (e) =>{
                  e.preventDefault();
                     console.log("Submitting data:", data); 
                       const res = await createTask(data).unwrap(); // ✅ success response
                         console.log(res) 
              }
              const handlechange = (e) =>{
                  setData((state)=>({
                      ...state,[e.target.name] : e.target.value
                  }))
              }
            if(isLoading) return <Loading></Loading>   
    return(
        <div>
          <form onSubmit={handlesubmit}>
               <input className="border-2" placeholder="title" type="text" name="title" onChange={handlechange} value={data.text}/>
                <input className="border-2" placeholder="description" type="text" name="description" onChange={handlechange} value={data.description}/>
                <input type="date" name="dueDate" onChange={handlechange} value={data.dueDate}/>
                <select name="assignedTo" onChange={handlechange} value={data.assignedTo}>
                     <option value="">unassigned</option>
                     {res?.users.map((user)=>
                        <option value={user._id}>{user.name}- ({user.role})</option>
                     )}
                </select>
                <button type="submit" disabled={isTaskCreationLoading}>{isTaskCreationLoading ? "Adding tasks..." :"Add Tasks"}</button>
          </form>
        </div>
    )
}

export default TaskPage;