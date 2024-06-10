import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaEdit, FaEye, FaTrash } from "react-icons/fa";
import PaginationConfig from "../PaginationConfig";
import {
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { TbCurrencyDong } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";
import {
  delete_product,
  get_discount_product,
} from "../../store/Reducers/productReducer";
import { Input } from "../components/Input";
import Search from "./../components/Search";

const DiscountProducts = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchValue, setSearchValue] = useState("");
  const [perPage, setPerPage] = useState(5);
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();

  const handleChange = (event) => {
    const selectedValue = event.target.value;
    setPerPage(selectedValue);
  };

  const {
    loaderTable,
    products,
    discountProducts,
    successMessage,
    totalDiscountProduct,
  } = useSelector((state) => state.product);

  useEffect(() => {
    const obj = {
      perPage: parseInt(perPage),
      page: parseInt(currentPage),
      searchValue,
    };
    dispatch(get_discount_product(obj));
  }, [searchValue, currentPage, perPage, successMessage]);

  return (
    <div className="px-2 lg:px-7 pt-5">
      <div className="w-full p-4 bg-[#e6e7fb] rounded-xl">
        <div className="flex justify-between items-center">
          <p className="font-medium text-[28px]">
            Discount Products
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

            <tbody>
              {discountProducts.map((item, index) => (
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
                    {item.name}
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
                    className="py-1 px-4 font-medium whitespace-nowrap"
                  >
                    {item.discount}%
                  </td>

                  <td
                    scope="row"
                    className="py-1 px-4 font-medium whitespace-nowrap"
                  >
                    {new Intl.NumberFormat("de-DE").format(item.stock)}
                  </td>

                  <td
                    scope="row"
                    className="py-1 px-4 font-medium whitespace-nowrap"
                  >
                    <div className="flex justify-start items-center gap-4">
                      <Link className="p-[6px] bg-yellow-500 rounded hover:bg-yellow-400">
                        <FaEdit />
                      </Link>
                      <Link className="p-[6px] bg-green-500 rounded  hover:bg-green-400">
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
          </table>
        </div>

        <div className=" mt-[16px] flex justify-end items-center">
          <PaginationConfig
            pageNumber={currentPage}
            setPageNumber={setCurrentPage}
            totalItem={totalDiscountProduct}
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
  );
};

export default DiscountProducts;
