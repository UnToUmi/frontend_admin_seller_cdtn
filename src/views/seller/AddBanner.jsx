import React, { useEffect, useState } from "react";
import { FaRegImage } from "react-icons/fa";
import { PropagateLoader, PulseLoader } from "react-spinners";
import { overrideStyle } from "../../utils/utils";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  add_banner,
  get_banner,
  messageClear,
  update_banner,
} from "../../store/Reducers/bannerReducer";
import toast from "react-hot-toast";
import { Divider } from "@mui/material";
import { Link } from "react-router-dom";
import { MdArrowBackIos } from "react-icons/md";

const AddBanner = () => {
  const { productId } = useParams();
  const dispatch = useDispatch();

  const { loader, successMessage, errorMessage, banner } = useSelector(
    (state) => state.banner
  );

  const [imageShow, setImageShow] = useState("");
  const [image, setImage] = useState("");

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

  const imageHandle = (e) => {
    const files = e.target.files;
    const length = files.length;

    if (length > 0) {
      setImage(files[0]);
      setImageShow(URL.createObjectURL(files[0]));
    }
  };

  const add = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("productId", productId);
    formData.append("mainban", image);
    dispatch(add_banner(formData));
  };

  const update = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("mainban", image);
    dispatch(update_banner({ info: formData, bannerId: banner._id }));
  };

  useEffect(() => {
    dispatch(get_banner(productId));
  }, [productId]);

  return (
    <div className="px-2 lg:px-7 pt-5">
      <div className="w-full p-4 bg-[#e6e7fb] rounded-xl">
        <div className="flex ">
          <Link
            to="/seller/dashboard/products"
            className="duration-200 hover:text-slate-700 font-medium text-[28px] w-fit  flex items-center"
          >
            <MdArrowBackIos />
            <p className="w-fit flex flex-col ">
              Add Banner
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

        {!banner && (
          <div>
            <form onSubmit={add}>
              <div className="mb-4 mt-6">
                <label
                  className="flex justify-center rounded-xl border-purple-300  items-center flex-col h-[180px] cursor-pointer border-dashed hover:border-purple-600 border-[2px] w-full text-black"
                  htmlFor="image"
                >
                  <span className="text-4xl">
                    <FaRegImage />
                  </span>
                  <span>Select Banner Image </span>
                </label>
                <input
                  required
                  onChange={imageHandle}
                  className="hidden"
                  type="file"
                  id="image"
                />
              </div>

              {imageShow && (
                <div className="mb-4">
                  <img
                    className="w-full h-[300px] bg-cover"
                    src={imageShow}
                    alt=""
                  />
                </div>
              )}

              <button
                disabled={loader ? true : false}
                className="bg-purple-600 w-[280px] relative -translate-x-1/2 left-1/2  hover:bg-purple-500 duration-200 text-white rounded-xl px-7 py-2 mb-3"
              >
                {loader ? (
                  <PulseLoader
                    speedMultiplier={1}
                    height={40}
                    width={6}
                    color="#E2A6FF"
                    cssOverride={overrideStyle}
                  />
                ) : (
                  "Add Banner"
                )}
              </button>
            </form>
          </div>
        )}

        {banner && (
          <div>
            {
              <div className="mb-4">
                <img className="w-full h-[300px]" src={banner.banner} alt="" />
              </div>
            }

            <form onSubmit={update}>
              <div className="mb-4">
                <label
                  className="flex justify-center rounded-xl border-purple-300  items-center flex-col h-[180px] cursor-pointer border-dashed hover:border-purple-600 border-[2px] w-full text-black"
                  htmlFor="image"
                >
                  <span className="text-4xl">
                    <FaRegImage />
                  </span>
                  <span>Select Banner Image </span>
                </label>
                <input
                  required
                  onChange={imageHandle}
                  className="hidden"
                  type="file"
                  id="image"
                />
              </div>

              {imageShow && (
                <div className="mb-4">
                  <img className="w-full h-[300px]" src={imageShow} alt="" />
                </div>
              )}

              <button
                disabled={loader ? true : false}
                className="bg-purple-600 w-[280px] hover:bg-purple-500 relative -translate-x-1/2 left-1/2  text-white rounded-xl duration-200 px-7 py-2 mb-3"
              >
                {loader ? (
                  <PulseLoader
                    speedMultiplier={1}
                    height={40}
                    width={6}
                    color="#E2A6FF"
                    cssOverride={overrideStyle}
                  />
                ) : (
                  "Update Banner"
                )}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddBanner;
