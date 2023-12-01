import { Loader, PasswordInput, TextInput } from "@mantine/core";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useRegisterMutation } from "../redux/api/authApi";
import { useForm } from "@mantine/form";
const Register = () => {
  // const [name, setName] = useState("");
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  // const [password_confirmation, setPasswordConfirmation] = useState("");
  // const [user,setUser] = useState({
  //   name :"",
  //   email:"",
  //   password:"",
  //   password_confirmation:""
  // })
  const [register, { isFetching, isLoading }] = useRegisterMutation();
  const navigate = useNavigate();

  const form = useForm({
    initialValues: {
      name: "",
      email: "",
      password: "",
      password_confirmation: "",
    },

    validate: {
      name: (value) =>
        value.length < 2 ? "Name must have at least 2 letters" : null,
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
      password: (value) =>
        value.length > 5 ? null : "Please build strong password",
      password_confirmation: (value, values) =>
        value !== values.password ? "Passwords did not match" : null,
    },
  });

  // if (isLoading) {
  //   return (
  //     <div className=" flex justify-center items-center h-screen">
  //       <h2 className=" font-normal text-gray-900">Loading...</h2>
  //     </div>
  //   );
  // }
  // const registerHandler = async (e) => {
  //   try {
  //     e.preventDefault();
  //     // const user = { name, email, password, password_confirmation };
  //     const { data } = await register(user);
  //     console.log(data);
  //     if (data?.success === true) {
  //       navigate("/login");
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  return (
    <div className=" flex justify-center items-center h-screen gap-10">
      <form
        onSubmit={form.onSubmit(async (values) => {
          try {
            const { data } = await register(values);
            if (data?.success) {
              navigate("/login");
            }
            console.log(data);
            console.log(values);
          } catch (error) {
            console.log(error);
          }
        })}
        className="  w-96 flex flex-col gap-10 shadow-lg"
      >
        <h2 className=" text-2xl text-gray-600 ">Register</h2>
        <TextInput
          {...form.getInputProps("name")}
          placeholder="Enter Your name..."
        />
        <TextInput
          {...form.getInputProps("email")}
          placeholder="Enter Your email..."
        />
        <PasswordInput
          {...form.getInputProps("password")}
          placeholder="Enter Your password..."
        />
        <PasswordInput
          {...form.getInputProps("password_confirmation")}
          placeholder="Confirm Your password..."
        />
        <div className=" flex gap-4">
          <p className="">Already have an account?</p>
          <Link to={"/login"}>
            <p className=" cursor-pointer underline text-blue-700">Login</p>
          </Link>
        </div>
        <button
          disabled={isLoading && true}
          type="submit"
          className=" bg-blue-700 text-white px-4 py-1 rounded"
        >
          {isLoading ? (
            <Loader color="rgba(250, 240, 240, 1)" size="sm" />
          ) : (
            "Sign Up"
          )}
        </button>
      </form>
    </div>
  );
};

export default Register;
