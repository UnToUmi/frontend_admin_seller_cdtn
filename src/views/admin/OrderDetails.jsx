import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  admin_order_status_update,
  get_admin_order,
  messageClear,
} from "../../store/Reducers/OrderReducer";
import toast from "react-hot-toast";
import {
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { Link } from "react-router-dom";
import { IoChevronBackOutline } from "react-icons/io5";
import { TbCurrencyDong } from "react-icons/tb";

const OrderDetails = () => {
  const { orderId } = useParams();
  const dispatch = useDispatch();
  const [status, setStatus] = useState("");
  const { order, errorMessage, successMessage } = useSelector(
    (state) => state.order
  );

  useEffect(() => {
    setStatus(order?.delivery_status);
  }, [order]);

  useEffect(() => {
    dispatch(get_admin_order(orderId));
  }, [orderId]);

  const status_update = (e) => {
    dispatch(
      admin_order_status_update({ orderId, info: { status: e.target.value } })
    );
    setStatus(e.target.value);
  };

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

  return (
    <div className="px-2 lg:px-7 pt-5">
      <div className="w-full p-4 bg-[#e6e7fb] rounded-xl">
        <div className="flex justify-between items-center p-4">
          <div className="flex items-center cursor-pointer hover:translate-x-[-4px] duration-200 hover:text-blue-400">
            <IoChevronBackOutline className="text-[40px]" />
            <Link
              to="/admin/dashboard/orders"
              className="font-medium text-[28px]"
            >
              Orders Details
              <Divider
                sx={{ marginTop: "8px", height: "1px" }}
                color="000000"
                orientation="horizontal"
                variant="middle"
                flexItem
              />
            </Link>
          </div>

          <FormControl
            sx={{
              width: "200px",
            }}
            variant="outlined"
            size="small"
          >
            <InputLabel color="success" id="demo-simple-select-helper-label">
              Status
            </InputLabel>
            <Select
              style={{ borderRadius: "16px", backgroundColor: "whitesmoke" }}
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
              label="Pages"
              onChange={status_update}
              color="success"
              value={status}
            >
              <MenuItem value={"pending"}>Pending</MenuItem>
              <MenuItem value={"processing"}>Processing</MenuItem>
              <MenuItem value={"warehouse"}>Warehouse</MenuItem>
              <MenuItem value={"placed"}>Placed</MenuItem>
              <MenuItem value={"cancelled"}>Cancelled</MenuItem>
            </Select>
          </FormControl>
        </div>

        <div className="p-4">
          <div className="flex gap-2 text-lg text-black">
            <h2>#{order._id}</h2>
            <span>{order.date}</span>
          </div>

          <div className="flex flex-wrap">
            <div className="w-[30%]">
              <div className="pr-3 text-black text-lg">
                <div className="flex flex-col gap-1">
                  <h2 className="pb-2 font-semibold">
                    Deliver To : {order.shippingInfo?.name}
                  </h2>
                  <p>
                    <span className="text-sm">
                      {order.shippingInfo?.address}
                      {order.shippingInfo?.province}
                      {order.shippingInfo?.city}
                      {order.shippingInfo?.area}
                    </span>
                  </p>
                </div>
                <div className="flex justify-start items-center gap-3">
                  <h2>Payment Status: </h2>
                  <span className="text-base">{order.payment_status}</span>
                </div>

                <div className="flex items-center">
                  <span>Price: </span>
                  <div className="ml-3 flex text-[#28D45C] items-center  py-3  font-medium">
                    {new Intl.NumberFormat("de-DE").format(order.price)}
                    <TbCurrencyDong />
                  </div>
                </div>

                <div className="mt-4 px-4 py-2 flex flex-col  bg-slate-500 rounded-xl">
                  <div className="text-white">
                    {order.products &&
                      order.products.map((p, i) => (
                        <div key={i} className="flex gap-4 text-md">
                          <img
                            className="w-[50px] h-[50px]"
                            src={p.images[0]}
                            alt=""
                          />

                          <div>
                            <h2>{p.name} </h2>
                            <p className="flex flex-col gap-2 items-start ">
                              <span>Brand : {p.brand}</span>
                              <span className="text-lg ">
                                Quantity : {p.quantity}
                              </span>
                            </p>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="w-[70%]">
              <div className="pl-3">
                <div className="mt-4 flex flex-col bg-slate-500 rounded-xl p-4">
                  {order?.suborder?.map((o, i) => (
                    <div key={i + 20} className="text-white mt-2 ">
                      <div className="flex justify-start items-center gap-3">
                        <h2>Seller {i + 1} Order : </h2>
                        <span>{o.delivery_status}</span>
                      </div>

                      {o.products?.map((p, i) => (
                        <div className="flex gap-3 text-md mt-2 bg-slate-400 px-5 rounded-xl py-3">
                          <img
                            className="w-[50px] h-[50px]"
                            src={p.images[0]}
                            alt=""
                          />

                          <div>
                            <h2>{p.name} </h2>
                            <p className="flex gap-3 items-center justify-center">
                              <span>Brand : {p.brand}</span>
                              <span className="text-lg ">
                                Quantity : {p.quantity}
                              </span>
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
