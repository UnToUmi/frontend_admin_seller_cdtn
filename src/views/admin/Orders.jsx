import React, { useEffect, useState } from "react";
import { LuArrowDownSquare } from "react-icons/lu";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { get_admin_orders } from "../../store/Reducers/OrderReducer";
import { TextField, Divider } from "@mui/material";
import { FormattedMessage } from "react-intl";
import { TbCurrencyDong } from "react-icons/tb";
import { FaEye } from "react-icons/fa";
import PaginationConfig from "../PaginationConfig";
import Search from "../components/Search";
import { Input } from "../components/Input";

const Orders = () => {
  const dispatch = useDispatch();

  const [currentPage, setCurrentPage] = useState(1);
  const [searchValue, setSearchValue] = useState("");
  const [parPage, setParPage] = useState(5);
  const [show, setShow] = useState(false);

  const { myOrders, totalOrder } = useSelector((state) => state.order);

  useEffect(() => {
    const obj = {
      parPage: parseInt(parPage),
      page: parseInt(currentPage),
      searchValue,
    };
    dispatch(get_admin_orders(obj));
  }, [searchValue, currentPage, parPage]);

  return (
    <div className="px-2 lg:px-7 pt-5">
      <div className="w-full p-4 bg-[#e6e7fb] rounded-xl">
        <div className="flex justify-between items-center">
          <p className="font-medium text-[28px]">
            <FormattedMessage id="orders-dashboard.orders_table" />
            <Divider
              sx={{ marginTop: "8px", height: "1px" }}
              color="000000"
              orientation="horizontal"
              variant="middle"
              flexItem
            />
          </p>
          <Input
            setPerPage={setParPage}
            setSearchValue={setSearchValue}
            searchValue={searchValue}
            perPage={parPage}
          />
        </div>

        <div className="relative mt-5 overflow-x-auto">
          <div className="w-full text-sm text-left ">
            <div className="text-sm text-[#030811] uppercase border-b-[2px] border-slate-700">
              <div className=" flex justify-between items-center">
                <div className="py-3 w-[25%] font-bold">
                  <FormattedMessage id="orders-dashboard.order_id" />
                </div>
                <div className="py-3 w-[13%] font-bold">
                  <FormattedMessage id="orders-dashboard.price" />
                </div>
                <div className="py-3 w-[18%] font-bold">
                  <FormattedMessage id="orders-dashboard.payment_status" />
                </div>
                <div className="py-3 w-[18%] font-bold">
                  <FormattedMessage id="orders-dashboard.order_status" />
                </div>
                <div className="py-3 w-[18%] font-bold">
                  <FormattedMessage id="orders-dashboard.action" />
                </div>
                <div className="py-3 w-[8%] font-bold">
                  <LuArrowDownSquare />
                </div>
              </div>
            </div>

            {myOrders.map((o, i) => (
              <div className="text-black ">
                <div className=" flex justify-between items-center border-b border-slate-700">
                  <div className="py-3 w-[25%] font-medium whitespace-nowrap">
                    #{o._id}
                  </div>
                  <div className="flex text-[#28D45C] items-center  py-3 w-[13%]  font-medium">
                    {new Intl.NumberFormat("de-DE").format(o.price)}
                    <TbCurrencyDong />
                  </div>
                  <div className="py-3 w-[18%] font-medium">
                    {o.payment_status}
                  </div>
                  <div className="py-3 w-[18%] font-medium">
                    {o.delivery_status}
                  </div>
                  <div className="py-3 w-[18%] font-medium flex">
                    <Link
                      to={`/admin/dashboard/order/details/${o._id}`}
                      className=" bg-blue-400 duration-200 px-3 py-2  text-black rounded-xl hover:text-white hover:bg-blue-500 "
                    >
                      <FaEye className="text-[20px]" />
                    </Link>
                  </div>
                  <div
                    onClick={(e) => setShow(o._id)}
                    className="py-3 w-[8%] font-medium"
                  >
                    <LuArrowDownSquare />
                  </div>
                </div>

                <div
                  className={
                    show === o._id
                      ? "block border-b border-slate-700 bg-[#D1FFDF]"
                      : "hidden"
                  }
                >
                  {o.suborder.map((so, i) => (
                    <div className=" flex justify-start items-start border-b border-slate-700">
                      <div className="py-3 w-[25%] font-medium whitespace-nowrap pl-3">
                        #{so._id}
                      </div>

                      <div className="flex text-[#28D45C] items-center  py-3 w-[13%]  font-medium">
                        {new Intl.NumberFormat("de-DE").format(so.price)}
                        <TbCurrencyDong />
                      </div>
                      <div className="py-3 w-[18%] font-medium">
                        {so.payment_status}
                      </div>
                      <div className="py-3 w-[18%] font-medium">
                        {so.delivery_status}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* {totalOrder <= parPage ? (
          ""
        ) : ( */}
        <div className="w-full flex justify-end mt-4 bottom-4 right-4">
          <PaginationConfig
            pageNumber={currentPage}
            setPageNumber={setCurrentPage}
            totalItem={totalOrder}
            perPage={parPage}
            showItem={4}
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
        {/* )} */}
      </div>
    </div>
  );
};

export default Orders;
