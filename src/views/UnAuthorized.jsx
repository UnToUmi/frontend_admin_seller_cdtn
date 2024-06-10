import React, { useState, useEffect } from "react";
import { Avatar, Divider } from "@mui/material";
import { MdNoEncryptionGmailerrorred } from "react-icons/md";
import { useSelector } from "react-redux";

const UnAuthorized = () => {
  const { role } = useSelector((state) => state.auth);

  return (
    <div className="px-7 flex gap-7 justify-center items-center bg-[#E5F6FE] w-screen h-screen">
      <div className="flex bg-slate-300 w-[49%] h-[400px]">
        <Avatar
          variant="square"
          alt="401 picture"
          src="https://mlx3lspc9ed5.i.optimole.com/cb:HyqB.35717/w:auto/h:auto/q:mauto/https://www.bluehost.com/blog/wp-content/uploads/2023/06/what-is-a-401-error.png"
          sx={{ width: "100%", height: "100%" }}
        />
      </div>
      <Divider
        sx={{ marginTop: "10%", width: "2px", height: "400px" }}
        color="#017EFF"
        orientation="vertical"
        variant="fullWidth"
        flexItem
      />
      <div className="bg-[#E5F6FE] flex-col w-[49%] h-[400px] justify-center items-center flex">
        <MdNoEncryptionGmailerrorred className="text-pink-800 h-fit text-[60px]" />
        <span className="w-[100%] text-center mt-14 text-[40px] text-[#2D75D9] font-sans">
          {`You do not have access to the ${
            role === "ADMIN" ? "seller" : "admin"
          } page`}
        </span>
      </div>
    </div>
  );
};

export default UnAuthorized;
