import { Loader, TextInput } from "@mantine/core";
import { hasLength, useForm } from "@mantine/form";
import React from "react";
import { useCreateContactMutation } from "../redux/api/contactApi";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const CreateContact = () => {
  const token = Cookies.get("token");
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const [createContact, { isLoading }] = useCreateContactMutation();
  const form = useForm({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      address: "",
    },

    validate: {
      name: (value) =>
        value.length < 2 ? "Name must have at least 2 letters" : null,
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
      phone: hasLength({ min: 9, max: 11 }) ? null : "Invalid phone number",
      address: (value) =>
        value.length < 5 ? "Address must have at least 2 letters" : null,
    },
  });
  return (
    <div className=" flex justify-center items-center h-screen gap-10">
      <form
        onSubmit={form.onSubmit(async (values) => {
          try {
            const { data } = await createContact({
              token,
              contact: values,
            });
        
            if (data?.success) {
              navigate("/");
            }
            console.log(data);
            console.log(values);
          } catch (error) {
            console.log(error);
          }
        })}
        className="  w-96 flex flex-col gap-10 shadow-lg"
      >
        <h2 className=" text-2xl text-gray-600 ">Create Contact</h2>
        <TextInput
          {...form.getInputProps("name")}
          placeholder="Enter Your name..."
        />
        <TextInput
          {...form.getInputProps("email")}
          placeholder="Enter Your email..."
        />
        <TextInput
          {...form.getInputProps("phone")}
          placeholder="Enter Your phone..."
        />
        <TextInput
          {...form.getInputProps("address")}
          placeholder="Enter Your address..."
        />
        <button
          type="submit"
          className=" bg-blue-700 text-white px-4 py-1 rounded"
        >
          {isLoading ? (
            <Loader color="rgba(250, 240, 240, 1)" size="sm" />
          ) : (
            "Create"
          )}
        </button>
      </form>
    </div>
  );
};

export default CreateContact;
