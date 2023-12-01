import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLoginMutation, useLogoutMutation } from "../redux/api/authApi";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { removeUser } from "../redux/services/authSlice";
import { Input } from "@mantine/core";
import { setSearchTerm } from "../redux/services/contactSlice";

const Navbar = () => {
  // const {user} = useSelector(state => state.authSlice)
  // const {token} = useSelector(state => state.authSlice)
  const token = Cookies.get("token");

  const dispatch = useDispatch();
  const [logout] = useLogoutMutation();
  const navigate = useNavigate();

  const searchTerm = useSelector((state) => state.contactSlice.searchTerm);
  
  return (
    <div className=" mt-5 flex justify-around p-7 shadow-lg items-center">
      <h2 className="  text-2xl text-gray-700 font-medium">MMSIT</h2>
      
        <Input
          variant="filled"
          placeholder="Search.."
          value={searchTerm}
          onChange={(e) => dispatch(setSearchTerm(e.target.value))}
        />
       
      </div>
  );
};

export default Navbar;
