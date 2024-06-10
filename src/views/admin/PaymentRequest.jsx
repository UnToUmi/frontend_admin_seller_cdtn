import React, { forwardRef, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FixedSizeList as List } from "react-window";
import {
  confirm_payment_request,
  get_payment_request,
  messageClear,
} from "../../store/Reducers/PaymentReducer";
import moment from "moment";
import toast from "react-hot-toast";
import { TbCurrencyDong } from "react-icons/tb";
import { Divider } from "@mui/material";

function handleOnWheel({ deltaY }) {
  console.log("handleOnWheel", deltaY);
}

const outerElementType = forwardRef((props, ref) => (
  <div ref={ref} onWheel={handleOnWheel} {...props} />
));

const PaymentRequest = () => {
  const dispatch = useDispatch();
  const { successMessage, errorMessage, pendingWithdrows, loader } =
    useSelector((state) => state.payment);
  const [paymentId, setPaymentId] = useState("");

  useEffect(() => {
    dispatch(get_payment_request());
  }, []);

  const confirm_request = (id) => {
    setPaymentId(id);
    dispatch(confirm_payment_request(id));
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

  const Row = ({ index, style }) => {
    return (
      <div
        style={style}
        className="w-full  border-b-[1px] border-black flex text-sm text-black font-medium"
      >
        <div className=" w-full flex">
          <div className="w-[25%] p-2 whitespace-nowrap">{index + 1}</div>
          <div className="w-[25%] p-2 whitespace-nowrap">
            <div className="flex text-[#28D45C] items-center   font-medium">
              {new Intl.NumberFormat("de-DE").format(
                pendingWithdrows[index]?.amount
              )}
              <TbCurrencyDong />
            </div>
          </div>
          <div className="w-[25%] p-2 whitespace-nowrap">
            <span className="py-[3px] px-[9px] bg-slate-100 text-[#FFC095] rounded-xl text-sm">
              {pendingWithdrows[index]?.status}
            </span>
          </div>
          <div className="w-[25%] p-2 whitespace-nowrap">
            {moment(pendingWithdrows[index]?.createdAt).format("LL")}{" "}
          </div>
          <div className="w-[25%] p-2 whitespace-nowrap">
            <button
              disabled={loader}
              onClick={() => confirm_request(pendingWithdrows[index]?._id)}
              className="bg-[#FC8AFF] hover:bg-pink-400 px-[9px] py-[3px] duration-200 cursor-pointer text-white rounded-xl text-sm"
            >
              {loader && paymentId === pendingWithdrows[index]?._id
                ? "loading.."
                : "Confirm"}
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="px-2 lg:px-7 pt-5">
      <div className="w-full p-4 bg-[#e6e7fb] rounded-xl">
        <div className="w-[20%]">
          <h2 className="w-full text-xl font-medium pb-5 text-black">
            Withdrawal Request
            <Divider
              sx={{ width: "60%", marginTop: "8px", height: "1px" }}
              color="000000"
              orientation="horizontal"
              variant="middle"
              flexItem
            />
          </h2>
        </div>

        <div className="w-full">
          <div className="w-full overflow-x-auto">
            <div className="flex bg-slate-300 uppercase text-xs font-bold min-w-[340px] rounded-xl">
              <div className="w-[25%] p-2"> No </div>
              <div className="w-[25%] p-2"> Amount </div>
              <div className="w-[25%] p-2"> Status </div>
              <div className="w-[25%] p-2"> Date </div>
              <div className="w-[25%] p-2"> Action </div>
            </div>
            {
              <List
                style={{ minWidth: "340px" }}
                className="List"
                height={350}
                itemCount={pendingWithdrows.length}
                itemSize={35}
                outerElementType={outerElementType}
              >
                {Row}
              </List>
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentRequest;
