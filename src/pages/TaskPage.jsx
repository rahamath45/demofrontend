import { useState } from "react";
import { useSelector } from "react-redux";
import { useCreateTaskMutation, useGetAllTasksQuery, useGetAllUsersQuery } from "../slices/apiSlice";
import Loading from "../components/Loading";

const TaskPage = () => {
  const user = useSelector((s) => s.auth.user);
  const { data: tasksData, isLoading: tasksLoading } = useGetAllTasksQuery();
  const { data: usersRes, isLoading: usersLoading } = useGetAllUsersQuery();
  const [createTask, { isLoading: creatingTask }] = useCreateTaskMutation();

  const [taskData, setTaskData] = useState({
    title: "",
    description: "",
    dueDate: "",
    assignedTo: "",
  });

  if (!user)
    return <p className="text-center mt-10 text-gray-600">Please login to view tasks.</p>;
  if (tasksLoading || usersLoading) return <Loading />;

  // Show all tasks for Admin, only assigned tasks for others
  const tasksToShow =
    user.role === "Admin"
      ? tasksData?.tasks
      : tasksData?.tasks.filter((task) => task.assignedTo?._id === user._id);

  const handleChange = (e) => setTaskData({ ...taskData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createTask(taskData).unwrap();
      setTaskData({ title: "", description: "", dueDate: "", assignedTo: "" });
      alert("✅ Task created successfully!");
    } catch (err) {
      console.error(err);
      alert("❌ Failed to create task");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-10 px-5">
      <div className="max-w-6xl mx-auto space-y-10">

        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
            {user.role === "Admin" ? "Task Management Dashboard" : "My Assigned Tasks"}
          </h1>
          <p className="text-gray-500 mt-2">
            Manage and track tasks efficiently with real-time updates
          </p>
        </div>

        {/* Create Task Card (Admin Only) */}
        {user.role === "Admin" && (
          <div className="bg-white shadow-xl rounded-2xl p-6 border border-gray-100 hover:shadow-2xl transition">
            <h2 className="text-2xl font-semibold text-indigo-600 mb-4 text-center">
              📝 Create a New Task
            </h2>
            <form
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
              onSubmit={handleSubmit}
            >
              <input
                type="text"
                name="title"
                placeholder="Task Title"
                value={taskData.title}
                onChange={handleChange}
                className="border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
                required
              />
              <input
                type="text"
                name="description"
                placeholder="Description"
                value={taskData.description}
                onChange={handleChange}
                className="border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
                required
              />
              <input
                type="date"
                name="dueDate"
                value={taskData.dueDate}
                onChange={handleChange}
                className="border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
                required
              />
              <select
                name="assignedTo"
                value={taskData.assignedTo}
                onChange={handleChange}
                className="border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
              >
                <option value="">Assign to...</option>
                {usersRes?.users.map((u) => (
                  <option key={u._id} value={u._id}>
                    {u.name} ({u.role})
                  </option>
                ))}
              </select>
              <div className="col-span-1 md:col-span-2 flex justify-center">
                <button
                  type="submit"
                  disabled={creatingTask}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-lg font-medium shadow-md hover:shadow-lg transition duration-200"
                >
                  {creatingTask ? "Creating..." : "Create Task"}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Task List Section */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">📋 Task List</h2>
          {tasksToShow?.length ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {tasksToShow.map((task) => (
                <div
                  key={task._id}
                  className="bg-white border border-gray-100 p-5 rounded-2xl shadow hover:shadow-xl transition duration-300"
                >
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="text-lg font-semibold text-gray-800">
                      {task.title}
                    </h3>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        task.status === "Completed"
                          ? "bg-green-100 text-green-800"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {task.status || "Pending"}
                    </span>
                  </div>

                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                    {task.description}
                  </p>

                  <div className="space-y-1 text-sm text-gray-500">
                    <p>
                      <span className="font-medium text-gray-700">Due:</span>{" "}
                      {new Date(task.dueDate).toLocaleDateString()}
                    </p>
                    <p>
                      <span className="font-medium text-gray-700">Assigned:</span>{" "}
                      {task.assignedTo?.name || "Unassigned"}
                    </p>
                    <p>
                      <span className="font-medium text-gray-700">Created by:</span>{" "}
                      {task.createdBy?.name}
                    </p>
                  </div>

                  <div className="flex justify-end mt-4">
                    <button className="text-indigo-600 hover:text-indigo-800 text-sm font-medium">
                      View Details →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500">No tasks available yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskPage;
