import React, { useCallback, useEffect, useState } from "react";
import { FaImages } from "react-icons/fa6";
import { FadeLoader, PulseLoader, ScaleLoader } from "react-spinners";
import { FaRegEdit } from "react-icons/fa";
import { Avatar, Divider, TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  profile_image_upload,
  messageClear,
  profile_info_add,
} from "../../store/Reducers/authReducer";
import toast from "react-hot-toast";
import { overrideStyle } from "../../utils/utils";
import { create_stripe_connect_account } from "../../store/Reducers/sellerReducer";

const Profile = () => {
  const [isEditMode, setIsEditMode] = useState(false);

  const [errors, setErrors] = useState({});
  const [state, setState] = useState({
    email: "",
    old_password: "",
    new_password: "",
  });

  const [stateShopInfo, setStateShopInfo] = useState({
    division: "",
    district: "",
    shopName: "",
    sub_district: "",
  });
  const status = "ACTIVE";

  const dispatch = useDispatch();
  const { userInfo, loader, successMessage } = useSelector(
    (state) => state.auth
  );

  const add_image = (e) => {
    if (e.target.files.length > 0) {
      const formData = new FormData();
      formData.append("image", e.target.files[0]);
      // console.log("formData", formData);
      dispatch(profile_image_upload(formData));
    }
  };

  const validateField = useCallback((name, value) => {
    switch (name) {
      case "email":
        if (!value) return "Your email is required";
        if (!/^[^@]+@gmail\.com$/.test(value))
          return "Email must end with @gmail.com";
        return "";
      case "shopName":
        if (!value) return "Your shop name is required";
        return "";
      case "division":
        if (!value) return "Your division shop is required";
        return "";
      case "district":
        if (!value) return "Your district shop is required";
        return "";
      case "sub_district":
        if (!value) return "Your sub district shop is required";

        return "";
      case "old_password":
      case "new_password":
        if (!value) return `Your ${name.replace("_", " ")} is required`;
        return "";
      default:
        return "";
    }
  }, []);

  const validateForm = useCallback(() => {
    const tempErrors = Object.keys(state).reduce((acc, key) => {
      const error = validateField(key, state[key]);
      if (error) acc[key] = error;
      return acc;
    }, {});

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  }, [state, validateField]);

  const validateFormShopInfo = useCallback(() => {
    const tempErrors = Object.keys(stateShopInfo).reduce((acc, key) => {
      const error = validateField(key, stateShopInfo[key]);
      if (error) acc[key] = error;
      return acc;
    }, {});
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  }, [stateShopInfo, validateField]);

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      if (validateForm()) {
        console.log("Form is valid, submit the form");
      } else {
        console.log("Form is invalid, show errors");
      }
    },
    [validateForm]
  );

  const add = useCallback(
    (e) => {
      e.preventDefault();
      if (validateFormShopInfo()) {
        console.log("Form is valid, submit the form");
        dispatch(profile_info_add(stateShopInfo));
        setIsEditMode(false); // Exit edit mode after saving
      } else {
        console.log("Form is invalid, show errors");
      }

      // console.log("stateShopInfo", stateShopInfo);
    },
    [validateFormShopInfo]
  );

  const inputHandle = (e) => {
    const { name, value } = e.target;
    // console.log("name", name);
    // console.log("value", value);

    const error = validateField(name, value);

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: error,
    }));

    setState({ ...state, [name]: value });
    setStateShopInfo({ ...stateShopInfo, [name]: value });
    // console.log("stateShopInfo", stateShopInfo);
    // console.log("setState", state);
  };

  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage);
      messageClear();
    }
  }, [successMessage]);
  return (
    <div className="px-2 lg:px-7 py-5">
      <div className="w-full flex flex-wrap">
        <div className="w-full md:w-6/12">
          <div className="w-full p-4 bg-[#e6e7fb] rounded-xl text-black">
            <p className="ml-3 font-medium mb-8 w-fit text-[28px]">
              Seller Information
              <Divider
                sx={{ marginTop: "8px", height: "1px" }}
                color="000000"
                orientation="horizontal"
                variant="middle"
                flexItem
              />
            </p>
            <div className="flex justify-center items-center py-3">
              {userInfo?.image ? (
                <label htmlFor="img">
                  {loader ? (
                    <div className="bg-slate-400 w-[150px] h-[150px] rounded-full flex justify-center items-center">
                      <span>
                        <PulseLoader
                          speedMultiplier={1}
                          height={40}
                          width={6}
                          color="#E2A6FF"
                          cssOverride={overrideStyle}
                        />
                      </span>
                    </div>
                  ) : (
                    <Avatar
                      className="hover:shadow-slate-400 shadow-lg"
                      sx={{ cursor: "pointer", width: 150, height: 150 }}
                      src={userInfo.image}
                    />
                  )}
                </label>
              ) : (
                <label
                  className="flex hover:bg-[#dadada] rounded-full bg-[#F5F5F5]  justify-center items-center flex-col h-[150px] w-[150px] cursor-pointer  border-dashed border-[2px] hover:border-purple-500 border-purple-400 "
                  htmlFor="img"
                >
                  {!loader ? (
                    <>
                      <span>
                        <FaImages />
                      </span>
                      <span>Select Image</span>
                    </>
                  ) : (
                    <div className="bg-slate-400 w-[150px] h-[150px] rounded-full flex justify-center items-center">
                      <span>
                        <PulseLoader
                          speedMultiplier={1}
                          height={40}
                          width={6}
                          color="#E2A6FF"
                          cssOverride={overrideStyle}
                        />
                      </span>
                    </div>
                  )}
                </label>
              )}
              <input
                onChange={add_image}
                type="file"
                className="hidden"
                id="img"
              />
            </div>

            <div className="px-0 md:px-5 py-2">
              <div className="flex justify-between text-sm flex-col gap-2 p-4 bg-slate-300 rounded-xl relative">
                <span className="p-[6px] bg-yellow-500 rounded-xl duration-200 hover:bg-yellow-400 absolute right-2 top-2 cursor-pointer">
                  <FaRegEdit />
                </span>
                <div className="flex gap-2">
                  <span>Name : </span>
                  <span>{userInfo.name}</span>
                </div>
                <div className="flex gap-2">
                  <span>Email : </span>
                  <span>{userInfo.email}</span>
                </div>
                <div className="flex gap-2">
                  <span>Role : </span>
                  <span>{userInfo.role}</span>
                </div>
                <div className="flex gap-2">
                  <span>Status : </span>
                  <span className="bg-green-500 text-white text-xs cursor-pointer font-normal ml-2 px-2 py-0.5 rounded-xl">
                    {userInfo.status}
                  </span>
                </div>
                <div className="flex gap-2">
                  <span>Payment Account : </span>
                  <p>
                    {userInfo.payment === "active" ? (
                      <span className="bg-red-500 text-white text-xs cursor-pointer font-normal ml-2 px-2 py-0.5 rounded">
                        {userInfo.payment}
                      </span>
                    ) : (
                      <span
                        onClick={() =>
                          dispatch(create_stripe_connect_account())
                        }
                        className="bg-blue-500 text-white text-xs cursor-pointer font-normal duration-200 ml-2 px-2 py-1 hover:bg-blue-400 rounded"
                      >
                        Click Active
                      </span>
                    )}
                  </p>
                </div>
              </div>
            </div>

            <div className="px-0 md:px-5 py-2">
              {!userInfo?.shopInfo || isEditMode ? (
                <>
                  {/* {isEditMode && ( */}
                  <div className="flex items-center text-center px-3 justify-center py-2 h-fit w-full rounded-full bg-red-200 text-red-600 mb-5">
                    You don't have your shop information. Please fill out the
                    form below!
                  </div>
                  {/* // )} */}
                  <form>
                    <div className="flex flex-col w-full gap-1 mb-5">
                      <TextField
                        error={!!errors.shopName}
                        helperText={errors.shopName}
                        value={stateShopInfo.shopName}
                        required
                        onChange={inputHandle}
                        className="w-full"
                        size="small"
                        type="text"
                        name="shopName"
                        id="standard-basic"
                        label="Shop name"
                        variant="outlined"
                        color="success"
                        InputProps={{
                          style: {
                            borderRadius: 16,
                            backgroundColor: "whitesmoke",
                          },
                        }}
                      />
                    </div>

                    <div className="flex flex-col w-full gap-1 mb-5">
                      <TextField
                        error={!!errors.division}
                        helperText={errors.division}
                        value={stateShopInfo.division}
                        required
                        onChange={inputHandle}
                        className="w-full"
                        size="small"
                        type="text"
                        name="division"
                        id="standard-basic"
                        label="Division Name"
                        variant="outlined"
                        color="success"
                        InputProps={{
                          style: {
                            borderRadius: 16,
                            backgroundColor: "whitesmoke",
                          },
                        }}
                      />
                    </div>
                    <div className="flex flex-col w-full gap-1 mb-5">
                      <TextField
                        error={!!errors.district}
                        helperText={errors.district}
                        value={stateShopInfo.district}
                        required
                        onChange={inputHandle}
                        className="w-full"
                        size="small"
                        type="text"
                        name="district"
                        id="standard-basic"
                        label="District Name"
                        variant="outlined"
                        color="success"
                        InputProps={{
                          style: {
                            borderRadius: 16,
                            backgroundColor: "whitesmoke",
                          },
                        }}
                      />
                    </div>
                    <div className="flex flex-col w-full gap-1 mb-5">
                      <TextField
                        error={!!errors.sub_district}
                        helperText={errors.sub_district}
                        value={stateShopInfo.sub_district}
                        required
                        onChange={inputHandle}
                        className="w-full"
                        size="small"
                        type="text"
                        name="sub_district"
                        id="standard-basic"
                        label="Sub District Name"
                        variant="outlined"
                        color="success"
                        InputProps={{
                          style: {
                            borderRadius: 16,
                            backgroundColor: "whitesmoke",
                          },
                        }}
                      />
                    </div>
                    <Divider
                      sx={{ marginTop: "8px", height: "1px" }}
                      color="000000"
                      orientation="horizontal"
                      variant="fullWidth"
                      flexItem
                    />

                    <button
                      onClick={(e) => add(e)}
                      disabled={loader ? true : false}
                      className="bg-purple-700 hover:bg-purple-600 w-full duration-200 text-white rounded-xl mt-5  px-7 py-2 my-2"
                    >
                      {loader ? (
                        <ScaleLoader
                          speedMultiplier={1.3}
                          height={25}
                          width={4}
                          color="#90DBFF"
                          cssOverride={overrideStyle}
                        />
                      ) : (
                        "Save changes"
                      )}
                    </button>
                  </form>
                </>
              ) : (
                <div className="flex justify-between text-sm flex-col gap-2 p-4 bg-slate-300 rounded-xl relative">
                  <span
                    onClick={() => setIsEditMode(!isEditMode)}
                    className="p-[6px] bg-yellow-500 rounded-xl  hover:bg-yellow-400 absolute right-2 top-2 cursor-pointer"
                  >
                    <FaRegEdit />
                  </span>
                  <div className="flex gap-2">
                    <span>Shop Name : </span>
                    <span>{userInfo.shopInfo?.shopName}</span>
                  </div>
                  <div className="flex gap-2">
                    <span>Division : </span>
                    <span>{userInfo.shopInfo?.division}</span>
                  </div>
                  <div className="flex gap-2">
                    <span>District : </span>
                    <span>{userInfo.shopInfo?.district}</span>
                  </div>
                  <div className="flex gap-2">
                    <span>Sub District : </span>
                    <span>{userInfo.shopInfo?.sub_district}</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="w-full md:w-6/12">
          <div className="w-full pl-0 md:pl-7 mt-6 md:mt-0">
            <div className="bg-[#e6e7fb] rounded-xl text-black p-4">
              <p className="font-medium mb-8 w-fit text-[28px]">
                Change Password
                <Divider
                  sx={{ marginTop: "8px", height: "1px" }}
                  color="000000"
                  orientation="horizontal"
                  variant="middle"
                  flexItem
                />
              </p>
              <form className="flex flex-col gap-5">
                <div className="flex flex-col w-full gap-1 mb-2">
                  <TextField
                    error={!!errors.email}
                    helperText={errors.email}
                    defaultValue={state.email}
                    required
                    onChange={inputHandle}
                    className="w-full"
                    size="small"
                    type="email"
                    name="email"
                    id="standard-basic"
                    label="Email"
                    variant="outlined"
                    color="success"
                    InputProps={{
                      style: {
                        borderRadius: 16,
                        backgroundColor: "whitesmoke",
                      },
                    }}
                  />
                </div>

                <div className="flex flex-col w-full gap-1 mb-2">
                  <TextField
                    error={!!errors.old_password}
                    helperText={errors.old_password}
                    defaultValue={state.old_password}
                    required
                    onChange={inputHandle}
                    className="w-full"
                    size="small"
                    type="password"
                    name="old_password"
                    id="standard-basic"
                    label="Old Password"
                    variant="outlined"
                    color="success"
                    InputProps={{
                      style: {
                        borderRadius: 16,
                        backgroundColor: "whitesmoke",
                      },
                    }}
                  />
                </div>

                <div className="flex flex-col w-full gap-1 mb-2">
                  <TextField
                    error={!!errors.new_password}
                    helperText={errors.new_password}
                    defaultValue={state.new_password}
                    required
                    onChange={inputHandle}
                    className="w-full"
                    size="small"
                    type="password"
                    name="new_password"
                    id="standard-basic"
                    label="New Password"
                    variant="outlined"
                    color="success"
                    InputProps={{
                      style: {
                        borderRadius: 16,
                        backgroundColor: "whitesmoke",
                      },
                    }}
                  />
                </div>

                <button
                  onClick={handleSubmit}
                  className="bg-purple-700 hover:bg-purple-600 duration-200 text-white rounded-xl px-7 py-2 my-2"
                >
                  Save Changes
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Profile;
