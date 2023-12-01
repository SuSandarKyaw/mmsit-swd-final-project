import Cookies from "js-cookie";
import React from "react";
import { Link, useParams } from "react-router-dom";
import { useGetSingleContactQuery } from "../redux/api/contactApi";
import { Loader } from "@mantine/core";

const UserInfo = () => {
  const token = Cookies.get("token");
  const { id } = useParams();
  const { data, isLoading } = useGetSingleContactQuery({ id, token });
  console.log(data);
  if (isLoading) {
    return (
      <div className="">
        <p className=" flex justify-center items-center h-screen">
          <Loader color="cyan" size={"sm"} />
        </p>
      </div>
    );
  }
  return (
    <div className="flex  justify-center items-center h-screen">
      <div className=" flex flex-col gap-5 p-7 shadow-lg ">
        <img
          className=" w-16 "
          src={
            data?.contact.photo === null
              ? "https://static.vecteezy.com/system/resources/thumbnails/002/318/271/small/user-profile-icon-free-vector.jpg"
              : data?.contact.photo
          }
          alt=""
        />
        <p>{data?.contact.name}</p>
        <p>{data?.contact.email}</p>
        <p>{data?.contact.phone}</p>
        <p>{data?.contact.address}</p>
        <Link to={"/"}>
          <button className=" bg-cyan-700 text-white px-4 py-1 rounded">
            Back
          </button>
        </Link>
      </div>
    </div>
  );
};

export default UserInfo;
