// Tasks.js
import React from "react";
import { Link } from "react-router-dom";
import {
  useDeleteTaskMutation,
  useTasksQuery,
  useUpdateTaskMutation,
} from "../../redux/api/taskApi";
import toast, { Toaster } from "react-hot-toast";
import { FaPlus } from "react-icons/fa";
import TaskButton from "../UI/Button/TaskButton";

const Tasks = () => {
  const { data: tasks } = useTasksQuery();
  tasks?.data?.map((d) => console.log(d));
  const [deleteTask] = useDeleteTaskMutation();
  const [updateTask] = useUpdateTaskMutation();

  const handleStatus = async (id, isCompleted) => {
    await updateTask({
      id,
      body: { isComplete: !isCompleted },
    }).unwrap();
  };

  const deleteHandler = async (id) => {
    const res = await deleteTask(id).unwrap();
    toast(res?.message, {
      icon: <span style={{ color: "white" }}>✔</span>,
      style: {
        borderRadius: "10px",
        background: "#22c55e",
        color: "#fff",
      },
      duration: 2000,
    });
  };

  return (
    <div>
      <Toaster position="top-center" reverseOrder={false} />
      <section className="py-20 border ">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 md:px-12">
          <div className="flex justify-between items-center mb-10">
            <h2 className="text-2xl font-semibold md:text-3xl">All Task</h2>
            <Link to="/task/new">
              <button className="text-sm text-white bg-green-500 hover:bg-green-600 px-4 py-2 rounded-full">
                <FaPlus />
              </button>
            </Link>
          </div>

          <div className="grid  sm:grid-cols-2 xs:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-x-4 gap-y-4">
            {tasks?.data?.map((task) => (
              <div
                key={task?._id}
                className="max-w-md mx-auto  bg-white rounded-lg overflow-hidden shadow-md border border-gray-200 lg:h-[246px] lg:w-[284px] xl:h-[246px] xl:w-[284px]"
              >
                <div className="p-6">
                  <h2 className="text-xl font-semibold text-gray-800">
                    {task?.title}
                  </h2>
                  <p className="text-gray-600 mt-2">{task?.description}</p>
                  <p className="text-gray-500 text-sm mt-2">
                    Due Date:{" "}
                    {new Date(task?.date).toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </p>
                </div>
                <div className="flex justify-between items-center p-6 bg-gray-100">
                  {task?.isComplete ? (
                    <TaskButton
                      type="complete"
                      onClick={() => handleStatus(task?._id, task?.isComplete)}
                    />
                  ) : (
                    <TaskButton
                      type="incomplete"
                      onClick={() => handleStatus(task?._id, task?.isComplete)}
                    />
                  )}

                  <div className="flex gap-2">
                    <Link to={`/task/${task?._id}`}>
                      <TaskButton type="edit" />
                    </Link>
                    <TaskButton
                      type="delete"
                      onClick={() => deleteHandler(task?._id)}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Tasks;
