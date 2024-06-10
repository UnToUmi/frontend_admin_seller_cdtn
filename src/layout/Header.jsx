import { Avatar, Divider, TextField } from "@mui/material";
import React from "react";
import { FaList } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { messageClear, setLanguage } from "../store/Reducers/authReducer";
import { useState } from "react";
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";
import { useEffect } from "react";
import { toast } from "react-hot-toast";

const Header = ({ showSidebar, setShowSidebar }) => {
  const { locale, successMessage, errorMessage, userInfo } = useSelector(
    (state) => state.auth
  );
  const [showLanguage, setShowLanguage] = useState(false);

  const dispatch = useDispatch();

  const toggleLanguageMenu = () => {
    setShowLanguage(!showLanguage);
  };

  const selectLanguage = (lang) => {
    dispatch(setLanguage(lang));
    setShowLanguage(false);
  };

  useEffect(() => {
    if (successMessage) {
      toast.success("Change the language successfully!");
      dispatch(messageClear());
    }
  }, [successMessage]);
  return (
    <div
      className=" w-full fixed top-0 left-0 px-2 md:px-7 py-5 z-10
  "
    >
      <div
        className="ml-0 lg:ml-[260px] h-[65px] bg-[#e6e7fb] rounded-xl
      flex justify-between items-center px-5 transition-all shadow-xl border-[2px] border-[#d4d5fa]
      "
      >
        <div
          onClick={() => setShowSidebar(!showSidebar)}
          className="w-[35px] flex lg:hidden h-[35px]
           text-gray-700 bg-slate-300
            hover:text-gray-900
           cursor-pointer rounded-xl justify-center items-center
           "
        >
          <span>
            <FaList />
          </span>
        </div>
        <div className=" md:block sm:block">
          <TextField
            sx={{ width: "160px" }}
            size="small"
            onDurationChange={2}
            type="text"
            id="standard-basic"
            label="Search..."
            variant="outlined"
            color="success"
            InputProps={{
              style: { borderRadius: 16, backgroundColor: "whitesmoke" }, // Thay đổi borderRadius ở đây
            }}
          />
        </div>
        <div className="flex justify-center items-center gap-8 relative">
          <div className="flex justify-center items-center">
            <div className=" flex justify-center items-center gap-5">
              <div
                className=" flex relative cursor-pointer text-slate-800 text-sm justify-center items-center gap-1"
                onClick={toggleLanguageMenu}
              >
                <img
                  src={`${
                    locale === "vi"
                      ? "https://st.quantrimang.com/photos/image/2021/09/05/Co-Vietnam.png"
                      : "https://kenh14cdn.com/thumb_w/660/2017/2-1503128133740.png"
                  }`}
                  alt=""
                  className="w-5 h-3 relative left-1"
                />
                <span className="transition duration-200 relative left-2">
                  {showLanguage ? <IoMdArrowDropup /> : <IoMdArrowDropdown />}
                </span>
                <ul
                  className={`
                  ${
                    showLanguage ? "visible" : "invisible"
                  } fixed transition-all duration-200 ${
                    showLanguage ? "top-[65px]" : "top-[50px]"
                  }   w-fit rounded-xl text-white p-4 flex flex-col gap-3 bg-black`}
                >
                  <li
                    onClick={() => selectLanguage("vi")}
                    className={`${
                      locale === "vi"
                        ? "bg-slate-500 p-2 rounded-xl"
                        : "hover:bg-slate-400 p-2 rounded-xl duration-200"
                    }`}
                  >
                    Việt Nam
                  </li>
                  <Divider
                    sx={{ height: "1px" }}
                    color="#FFFFFF"
                    orientation="horizontal"
                    variant="fullWidth"
                    flexItem
                  />
                  <li
                    onClick={() => selectLanguage("en")}
                    className={`${
                      locale === "en"
                        ? "bg-slate-500 p-2 rounded-xl"
                        : "hover:bg-slate-400 p-2 rounded-xl duration-200"
                    }`}
                  >
                    English
                  </li>
                </ul>
              </div>
              <div
                className="flex justify-center items-center flex-col
              text-end
              "
              >
                <h2 className="font-bold text-lg">{userInfo.name}</h2>
                <span className="text-[14px] w-full font-normal">
                  {userInfo.role}
                </span>
              </div>
              <div>
                <Avatar
                  sx={{
                    borderRadius: "9999px",
                    overflow: "hidden",
                    cursor: "pointer",
                  }}
                  alt="Img User"
                  src={userInfo?.image}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
