import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { IoMdCloseCircle } from "react-icons/io";
import { IoMdImages } from "react-icons/io";

import { Divider, TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  category_image_update,
  get_category,
  get_category_detail,
  messageClear,
  update_category,
} from "../../store/Reducers/categoryReducer";

import { PulseLoader, ScaleLoader } from "react-spinners";
import { overrideStyle } from "../../utils/utils";
import toast from "react-hot-toast";
import { MdArrowBackIos } from "react-icons/md";
const EditCategory = () => {
  const [errors, setErrors] = useState({});
  const [imageShow, setImageShow] = useState([]);
  const { categoryId } = useParams();

  const dispatch = useDispatch();
  const { category, successMessage, errorMessage, loaderImage, loader } =
    useSelector((state) => state.category);
  const [state, setState] = useState({
    name: "",
  });

  const validateForm = () => {
    let tempErrors = {};
    let isValid = true;

    if (!state.name) {
      isValid = false;
      tempErrors["name"] = "Category name is required";
    }

    if (imageShow.length === 0) {
      isValid = false;
      tempErrors["images"] = "At least one product image is required";
    } else {
      // Nếu có ảnh, đảm bảo không có lỗi cho trường images
      tempErrors["images"] = "";
    }

    setErrors(tempErrors);
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      const obj = {
        name: state.name,
        categoryId: categoryId,
      };
      //   console.log("obj", obj);
      dispatch(update_category(obj));
    } else {
      console.log("Form is invalid, show errors");
    }
  };

  const changeImage = (e) => {
    // console.log("img", img);
    // console.log("files", files);
    if (e.target.files.length > 0) {
      const formData = new FormData();
      formData.append("image", e.target.files[0]);
      formData.append("categoryId", categoryId);
      // console.log("formData", formData);
      dispatch(category_image_update(formData));
    }
  };

  useEffect(() => {
    setState({
      name: category.name,
    });
    setImageShow(category.image);
  }, [category]);

  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage);
      dispatch(messageClear());
    }
    if (errorMessage) {
      toast.error(errorMessage);
      dispatch(messageClear());
    }
  }, [successMessage, errorMessage]);

  const inputHandle = (e) => {
    const { name, value } = e.target;

    setErrors({
      ...errors,
      [name]: "",
    });

    setState({
      ...state,
      [name]: value,
    });
  };

  useEffect(() => {
    dispatch(get_category_detail(categoryId));
  }, [categoryId, successMessage]);
  return (
    <div className="px-2 lg:px-7 pt-5">
      <div className="w-full p-4 bg-[#e6e7fb] rounded-xl">
        <div className="flex justify-between items-center py-2 my-6 mb-10">
          <div className="flex ">
            <Link
              to="/admin/dashboard/category"
              className="duration-200 hover:text-slate-700 font-medium text-[28px] w-fit  flex items-center"
            >
              <MdArrowBackIos className="flex absolute top-[160px] left-[40px] lg:top-[160px] lg:left-[315px]" />
              <p className="w-fit flex flex-col absolute left-[60px] lg:left-[335px]">
                Edit The Category
                <Divider
                  sx={{ marginTop: "8px", height: "1px" }}
                  color="000000"
                  orientation="horizontal"
                  variant="middle"
                  flexItem
                />
              </p>
            </Link>
          </div>
          {/* <Link
            to="/seller/dashboard/products"
            className="bg-purple-800 duration-200 hover:bg-purple-700 text-white rounded-xl px-7 py-2 my-2"
          >
            All Product
          </Link> */}
        </div>
        <div>
          <form>
            <div className="flex flex-col gap-3">
              <div className="flex flex-col mb-3 md:flex-row gap-4 w-full text-black">
                <div className="mt-3 flex flex-col w-full gap-1">
                  <TextField
                    error={!!errors.name}
                    helperText={errors.name}
                    value={state.name}
                    required
                    onChange={inputHandle}
                    className="w-full"
                    size="small"
                    name="name"
                    type="text"
                    id="standard-basic"
                    label="Category Name"
                    variant="outlined"
                    color="success"
                    InputProps={{
                      style: {
                        borderRadius: 16,
                        backgroundColor: "whitesmoke",
                      }, // Thay đổi borderRadius ở đây
                    }}
                  />
                </div>
              </div>

              <div className=" text-black  mb-4">
                {category.image && (
                  <div className="h-fit relative bg-[#F5F5F5] rounded-xl">
                    {loaderImage ? (
                      <div className="w-full  mt-6 flex justify-center items-center">
                        <PulseLoader
                          speedMultiplier={1}
                          height={40}
                          width={6}
                          color="#E2A6FF"
                          cssOverride={overrideStyle}
                        />
                      </div>
                    ) : (
                      <>
                        <label htmlFor="imageInput">
                          <img
                            className="w-full h-fit bg-cover object-cover rounded-xl cursor-pointer"
                            src={category.image}
                            alt=""
                          />
                        </label>

                        <input
                          onChange={(e) => changeImage(e)}
                          type="file"
                          className="hidden"
                          id="imageInput"
                        />
                      </>
                    )}
                  </div>
                )}
              </div>
              {errors.images && (
                <div
                  style={{
                    marginLeft: 20,
                    fontSize: "13px",
                    color: "#D32F2F",
                  }}
                >
                  {errors.images}
                </div>
              )}
            </div>

            <Divider
              sx={{ marginTop: "30px ", marginBottom: "10px", height: "1px" }}
              color="000000"
              orientation="horizontal"
              variant="fullWidth"
              flexItem
            />
            <div className="flex justify-center items-center">
              <button
                onClick={handleSubmit}
                disabled={loader ? true : false}
                className="bg-blue-800 duration-200 hover:bg-blue-700  text-white rounded-xl px-7 py-2 my-2"
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
                  "Edit The Category"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default EditCategory;
