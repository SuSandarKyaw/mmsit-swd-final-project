import { Loader, PasswordInput, TextInput } from "@mantine/core";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLoginMutation } from "../redux/api/authApi";
import { useDispatch } from "react-redux";
import { addUser } from "../redux/services/authSlice";
import { useForm } from "@mantine/form";

const Login = () => {
  const navigate = useNavigate();
  const [login, { isFetching, isLoading }] = useLoginMutation();
  const dispatch = useDispatch();
  const form = useForm({
    initialValues: {
      email: "susan123@gmail.com",
      password: "1234567su",
    },
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
      password: (value) =>
        value.length > 5 ? null : "Please build strong password",
    },
  });
  // if (isLoading) {
  //   return (
  //     <div className=" flex justify-center items-center h-screen">
  //       <h2 className=" font-normal text-gray-900">Loading...</h2>
  //     </div>
  //   );
  // }
  // const loginHandler = async (e) => {
  //   try {
  //     e.preventDefault();
  //     const user = { email, password };
  //     const { data } = await login(user);
  //     dispatch(addUser({ user: data?.user, token: data?.token }));
  //     if(data?.success){
  //       navigate('/')
  //     }
  //     console.log(data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  return (
    <div>
      <div className=" flex justify-center items-center h-screen">
        <form
          onSubmit={form.onSubmit(async (values) => {
            try {
              const { data } = await login(values);
              dispatch(addUser({ user: data?.user, token: data?.token }));
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
          <h2 className=" text-2xl text-gray-600 ">Log in</h2>
          <TextInput
            {...form.getInputProps("email")}
            placeholder="Enter Your email..."
          />
          <PasswordInput
            {...form.getInputProps("password")}
            placeholder="Enter Your password..."
          />

          <div className=" flex gap-4">
            <p className="">Do you have an account?</p>
            <Link to={"/register"}>
              <p className=" cursor-pointer underline text-blue-700">Register</p>
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
              "Sign In"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
