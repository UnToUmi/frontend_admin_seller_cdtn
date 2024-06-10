import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaEdit, FaEye, FaTrash } from "react-icons/fa";
import PaginationConfig from "../PaginationConfig";
import { Divider } from "@mui/material";
import { TbCurrencyDong } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";
import {
  delete_product,
  get_products,
} from "../../store/Reducers/productReducer";
import { Input } from "../components/Input";
import Search from "../components/Search";
import { PulseLoader } from "react-spinners";
import { overrideStyle } from "../../utils/utils";
import { LuImageMinus } from "react-icons/lu";

const Products = () => {
  const [descriptionExpanded, setDescriptionExpanded] = useState(false);
  const handleImageClick = (imageUrl) => {
    window.open(imageUrl, "_blank"); // Mở ảnh trong tab/ cửa sổ mới
  };
  const [currentPage, setCurrentPage] = useState(1);
  const [searchValue, setSearchValue] = useState("");
  const [parPage, setPerPage] = useState(5);
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();
  const { loaderTable, products, totalProduct, successMessage } = useSelector(
    (state) => state.product
  );
  const toggleDescription = () => {
    setDescriptionExpanded(!descriptionExpanded);
  };
  const [selectedProduct, setSelectedProduct] = useState({});

  const handleViewProduct = (product) => {
    setSelectedProduct(product);
    setShow(true);
  };

  const handleChange = (event) => {
    const selectedValue = event.target.value;
    setPerPage(selectedValue);
  };

  useEffect(() => {
    const obj = {
      parPage: parseInt(parPage),
      page: parseInt(currentPage),
      searchValue,
    };
    dispatch(get_products(obj));
  }, [searchValue, currentPage, parPage, successMessage]);

  return (
    <div className="px-2 lg:px-7 pt-5">
      {show && selectedProduct && (
        <div
          onClick={() => setShow(!show)}
          className="fixed top-0 z-50 left-0 h-screen w-screen bg-slate-700/50 flex justify-center items-center "
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-xl p-6 w-full max-w-3xl shadow-lg relative h-full overflow-y-scroll"
          >
            <div className="border-b-2 border-black pb-2 mb-4 text-xl font-semibold w-fit">
              Product Details
            </div>
            <div className="flex flex-col gap-4">
              <div className="text-lg font-medium">
                Product Name:{" "}
                <span className="font-normal">{selectedProduct.name}</span>
              </div>
              <div className="flex justify-between text-lg font-medium">
                <div>
                  Category:{" "}
                  <span className="font-normal">
                    {selectedProduct.category}
                  </span>
                </div>
                <div>
                  Brand:{" "}
                  <span className="font-normal">{selectedProduct.brand}</span>
                </div>
              </div>
              <div className="flex justify-between text-lg font-medium">
                <div className="flex items-center gap-2">
                  Price:{" "}
                  <span className="text-green-500 flex items-center">
                    {new Intl.NumberFormat("de-DE").format(
                      (selectedProduct.price *
                        (100 - selectedProduct.discount)) /
                        100
                    )}
                    <TbCurrencyDong />
                  </span>
                  {selectedProduct.discount > 0 && (
                    <span className="text-red-500 flex items-center line-through">
                      {new Intl.NumberFormat("de-DE").format(
                        selectedProduct.price
                      )}
                      <TbCurrencyDong />
                    </span>
                  )}
                </div>
                <div>
                  Discount:{" "}
                  <span className="text-orange-600">
                    {selectedProduct.discount}%
                  </span>
                </div>
              </div>
              <div className="flex items-center justify-between ">
                <div className="flex items-center text-lg font-medium gap-2">
                  Stock:{" "}
                  <span className="text-blue-600">
                    {new Intl.NumberFormat("de-DE").format(
                      selectedProduct.stock
                    )}
                  </span>
                </div>
                <div className="font-medium text-lg">
                  Rating:{" "}
                  <span className="text-yellow-600">
                    {selectedProduct.rating}
                  </span>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <div className="font-medium">Description:</div>
                <div>
                  {descriptionExpanded
                    ? selectedProduct.description
                    : selectedProduct.description.slice(0, 200) + "..."}
                  {selectedProduct.description.length > 200 && (
                    <button
                      onClick={toggleDescription}
                      className="ml-2 text-blue-500 hover:bg-blue-400 hover:text-white duration-200 rounded-xl px-2 py-1 "
                    >
                      {descriptionExpanded ? "See Less" : "See More"}
                    </button>
                  )}
                </div>
              </div>
              <div className="text-lg font-medium">
                Images:
                <div className="flex flex-wrap gap-3 mt-2 ">
                  {selectedProduct.images.map((image, idx) => (
                    <img
                      onClick={() => handleImageClick(image)}
                      key={idx}
                      className="w-[200px] cursor-pointer h-[200px] object-cover rounded-xl p-3 duration-200 border-[2px] border-white hover:border-green-600"
                      src={image}
                      alt={`Product ${idx + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>
            <button
              onClick={() => setShow(false)}
              className="absolute top-2 right-2 bg-red-500 text-white w-[30px] h-[30px] rounded-full hover:bg-red-400 duration-200"
            >
              X
            </button>
          </div>
        </div>
      )}
      <div className="w-full p-4 bg-[#e6e7fb] rounded-xl">
        <div className="flex justify-between items-center">
          <p className="font-medium text-[28px]">
            All Products
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
            perPage={parPage}
          />
        </div>

        <div className="mt-3 relative overflow-x-auto">
          <table className="w-full text-sm text-left text-black">
            <thead className="text-sm uppercase border-b-[2px] border-slate-700">
              <tr>
                <th scope="col" className="py-3 px-4">
                  No
                </th>
                <th scope="col" className="py-3 px-4">
                  Image
                </th>
                <th scope="col" className="py-3 px-4">
                  Name
                </th>
                <th scope="col" className="py-3 px-4">
                  Category
                </th>
                <th scope="col" className="py-3 px-4">
                  Brand
                </th>
                <th scope="col" className="py-3 px-4">
                  Price
                </th>
                <th scope="col" className="py-3 px-4">
                  Discount
                </th>
                <th scope="col" className="py-3 px-4">
                  Stock
                </th>
                <th scope="col" className="py-3 px-4">
                  Action
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
              <tbody>
                {products.map((item, index) => (
                  <tr className="border-b-[1px] border-black" key={index}>
                    <td
                      scope="row"
                      className="py-1 px-4 font-medium whitespace-nowrap"
                    >
                      {index + 1}
                    </td>
                    <td
                      scope="row"
                      className="py-1 px-4 font-medium whitespace-nowrap"
                    >
                      <img
                        className="w-[45px] h-[45px]"
                        src={item.images[0]}
                        alt=""
                      />
                    </td>
                    <td
                      scope="row"
                      className="py-1 px-4 font-medium whitespace-nowrap"
                    >
                      {item?.name?.slice(0, 15)}...
                    </td>
                    <td
                      scope="row"
                      className="py-1 px-4 font-medium whitespace-nowrap"
                    >
                      {item.category}
                    </td>
                    <td
                      scope="row"
                      className="py-1 px-4 font-medium whitespace-nowrap"
                    >
                      <span>{item.brand}</span>
                    </td>

                    <td
                      scope="row"
                      className="  py-1 px-4 font-medium whitespace-nowrap"
                    >
                      <div className=" flex text-[#28D45C] items-center  py-3  font-medium">
                        {new Intl.NumberFormat("de-DE").format(item.price)}
                        <TbCurrencyDong />
                      </div>
                    </td>

                    <td
                      scope="row"
                      className="py-1 text-orange-600 px-4 font-medium whitespace-nowrap"
                    >
                      {item.discount}%
                    </td>

                    <td
                      scope="row"
                      className="py-1 px-4 text-blue-600 font-medium whitespace-nowrap"
                    >
                      {new Intl.NumberFormat("de-DE").format(item.stock)}
                    </td>

                    <td
                      scope="row"
                      className="py-1 px-4 font-medium whitespace-nowrap"
                    >
                      <div className="flex justify-start items-center gap-4">
                        <Link
                          to={`/seller/dashboard/edit-product/${item._id}`}
                          className="p-[6px] bg-yellow-500 rounded hover:bg-yellow-400"
                        >
                          <FaEdit />
                        </Link>
                        <Link
                          to={`/seller/dashboard/add-banner/${item._id}`}
                          className="p-[6px] bg-sky-500 rounded  hover:bg-sky-400 duration-200"
                        >
                          <LuImageMinus />
                        </Link>

                        <Link
                          onClick={() => handleViewProduct(item)}
                          className="p-[6px] bg-green-500 rounded  hover:bg-green-400"
                        >
                          <FaEye />
                        </Link>
                        <div
                          className="flex"
                          onClick={() => dispatch(delete_product(item._id))}
                        >
                          <Link className="p-[6px] bg-red-500 rounded  hover:bg-red-400">
                            <FaTrash />
                          </Link>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            )}
          </table>
        </div>

        <div className=" mt-[16px] flex justify-end items-center">
          <PaginationConfig
            pageNumber={currentPage}
            setPageNumber={setCurrentPage}
            totalItem={totalProduct}
            perPage={parPage}
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
            perPage={parPage}
          />
        </div>
      </div>
    </div>
  );
};

export default Products;
