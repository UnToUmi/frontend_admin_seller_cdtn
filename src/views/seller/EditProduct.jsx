import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { IoMdCloseCircle } from "react-icons/io";
import { IoMdImages } from "react-icons/io";

import { Divider, TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { get_category } from "../../store/Reducers/categoryReducer";
import {
  get_product,
  messageClear,
  product_image_update,
  update_product,
} from "../../store/Reducers/productReducer";
import { PulseLoader, ScaleLoader } from "react-spinners";
import { overrideStyle } from "../../utils/utils";
import toast from "react-hot-toast";
import { MdArrowBackIos } from "react-icons/md";
const EditProduct = () => {
  const [errors, setErrors] = useState({});
  const [images, setImages] = useState([]);
  const [imageShow, setImageShow] = useState([]);
  const { productId } = useParams();

  const dispatch = useDispatch();
  const { categorys } = useSelector((state) => state.category);
  const [state, setState] = useState({
    name: "",
    description: "",
    discount: "",
    price: "",
    brand: "",
    stock: "",
  });
  const [cateShow, setCateShow] = useState(false);
  const [category, setCategory] = useState("");
  const [allCategory, setAllCategory] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const { product, loaderPicture, loader, successMessage, errorMessage } =
    useSelector((state) => state.product);

  const handleCategorySelect = (item) => {
    setCateShow(false);
    setCategory(item.name);
    setSearchValue("");
    setAllCategory(categorys);

    // Cập nhật trạng thái lỗi để loại bỏ lỗi cho trường category
    setErrors({
      ...errors,
      category: "",
    });
  };

  useEffect(() => {
    if (categorys.length > 0) {
      setAllCategory(categorys);
    }
  }, [categorys]);

  const validateForm = () => {
    let tempErrors = {};
    let isValid = true;

    if (!state.name) {
      isValid = false;
      tempErrors["name"] = "Product name is required";
    }
    if (!state.brand) {
      isValid = false;
      tempErrors["brand"] = "Product brand is required";
    }
    if (!state.stock) {
      isValid = false;
      tempErrors["stock"] = "Product stock is required";
    }
    if (!state.price) {
      isValid = false;
      tempErrors["price"] = "Product price is required";
    }
    if (!state.discount) {
      isValid = false;
      tempErrors["discount"] = "Product discount is required";
    }
    if (!state.description) {
      isValid = false;
      tempErrors["description"] = "Product description is required";
    }
    if (!category) {
      isValid = false;
      tempErrors["category"] = "Product category is required";
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

  const parseInteger = (value) => {
    return parseInt(String(value).replace(/\./g, ""), 10);
  };

  const handleSubmit = (e) => {
    const updatedImages = imageShow.map((img) => img.url || img);
    e.preventDefault(); // Ngăn chặn hành vi mặc định của form
    if (validateForm()) {
      const obj = {
        name: state.name,
        description: state.description,
        discount: parseInt(state.discount),
        price: parseInteger(state.price),
        brand: state.brand,
        stock: parseInteger(state.stock),
        images: updatedImages, // Gửi danh sách ảnh đã được cập nhật
        productId: productId,
      };
      console.log("obj", obj);
      dispatch(update_product(obj));
    } else {
      console.log("Form is invalid, show errors");
    }
  };

  const imageHandle = (e) => {
    const files = e.target.files;
    const length = files.length;

    if (length > 0) {
      const newImages = Array.from(files).map((file) => ({
        file: file,
        url: URL.createObjectURL(file), // Temporary URL for display
      }));

      setImages([...images, ...files]); // Keep track of new images
      setImageShow([...imageShow, ...newImages]); // Update `imageShow`

      // Send the new image to the backend
      dispatch(
        product_image_update({
          oldImage: "", // No old image, because this is a new addition
          newImage: files[0], // The new image to be added
          productId, // Product ID
        })
      );

      setErrors({
        ...errors,
        images: "",
      });
    }
  };

  const changeImage = (img, files) => {
    if (files.length > 0) {
      dispatch(
        product_image_update({
          oldImage: img,
          newImage: files[0],
          productId,
        })
      );
    }
  };

  const removeImage = (img, index) => {
    // console.log("removeImage", img);
    dispatch(
      product_image_update({
        oldImage: img, // URL của ảnh cũ
        newImage: "", // Không có ảnh mới
        productId, // ID sản phẩm cần cập nhật
      })
    );

    if (imageShow.length === 0) {
      setErrors({
        ...errors,
        images: "At least one product image is required",
      });
    } else {
      setErrors({
        ...errors,
        images: "",
      });
    }
  };

  const formatNumber = (number) => {
    return String(number).replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  useEffect(() => {
    setState({
      name: product.name,
      description: product.description,
      discount: product.discount,
      price: formatNumber(product.price),

      brand: product.brand,
      stock: formatNumber(product.stock),
    });
    setCategory(product.category);
    setImageShow(product.images);
    // console.log("product.images", product.images);
  }, [product]);

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

    if (name === "stock" || name === "price") {
      const formattedValue = value
        .replace(/\D/g, "")
        .replace(/\B(?=(\d{3})+(?!\d))/g, ".");
      setState({
        ...state,
        [name]: formattedValue,
      });
    } else if (name === "discount") {
      if (value.trim() === "" || isNaN(value)) {
        setState({
          ...state,
          [name]: "",
        });
      } else {
        let numericValue = parseInt(value.replace(/\D/g, ""), 10);
        if (numericValue > 100) {
          numericValue = 100;
        }
        setState({
          ...state,
          [name]: numericValue.toString(),
        });
      }
    } else {
      setState({
        ...state,
        [name]: value,
      });
    }
  };

  const categorySearch = (e) => {
    const value = e.target.value;
    setSearchValue(value);
    if (value) {
      let srcValue = allCategory.filter(
        (c) => c.name.toLowerCase().indexOf(value.toLowerCase()) > -1
      );
      setAllCategory(srcValue);
    } else {
      setAllCategory(categorys);
    }
  };

  useEffect(() => {
    dispatch(
      get_category({
        searchValue: "",
        perPage: "",
        page: "",
      })
    );
  }, []);

  useEffect(() => {
    dispatch(get_product(productId));
  }, [productId]);
  return (
    <div className="px-2 lg:px-7 pt-5">
      <div className="w-full p-4 bg-[#e6e7fb] rounded-xl">
        <div className="flex justify-between items-center py-2 my-6 mb-10">
          <div className="flex ">
            <Link
              to="/seller/dashboard/products"
              className="duration-200 hover:text-slate-700 font-medium text-[28px] w-fit  flex items-center"
            >
              <MdArrowBackIos className="flex absolute top-[160px] left-[40px] lg:top-[160px] lg:left-[315px]" />
              <p className="w-fit flex flex-col absolute left-[60px] lg:left-[335px]">
                Edit The Product
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
                  label="Product Name"
                  variant="outlined"
                  color="success"
                  InputProps={{
                    style: { borderRadius: 16, backgroundColor: "whitesmoke" }, // Thay đổi borderRadius ở đây
                  }}
                />
              </div>
              <div className="mt-3 flex flex-col w-full gap-1">
                <TextField
                  error={!!errors.brand}
                  helperText={errors.brand}
                  value={state.brand}
                  required
                  onChange={inputHandle}
                  className="w-full"
                  size="small"
                  type="text"
                  name="brand"
                  id="standard-basic"
                  label="Product Brand"
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
            <div className="flex mt-6 flex-col mb-3 md:flex-row gap-4 w-full text-black">
              <div className="flex flex-col w-full gap-1 relative">
                <input
                  required
                  readOnly
                  onClick={() => setCateShow(!cateShow)}
                  className={`px-4 py-[8px] border hover:border-black border-slate-800/50 outline-none
                   bg-[#F5F5F5]  rounded-[16px]
                     cursor-pointer
                  ${
                    errors.category
                      ? "border border-red-600 hover:border-red-600 text-red-600 "
                      : "border hover:border-black border-slate-800/50 text-black"
                  }
                  `}
                  onChange={inputHandle}
                  value={category}
                  type="text"
                  id="category"
                  placeholder="--Select category-- *"
                />
                {errors.category && (
                  <div
                    style={{
                      marginLeft: 12,
                      fontSize: "13px",
                      color: "#D32F2F",
                    }}
                  >
                    {errors.category}
                  </div>
                )}

                <div
                  className={`m-1 rounded-xl absolute overflow-y-scroll top-[101%] bg-slate-500 w-full transition-all ${
                    cateShow ? "scale-100" : "scale-0"
                  } `}
                  style={{
                    zIndex: 100,
                    transition: "max-height 0.4s ease-in-out",
                    maxHeight: cateShow ? "300px" : "0",
                  }}
                >
                  <div className="w-full px-4 py-2 top-2 sticky overflow-hidden">
                    <input
                      value={searchValue}
                      onChange={categorySearch}
                      className="px-3 py-1 w-full outline-none bg-slate-300 rounded-xl text-black"
                      type="text"
                      placeholder="Search"
                    />
                  </div>
                  <div className="pt-4"></div>
                  <div className="px-4 flex justify-start items-start flex-col h-[200px] ">
                    {allCategory.length > 0 &&
                      allCategory.map((item, index) => (
                        <span
                          onClick={() => handleCategorySelect(item)}
                          className={`px-4 mt-2 py-1 duration-200 hover:bg-slate-400 hover:rounded-xl hover:text-white hover:shadow-lg w-full cursor-pointer ${
                            category === item.name && "bg-slate-300 rounded-xl"
                          }`}
                        >
                          {item.name}
                          <Divider
                            sx={{ marginTop: "5px", height: "1px" }}
                            color="000000"
                            orientation="horizontal"
                            variant="fullWidth"
                            flexItem
                          />
                        </span>
                      ))}
                  </div>
                </div>
              </div>
              <div className="flex  flex-col w-full gap-1">
                <TextField
                  error={!!errors.stock}
                  helperText={errors.stock}
                  value={state.stock}
                  required
                  onChange={inputHandle}
                  className="w-full"
                  size="small"
                  type="text" // Thay đổi type thành "text" để cho phép nhập giá trị đã format
                  name="stock" // Đảm bảo rằng thuộc tính name được đặt đúng để hàm inputHandle có thể nhận biết
                  id="standard-basic"
                  label="Product Stock"
                  variant="outlined"
                  color="success"
                  InputProps={{
                    style: { borderRadius: 16, backgroundColor: "whitesmoke" },
                  }}
                />
              </div>
            </div>

            <div className="flex mt-6 flex-col mb-3 md:flex-row gap-4 w-full text-black">
              <div className="flex flex-col w-full gap-1">
                <TextField
                  error={!!errors.price}
                  helperText={errors.price}
                  value={state.price}
                  required
                  onChange={inputHandle}
                  className="w-full"
                  size="small"
                  type="text"
                  name="price"
                  id="standard-basic"
                  label="Product Price (VND)"
                  variant="outlined"
                  color="success"
                  InputProps={{
                    style: { borderRadius: 16, backgroundColor: "whitesmoke" },
                  }}
                />
              </div>

              <div className="flex flex-col w-full gap-1">
                <TextField
                  error={!!errors.discount}
                  helperText={errors.discount}
                  value={state.discount}
                  required
                  onChange={inputHandle}
                  className="w-full"
                  size="small"
                  type="text" // Cho phép chỉ nhập số
                  name="discount"
                  id="standard-basic"
                  label="Product Discount (?%)"
                  variant="outlined"
                  color="success"
                  InputProps={{
                    style: { borderRadius: 16, backgroundColor: "whitesmoke" },
                  }}
                  inputProps={{
                    min: "0", // Giá trị tối thiểu
                    max: "100", // Giá trị tối đa
                  }}
                />
              </div>
            </div>

            <div className="flex mt-6 duration-200 flex-col w-full gap-1 mb-5">
              <TextField
                required
                id="outlined-multiline-static"
                label="Description"
                multiline
                rows={4}
                name="description"
                onChange={inputHandle}
                error={!!errors.description}
                helperText={errors.description}
                value={state.description}
                color="success"
                InputProps={{
                  style: { borderRadius: 16, backgroundColor: "whitesmoke" },
                }}
              />
            </div>
            {/* <div className="grid lg:grid-cols-4 grid-cols-1 md:grid-cols-3 sm:grid-cols-2 sm:gap-4 md:gap-4 gap-3 w-full text-[#d0d2d6] mb-4">
              {imageShow &&
                imageShow.length > 0 &&
                imageShow.map((img, i) => (
                  <div>
                    <label htmlFor={i}>
                      <img src={img} alt="" />
                    </label>
                    <input
                      onChange={(e) => changeImage(img, e.target.files)}
                      type="file"
                      id={i}
                      className="hidden"
                    />
                  </div>
                ))}
            </div> */}
            <div className="grid lg:grid-cols-4 grid-cols-1 md:grid-cols-3 sm:grid-cols-2 sm:gap-4 md:gap-4 gap-3 w-full text-black  mb-4">
              {imageShow &&
                imageShow.length > 0 &&
                imageShow.map((item, index) => (
                  <div className="h-[180px] relative bg-[#F5F5F5] rounded-xl">
                    {loaderPicture ? (
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
                        <label htmlFor={index}>
                          <img
                            className="w-full h-full rounded-xl"
                            src={item}
                            alt=""
                          />
                        </label>
                        <input
                          onChange={(e) => changeImage(item, e.target.files)}
                          type="file"
                          id={index}
                          className="hidden"
                        />
                        <span
                          onClick={(e) => removeImage(item, index)}
                          className="m-1 p-1 z-10 cursor-pointer bg-slate-400 hover:text-black duration-200  text-white absolute top-1 right-1 rounded-full"
                        >
                          <IoMdCloseCircle />
                        </span>
                      </>
                    )}
                  </div>
                ))}

              <label
                className={`
                bg-[#F5F5F5] duration-200 rounded-xl flex 
                justify-center items-center flex-col h-[180px]
                 cursor-pointer  w-full
                   
                   ${
                     errors.images
                       ? "border-red-600 hover:border-red-400 border-[2px] border-dashed text-red-600"
                       : "border-[2px] border-dashed hover:border-purple-800 text-black"
                   }
                   `}
                htmlFor="image"
              >
                <span>
                  <IoMdImages />
                </span>
                <span>Select Image </span>
              </label>
              <input
                className="hidden"
                onChange={imageHandle}
                multiple
                type="file"
                id="image"
              />
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
                  "Edit The Product"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default EditProduct;
