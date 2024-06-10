import React, { useState } from "react";
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
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { get_seller_orders } from "../../store/Reducers/OrderReducer";
import Search from "../components/Search";

const Orders = () => {
  const dispatch = useDispatch();

  const { myOrders, totalOrder } = useSelector((state) => state.order);
  const { userInfo } = useSelector((state) => state.auth);

  const [currentPage, setCurrentPage] = useState(1);
  const [searchValue, setSearchValue] = useState("");
  const [parPage, setParPage] = useState(5);

  useEffect(() => {
    const obj = {
      parPage: parseInt(parPage),
      page: parseInt(currentPage),
      searchValue,
      sellerId: userInfo._id,
    };
    dispatch(get_seller_orders(obj));
  }, [searchValue, currentPage, parPage]);

  return (
    <div className="px-2 lg:px-7 pt-5">
      <div className="w-full p-4 bg-[#e6e7fb] rounded-xl">
        <div className="flex justify-between items-center">
          <p className="font-medium text-[28px]">
            Orders
            <Divider
              sx={{ marginTop: "8px", height: "1px" }}
              color="000000"
              orientation="horizontal"
              variant="middle"
              flexItem
            />
          </p>
          <TextField
            className="lg:w-[230px] w-[100px]"
            size="small"
            type="text"
            id="standard-basic"
            label="Search..."
            variant="outlined"
            color="success"
            InputProps={{
              style: { borderRadius: 16, backgroundColor: "whitesmoke" },
            }}
          />
        </div>

        <div className="mt-3 relative overflow-x-auto">
          <table className="w-full text-sm text-left text-black">
            <thead className="text-sm uppercase border-b-[2px] border-slate-700">
              <tr>
                <th scope="col" className="py-3 px-4">
                  Order Id
                </th>
                <th scope="col" className="py-3 px-4">
                  Customer name
                </th>
                <th scope="col" className="py-3 px-4">
                  Price
                </th>
                <th scope="col" className="py-3 px-4">
                  Payment status
                </th>
                <th scope="col" className="py-3 px-4">
                  Order status
                </th>
                <th scope="col" className="py-3 px-4">
                  Action
                </th>
              </tr>
            </thead>

            <tbody>
              {myOrders.map((d, index) => (
                <tr className="border-b-[1px] border-black" key={index}>
                  <td
                    scope="row"
                    className="py-1 px-4 font-medium whitespace-nowrap"
                  >
                    #{d._id}
                  </td>
                  <td
                    scope="row"
                    className="py-1 px-4 font-medium whitespace-nowrap"
                  >
                    Hai DOan
                  </td>

                  <td
                    scope="row"
                    className="  py-1 px-4 font-medium whitespace-nowrap"
                  >
                    <div className=" flex text-[#28D45C] items-center  py-3  font-medium">
                      {new Intl.NumberFormat("de-DE").format(d.price)}
                      <TbCurrencyDong />
                    </div>
                  </td>

                  <td
                    scope="row"
                    className="py-1 px-4 font-medium whitespace-nowrap"
                  >
                    {d.payment_status}
                  </td>
                  <td
                    scope="row"
                    className="py-1 px-4 font-medium whitespace-nowrap"
                  >
                    <span>{d.delivery_status}</span>
                  </td>
                  <td
                    scope="row"
                    className="py-1 px-4 font-medium whitespace-nowrap"
                  >
                    <div className="flex justify-start items-center gap-4">
                      <Link
                        to={`/seller/dashboard/order/details/${d._id}`}
                        className="p-[6px] bg-green-500 rounded  hover:bg-green-400 duration-200 hover:text-white"
                      >
                        <FaEye />
                      </Link>
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
            totalItem={totalOrder}
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
            setPerPage={setParPage}
            setSearchValue={setSearchValue}
            searchValue={searchValue}
            perPage={parPage}
          />
        </div>
      </div>
    </div>
  );
};

export default Orders;
