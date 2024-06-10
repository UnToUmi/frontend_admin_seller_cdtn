import { Avatar, Divider } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { getNav } from "../navigation/index";
import { SlLogout } from "react-icons/sl";
import { useDispatch, useSelector } from "react-redux";
import { logout, messageClear } from "./../store/Reducers/authReducer";
import { toast } from "react-hot-toast";

const Slidebar = ({ showSidebar, setShowSidebar }) => {
  const dispatch = useDispatch();
  const { role, successMessage } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const { pathname } = useLocation();
  const [allNav, setAllNav] = useState([]);
  useEffect(() => {
    const navs = getNav(role);
    setAllNav(navs);
  }, [role]);

  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage);
      dispatch(messageClear());
    }
  }, [successMessage]);

  return (
    <div>
      <div
        onClick={() => setShowSidebar(false)}
        className={`fixed duration-300 ${!showSidebar ? "invisible" : "visible"}
      w-screen h-screen bg-[#20262b80] top-0 left-0 z-50
      `}
      ></div>
      <div
        className={` w-[260px] fixed bg-[#e6e7fb] top-0 z-50 h-screen overflow-y-scroll lg:overflow-hidden 
     transition-all rounded-e-xl py-3 ${
       showSidebar ? "left-0" : "-left-[260px] lg:left-0"
     }`}
      >
        <div className=" flex justify-center items-center">
          <Link to="/" className="mt-4 w-[140px] h-[50px]">
            <Avatar
              sx={{
                borderRadius: "15px",
                width: "100%",
                height: "100%",
              }}
              variant="square"
              alt="Regods"
              src="https://down-bs-vn.img.susercontent.com/fd3039e6db1f0b7a44febfec19ae8e88_tn.webp"
            />
          </Link>
        </div>
        <Divider
          sx={{ marginTop: "16px", height: "2px", borderRadius: "90%" }}
          color="#8B8B8B"
          orientation="horizontal"
          variant="middle"
          flexItem
        />
        <div className="px-[26px] mt-[16px]">
          <ul className="space-y-4">
            {allNav.map((item, index) => (
              <React.Fragment key={index}>
                <li className="flex items-center">
                  <Link
                    to={item.path}
                    className={`flex items-center ${
                      pathname === item.path
                        ? "bg-gray-400  text-white  rounded-lg px-[10px] py-[5px] hover:pl-3.5 w-full hover:bg-gray-500 duration-300"
                        : "text-[#030811] px-[10px] py-[5px] w-full hover:bg-slate-300 rounded-lg hover:pl-3.5 duration-300"
                    }`}
                  >
                    <span>{item.icon}</span>
                    <span className="ml-[16px]">{item.title}</span>
                  </Link>
                </li>
                {[
                  "Categories",
                  "Dashboard",
                  "Discount Product",
                  "Sellers Request",
                  "Live Chat",
                  "Profile",
                ].includes(item.title) && (
                  <li>
                    <Divider
                      key={`${index}-divider`}
                      sx={{ marginY: "16px" }}
                      color="#8B8B8B"
                      orientation="horizontal"
                      variant="middle"
                      flexItem
                    />
                  </li>
                )}
              </React.Fragment>
            ))}
            <li className="flex items-center">
              <Link
                onClick={() => dispatch(logout({ navigate, role }))}
                className="flex items-center 
                         text-[#030811] px-[10px] py-[5px] w-full hover:bg-red-500 rounded-lg hover:pl-3.5 duration-300 hover:text-white"
              >
                <span>
                  <SlLogout />
                </span>
                <span className="ml-[16px]">Logout</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Slidebar;
