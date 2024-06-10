import React from "react";
import {
  Avatar,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Divider,
} from "@mui/material";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { MdArrowBackIos } from "react-icons/md";
import { TbCurrencyDong } from "react-icons/tb";
import { useEffect } from "react";
import { toast } from "react-hot-toast";
import {
  get_seller_order,
  messageClear,
  seller_order_status_update,
} from "./../../store/Reducers/OrderReducer";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
const OrderDetails = () => {
  // const [selectedValue, setSelectedValue] = useState("");

  // const handleChange = (event) => {
  //   setSelectedValue(event.target.value);
  // };

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
    dispatch(get_seller_order(orderId));
  }, [orderId]);

  const status_update = (e) => {
    dispatch(
      seller_order_status_update({
        orderId,
        info: { status: e.target.value },
      })
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
          <div className="flex">
            <Link
              to="/seller/dashboard/orders"
              className="duration-200 hover:text-slate-700 font-medium text-[28px] w-fit  flex items-center"
            >
              <MdArrowBackIos className="flex absolute top-[160px]  lg:top-[160px] lg:left-[315px]" />
              <p className="w-fit flex flex-col absolute left-[60px] lg:left-[335px]">
                Order Details
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
            <div className="w-[60%]">
              <div className="pr-3 text-black text-lg">
                <div className="flex flex-col gap-1">
                  <h2 className="pb-2 font-semibold">
                    Deliver To : {order.shippingInfo}
                  </h2>
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

                {order?.products?.map((p, i) => (
                  <div
                    key={i}
                    className="mt-4 flex flex-col px-4 py-5 gap-4 bg-slate-400 rounded-xl"
                  >
                    <div className="text-white">
                      <div className="flex gap-3 text-md">
                        <img
                          className="w-[50px] h-[50px]"
                          src={p.images[0]}
                          alt=""
                        />

                        <div>
                          <h2>{p.name}</h2>
                          <p>
                            <div className="flex gap-2">
                              <span>Brand: {p.brand} </span>
                              <span className="text-lg">
                                Quantity: {p.quantity}
                              </span>
                            </div>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default OrderDetails;
