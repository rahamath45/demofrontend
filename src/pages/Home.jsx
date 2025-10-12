import { useSelector } from "react-redux";
import Loading from "../components/Loading";
import { useGetAllTasksQuery } from "../slices/apiSlice";
import TaskPage from "./TaskPage";

const Home = () =>{
    const user = useSelector((s)=>s.auth.user)
      const {data ,isLoading: isLoadingTasks} = useGetAllTasksQuery();
     
      if(isLoadingTasks) return <Loading></Loading>
    return(
       <div className="mx-auto max-w-xl">
            <h2>Tasks</h2>
            {(user.role == "Admin") && <TaskPage/>}
            <table className="border border-2">
                
                <tr>
                <th>title</th>
                <th>description</th>
                <th>dueDate</th>
                <th>AssignedTo</th>
                <th>CreatedBy</th>
                <th>actions</th>
                </tr>
            
                {data?.tasks.map((task)=>(
                    <tr key={task._id} className="border border-2">
                        <td>{task.title}</td>
                        <td>{task.description}</td>
                        <td>{task.dueDate}</td>
                        <td>{task.assignedTo?.name}</td>
                        <td>{task.createdBy?.name}</td>
                        <td>delete  edit</td>
                    </tr>
                ))}
            </table>
            
       </div>
    )
}


export default Home;