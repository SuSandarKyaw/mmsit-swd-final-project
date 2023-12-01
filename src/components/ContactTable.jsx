import React, { useEffect } from "react";
import { IoMdPersonAdd } from "react-icons/io";
import {
  useDeleteContactMutation,
  useGetContactQuery,
} from "../redux/api/contactApi";
import Cookies from "js-cookie";
import { Button, Input, Menu, Table } from "@mantine/core";
import { Link } from "react-router-dom";
import { FaTrash } from "react-icons/fa";
import { IoMdInformationCircle } from "react-icons/io";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { addContact, setSearchTerm } from "../redux/services/contactSlice";

const ContactTable = () => {
  const token = Cookies.get("token");
  const user = JSON.parse(Cookies.get("user"));
console.log(user);
  const { data, isLoading } = useGetContactQuery(token);
  const [deleteContact] = useDeleteContactMutation();
  const dispatch = useDispatch();
  const userContact = useSelector((state) => state.contactSlice.contacts);
  const searchTerm = useSelector((state) => state.contactSlice.searchTerm);
  console.log(userContact);
  const logoutHandler = async () => {
    const { data } = await logout(token);
    dispatch(removeUser());
    console.log(data);
    if (data?.success) {
      navigate("/login");
    }
  };

  const deleteHandler = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Deleted!",
          text: "Your data has been deleted.",
          icon: "success",
        });
        const { data } = await deleteContact({ id, token });
      }
    });
  };
  useEffect(() => {
    dispatch(addContact(data?.contacts?.data));
  }, [data]);

  console.log(data);
  if (isLoading) {
    return (
      <div className=" flex justify-center items-center h-screen">
        Please wait a moment...
      </div>
    );
  }
  return (
    <>
    
      <div className="ms-12 my-5 flex gap-10 items-center justify-between">
        <div className=" flex flex-col gap-3 px-4 py-1 shadow-lg">
          <p>{user?.name}</p>
          <p>{user?.email}</p>
          <button onClick={logoutHandler} className="  bg-red-600 text-white px-3 py-1 rounded">
          Logout
        </button>
        </div>
        <Link to={"/create"}>
          <button className=" me-12 flex items-center gap-3 my-5 bg-gray-700 text-white rounded px-4 py-1">
          <IoMdPersonAdd /> Create Contact
          </button>
        </Link>
        
      </div>
      <div className=" ms-12 mt-10">
        <Table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Address</th>
            </tr>
          </thead>
          <tbody>
            {userContact
              ?.filter((item) => {
                if (searchTerm === "") {
                  return item;
                } else if (
                  item?.name
                    .toLowerCase()
                    .includes(searchTerm?.toLocaleLowerCase())
                ) {
                  return item;
                }
              })
              ?.map((contact) => {
                return (
                  <tr key={contact?.id}>
                    <td>{contact?.name}</td>
                    <td>
                      {contact?.email == null
                        ? "example@gmail.com"
                        : contact?.email}
                    </td>
                    <td>{contact?.phone}</td>
                    <td>
                      {contact?.address == null ? "mockcity" : contact?.address}
                    </td>
                    <td>
                      {/* <p
                        onClick={() => deleteHandler(contact?.id)}
                        className=" text-red-500 cursor-pointer"
                      >
                        <FaTrash />
                      </p> */}
                      <Menu width={200} shadow="md">
                        <Menu.Target>
                          <Button variant="outline">...</Button>
                        </Menu.Target>

                        <Menu.Dropdown>
                          <Link to={`/userinfo/${contact?.id}`}>
                            <Menu.Item component="a">
                              <p className=" text-blue-700 flex items-center justify-center gap-2">
                                <IoMdInformationCircle /> User Info
                              </p>
                            </Menu.Item>
                          </Link>

                          <Menu.Item component="a" target="_blank">
                            <p
                              onClick={() => deleteHandler(contact?.id)}
                              className=" text-red-500 flex items-center justify-center gap-2"
                            >
                              <FaTrash /> Delete
                            </p>
                          </Menu.Item>
                        </Menu.Dropdown>
                      </Menu>
                    </td>
                  </tr>
                );
              })}
            ;
          </tbody>
        </Table>
      </div>
    </>
  );
};

export default ContactTable;
