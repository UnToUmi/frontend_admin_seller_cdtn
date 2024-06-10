import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaE } from "react-icons/fa6";
import { FaEdit, FaTrash } from "react-icons/fa";
import { FaImage } from "react-icons/fa";
import { IoMdCloseCircle } from "react-icons/io";
import {
  PropagateLoader,
  PulseLoader,
  ScaleLoader,
  SyncLoader,
} from "react-spinners";
import { overrideStyle } from "../../utils/utils";
import {
  categoryAdd,
  messageClear,
  get_category,
} from "../../store/Reducers/categoryReducer";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import Search from "../components/Search";
import PaginationConfig from "../PaginationConfig";
import { Divider, TextField } from "@mui/material";
import { Input } from "./../components/Input";
import { FormattedMessage } from "react-intl";

const Category = () => {
  const dispatch = useDispatch();
  const {
    loaderTable,
    totalCategory,
    loader,
    successMessage,
    errorMessage,
    categorys,
  } = useSelector((state) => state.category);
  const [errors, setErrors] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [searchValue, setSearchValue] = useState("");
  const [perPage, setPerPage] = useState(5);
  const [show, setShow] = useState(false);
  const [imageShow, setImageShow] = useState("");
  const [state, setState] = useState({
    name: "",
    image: "",
  });
  const [images, setImages] = useState([]);

  const imageHandle = (e) => {
    const files = e.target.files;
    const length = files.length;
    if (length > 0) {
      setImages([...images, ...files]);
      let imageUrl = [];
      imageUrl.push({ url: URL.createObjectURL(files[0]) });

      setImageShow([...imageShow, ...imageUrl]);
      setState({
        ...state,
        image: files[0],
      });
    }
    setErrors({
      ...errors,
      image: "",
    });
    console.log("imageShow", imageShow);
  };

  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage);
      dispatch(messageClear());
      setState({
        image: "",
        name: "",
      });
    }
    if (errorMessage) {
      toast.error(errorMessage);
      dispatch(messageClear());
    }
  }, [successMessage, errorMessage]);

  useEffect(() => {
    const obj = {
      perPage: parseInt(perPage),
      page: parseInt(currentPage),
      searchValue,
    };
    dispatch(get_category(obj));
  }, [searchValue, perPage, currentPage, successMessage]);

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

  const validateForm = () => {
    let tempErrors = {};
    let isValid = true;

    if (!state.name) {
      isValid = false;
      tempErrors["name"] = "Category name is required";
    }

    if (!state.image) {
      isValid = false;
      tempErrors["image"] = "A product image is required";
    }

    setErrors(tempErrors);
    return isValid;
  };
  const handleSubmit = (e) => {
    e.preventDefault(); // Ngăn chặn hành vi mặc định của form
    if (validateForm()) {
      // Xử lý submit form
      dispatch(categoryAdd(state));
    } else {
      console.log("Form is invalid, show errors");
    }
  };

  const removeImage = (i) => {
    const filterImage = images.filter((img, index) => index !== i);
    const filterImageUrl = imageShow.filter((img, index) => index !== i);

    setImages(filterImage);
    setImageShow(filterImageUrl);

    if (filterImage.length === 0) {
      setState({
        ...state,
        image: "",
      });
      setErrors({
        ...errors,
        image: "A product image is required",
      });
    } else {
      setErrors({
        ...errors,
        image: "",
      });
    }
  };

  // console.log("searchValue", searchValue);

  return (
    <div className="px-2 lg:px-7 pt-5">
      <div
        onClick={() => setShow(false)}
        className={
          show && `z-5 absolute w-screen h-screen bg-slate-600 opacity-30`
        }
      ></div>
      <div className="flex lg:hidden justify-between items-center mb-5 p-4 bg-[#e6e7fb] rounded-xl">
        <h1 className="text-black font-semibold text-lg">
          <FormattedMessage id="categories-dashboard.category" />
        </h1>
        <button
          onClick={() => setShow(true)}
          className="bg-purple-600 duration-200 hover:bg-purple-500 px-4 py-2 rounded-xl  cursor-pointer text-white text-sm"
        >
          <FormattedMessage id="categories-dashboard.add" />
        </button>
      </div>
      <div className="flex flex-wrap w-full">
        <div className="w-full lg:w-7/12">
          <div className="w-full p-4 bg-[#e6e7fb] rounded-xl">
            <div className="flex justify-between items-center">
              <p className="font-medium text-[28px]">
                <FormattedMessage id="categories-dashboard.categories" />

                <Divider
                  sx={{ marginTop: "8px", height: "1px" }}
                  color="000000"
                  orientation="horizontal"
                  variant="middle"
                  flexItem
                />
              </p>
              <Input
                setPerPage={setPerPage}
                setSearchValue={setSearchValue}
                searchValue={searchValue}
                perPage={perPage}
              />
            </div>
            <div className="duration-200 relative overflow-x-auto">
              <table className="w-full h-fit text-sm text-left text-black">
                <thead className="text-sm text-black uppercase  border-b-[2px] border-slate-700">
                  <tr>
                    <th scope="col" className="py-3 px-4">
                      <FormattedMessage id="categories-dashboard.no" />
                    </th>
                    <th scope="col" className="py-3 px-4">
                      <FormattedMessage id="categories-dashboard.image" />
                    </th>
                    <th scope="col" className="py-3 px-4">
                      <FormattedMessage id="categories-dashboard.name" />
                    </th>
                    <th scope="col" className="py-3 px-4">
                      <FormattedMessage id="categories-dashboard.action" />
                    </th>
                  </tr>
                </thead>

                {loaderTable ? (
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
                  <tbody className="w-full h-full">
                    {categorys.map((d, i) => (
                      <tr key={i} className="border-b border-slate-700">
                        <td
                          scope="row"
                          className="py-3 px-4 font-medium whitespace-nowrap"
                        >
                          {i + 1}
                        </td>
                        <td
                          scope="row"
                          className="py-1 px-4 font-medium whitespace-nowrap"
                        >
                          <img
                            className="w-[45px] h-[45px]"
                            src={d.image}
                            alt=""
                          />
                        </td>
                        <td
                          scope="row"
                          className="py-1 px-4 font-medium whitespace-nowrap"
                        >
                          {d.name}
                        </td>

                        <td
                          scope="row"
                          className="py-1 px-4 font-medium whitespace-nowrap"
                        >
                          <div className="flex justify-start items-center gap-4">
                            <Link
                              to={`/admin/dashboard/edit-category/${d._id}`}
                              className="p-[6px] bg-yellow-500 text-white rounded hover:bg-yellow-400 "
                            >
                              <FaEdit />
                            </Link>
                            <Link className="p-[6px] bg-red-500 rounded text-white hover:bg-red-400">
                              <FaTrash />
                            </Link>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                )}
              </table>
            </div>
            <div className="w-full flex justify-end mt-4 bottom-4 right-4">
              <PaginationConfig
                pageNumber={currentPage}
                setPageNumber={setCurrentPage}
                totalItem={totalCategory}
                perPage={perPage}
                showItem={3}
              />

              <Divider
                sx={{ marginX: "16px", height: "40px" }}
                color="000000"
                orientation="vertical"
                variant="fullWidth"
                flexItem
              />
              <Search
                setPerPage={setPerPage}
                setSearchValue={setSearchValue}
                searchValue={searchValue}
                perPage={perPage}
              />
            </div>
          </div>
        </div>
        <div
          className={`w-[320px] lg:w-5/12 lg:relative   translate-x-100 lg:right-0 fixed ${
            show ? "right-0" : "-right-[340px]"
          }  z-10 top-0 transition-all duration-500 `}
        >
          <div className="w-full pl-5 ">
            <div className="bg-[#e6e7fb] h-screen lg:h-auto px-3 py-2 lg:rounded-xl text-black">
              <div className="flex justify-between items-center mb-4">
                <p className="  font-medium text-[28px] ">
                  <FormattedMessage id="categories-dashboard.add_a_category" />
                  <Divider
                    sx={{ marginTop: "8px", height: "1px" }}
                    color="000000"
                    orientation="horizontal"
                    variant="middle"
                    flexItem
                  />
                </p>

                <div
                  onClick={() => setShow(false)}
                  className="block hover:text-purple-600 duration-200 text-[20px] cursor-pointer lg:hidden"
                >
                  <IoMdCloseCircle />
                </div>
              </div>
              <form>
                <div className="flex  flex-col w-full gap-1 mb-3">
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
                <div>
                  <label
                    className={`
                bg-[#F5F5F5] duration-200 rounded-xl flex 
                justify-center items-center flex-col h-[180px]
                 cursor-pointer  w-full 
                   
                   ${
                     errors.image
                       ? "border-red-600 hover:border-red-400 border-[2px] border-dashed text-red-600 rounded-xl"
                       : "border-[2px] border-dashed hover:border-purple-800 text-black rounded-xl"
                   }
                   `}
                    htmlFor="image"
                  >
                    {imageShow && imageShow[0] ? (
                      <div className="w-full h-full flex ">
                        <img className="w-full h-full" src={imageShow[0].url} />
                        <span
                          onClick={() => removeImage(0)}
                          className="h-fit m-1 p-1 z-10 cursor-pointer bg-slate-400 hover:text-black duration-200  text-white  rounded-full"
                        >
                          <IoMdCloseCircle />
                        </span>
                      </div>
                    ) : (
                      <>
                        <span>
                          <FaImage />
                        </span>
                        <span>
                          <FormattedMessage id="categories-dashboard.select_image" />
                        </span>
                      </>
                    )}
                  </label>

                  <input
                    onChange={imageHandle}
                    className="hidden"
                    type="file"
                    name="image"
                    id="image"
                  />

                  {errors.image && (
                    <div
                      style={{
                        marginLeft: 20,
                        fontSize: "13px",
                        color: "#D32F2F",
                      }}
                    >
                      {errors.image}
                    </div>
                  )}
                  <Divider
                    sx={{
                      marginTop: "30px ",
                      marginBottom: "10px",
                      height: "1px",
                    }}
                    color="000000"
                    orientation="horizontal"
                    variant="fullWidth"
                    flexItem
                  />
                  <div className=" flex justify-center items-center">
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
                        <FormattedMessage id="categories-dashboard.add_category" />
                      )}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Category;
