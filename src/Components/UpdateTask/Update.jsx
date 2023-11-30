import React from "react";

import { useTaskQuery, useUpdateTaskMutation } from "../../redux/api/taskApi";
import { useParams } from "react-router-dom";
import Form from "../UI/Forms/Form";
import FormInput from "../UI/FormInput/FormInput";
import FormDatePicker from "../UI/FormDatePicker/FormDatePicker";
import FormTextArea from "../UI/FormTextArea/FormTextArea";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
const UpdateTask = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data } = useTaskQuery(id);
  const [updateTask] = useUpdateTaskMutation();
  const onSubmit = async (values) => {
    console.log(values);
    try {
      const res = await updateTask({ id, body: values }).unwrap();
      toast(res?.message, {
        icon: <span style={{ color: "white" }}>✔</span>,
        style: {
          borderRadius: "10px",
          background: "#22c55e",
          color: "#fff",
        },
        duration: 2000,
      });
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (err) {
      console.log(err);
      //   toast(err?.data,
      //     {
      //       icon:  <span style={{color:"white"}}>❌</span>,
      //       style: {
      //         borderRadius: '10px',
      //         background: 'red',
      //         color: '#fff',
      //       }
      //     })
    }
  };

  const defaultValues = {
    title: data?.data?.title || "",
    description: data?.data?.description || "",
    date: data?.data?.date || "",
  };
  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <div class="flex items-center justify-center h-screen">
        <div class="bg-white rounded-lg overflow-hidden shadow-md p-8 w-96">
          <h2 class="text-2xl font-semibold mb-6">Update Task</h2>

          <Form submitHandler={onSubmit} defaultValues={defaultValues}>
            <div class="mb-4">
              <FormInput name="title" label="Title" />
            </div>

            <div className="mb-4">
              <FormTextArea name="description" label="Description" rows={4} />
            </div>

            <div className="mb-4">
              <FormDatePicker name="date" label="Select a Date" />
            </div>
            <button
              type="submit"
              class="text-sm text-white bg-green-500 hover:bg-green-600 px-4 py-2 rounded-full"
            >
              Submit
            </button>
          </Form>
        </div>
      </div>
    </>
  );
};

export default UpdateTask;
