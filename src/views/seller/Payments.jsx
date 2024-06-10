import React, { forwardRef, useEffect, useState } from "react";
import { MdCurrencyExchange, MdProductionQuantityLimits } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { FixedSizeList as List } from "react-window";
import {
  get_seller_payment_details,
  messageClear,
  send_withdrowal_request,
} from "../../store/Reducers/PaymentReducer";
import toast from "react-hot-toast";
import moment from "moment";
import { TbCurrencyDong } from "react-icons/tb";
import { Avatar, Divider, TextField } from "@mui/material";

function handleOnWheel({ deltaY }) {
  console.log("handleOnWheel", deltaY);
}

const outerElementType = forwardRef((props, ref) => (
  <div ref={ref} onWheel={handleOnWheel} {...props} />
));

const Payments = () => {
  const [errors, setErrors] = useState({});
  const [state, setState] = useState({
    name: "",
    amount: "",
  });

  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);
  const {
    successMessage,
    errorMessage,
    loader,
    pendingWithdrows,
    successWithdrows,
    totalAmount,
    withdrowAmount,
    pendingAmount,
    availableAmount,
  } = useSelector((state) => state.payment);

  const removeDots = (value) => {
    return parseInt(value.replace(/\./g, ""));
  };

  const sendRequest = (e) => {
    e.preventDefault();
    if (validateForm()) {
      //   console.log("state.amount", removeDots(state.amount));
      if (availableAmount - state.amount > 10) {
        dispatch(
          send_withdrowal_request({
            amount: removeDots(state.amount),
            sellerId: userInfo._id,
          })
        );
        setState({
          amount: 0,
        });
      } else {
        toast.error("Insufficient Balance");
      }
    } else {
      console.log("Form is invalid, show errors");
    }
  };

  const inputHandle = (e) => {
    const { name, value } = e.target;
    if (name === "amount") {
      const formattedValue = value
        .replace(/\D/g, "")
        .replace(/\B(?=(\d{3})+(?!\d))/g, ".");
      setState({
        ...state,
        [name]: formattedValue,
      });
      // Kiểm tra và cập nhật trạng thái lỗi khi người dùng nhập
      if (formattedValue) {
        setErrors({ ...errors, amount: "" }); // Xóa lỗi khi đã nhập
      }
    }
  };

  const validateForm = () => {
    let tempErrors = {};
    let isValid = true;

    if (!state.amount) {
      isValid = false;
      tempErrors["amount"] = "The amount is required";
    }

    setErrors(tempErrors);
    console.log("errors", errors);
    return isValid;
  };

  const Row = ({ index, style }) => {
    return (
      <div
        style={style}
        className="flex border-b-[1px] border-black text-sm text-black font-medium"
      >
        <div className="w-[25%] p-2 whitespace-nowrap">{index + 1}</div>
        <div className="w-[25%] p-2 whitespace-nowrap flex items-center text-[#28D45C]">
          {new Intl.NumberFormat("de-DE").format(
            pendingWithdrows[index]?.amount
          )}
          <TbCurrencyDong />
        </div>
        <div className="w-[25%] p-2 whitespace-nowrap">
          <span className="py-[2px] px-[8px] bg-slate-300 text-blue-500 rounded-xl text-sm">
            {pendingWithdrows[index]?.status}
          </span>
        </div>
        <div className="w-[25%] p-2 whitespace-nowrap">
          {moment(pendingWithdrows[index]?.createdAt).format("LL")}
        </div>
      </div>
    );
  };

  const Rows = ({ index, style }) => {
    return (
      <div
        style={style}
        className="flex border-b-[1px] border-black text-sm text-black font-medium"
      >
        <div className="w-[25%] p-2 whitespace-nowrap">{index + 1}</div>
        <div className="w-[25%] p-2 whitespace-nowrap flex items-center text-[#28D45C]">
          {new Intl.NumberFormat("de-DE").format(
            successWithdrows[index]?.amount
          )}
          <TbCurrencyDong />
        </div>
        <div className="w-[25%] p-2 whitespace-nowrap">
          <span className="py-[2px] px-[8px] bg-slate-300 text-blue-500 rounded-xl text-sm">
            {successWithdrows[index]?.status}
          </span>
        </div>
        <div className="w-[25%] p-2 whitespace-nowrap">
          {moment(successWithdrows[index]?.createdAt).format("LL")}
        </div>
      </div>
    );
  };

  useEffect(() => {
    dispatch(get_seller_payment_details(userInfo._id));
  }, []);

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
    <div className="px-2 md:px-7 py-5 gap-7 flex flex-col">
      <div
        className="w-full grid grid-cols-1 sm:grid-cols-2 
    md:grid-cols-2 lg:grid-cols-4 gap-7
    "
      >
        <div
          className="flex justify-between items-start p-5
         bg-[#DAFCDB] rounded-xl gap-3"
        >
          <div className="flex flex-col justify-start items-start">
            <p className="text-2xl font-bold flex items-center gap-1">
              {new Intl.NumberFormat("de-DE").format(totalAmount)}
              <TbCurrencyDong />
            </p>
            <span className="text-lg">Total Sales</span>
          </div>
          <div>
            <Avatar sx={{ width: 60, height: 60, bgcolor: "#FFFFFF" }}>
              <MdCurrencyExchange size={40} color="#28D45C" />
            </Avatar>
          </div>
        </div>

        <div
          className="flex justify-between items-start p-5
         bg-[#FFF6E8] rounded-xl gap-3"
        >
          <div className="flex flex-col justify-start items-start ">
            <p className="text-2xl font-bold flex items-center gap-1">
              {new Intl.NumberFormat("de-DE").format(availableAmount)}
              <TbCurrencyDong />
            </p>
            <span className="text-lg">Available Amount</span>
          </div>

          <div>
            <Avatar sx={{ width: 60, height: 60, bgcolor: "#FFFFFF" }}>
              <MdCurrencyExchange size={40} color="#E2A446" />
            </Avatar>
          </div>
        </div>

        <div
          className="flex justify-between items-start p-5
         bg-[#DAF2FF] rounded-xl gap-3"
        >
          <div className="flex flex-col justify-start items-start ">
            <p className="text-2xl font-bold flex items-center gap-1">
              {new Intl.NumberFormat("de-DE").format(withdrowAmount)}
              <TbCurrencyDong />
            </p>
            <span className="text-lg">Withdrawal Amount</span>
          </div>

          <div>
            <Avatar sx={{ width: 60, height: 60, bgcolor: "#FFFFFF" }}>
              <MdCurrencyExchange size={40} color="#41A6F3" />
            </Avatar>
          </div>
        </div>

        <div
          className="flex justify-between items-start p-5
         bg-[#FFD4FF] rounded-xl gap-3"
        >
          <div className="flex flex-col justify-start items-start ">
            <p className="text-2xl font-bold flex items-center gap-1">
              {new Intl.NumberFormat("de-DE").format(pendingAmount)}
              <TbCurrencyDong />
            </p>
            <span className="text-lg">Pending Amount</span>
          </div>

          <div>
            <Avatar sx={{ width: 60, height: 60, bgcolor: "#FFFFFF" }}>
              <MdCurrencyExchange size={40} color="#FF43FF" />
            </Avatar>
          </div>
        </div>
      </div>

      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-7 pb-4">
        <div className="bg-[#e6e7fb] text-black rounded-xl p-5">
          <p className="w-fit font-medium text-[28px] mb-5">
            Send Request
            <Divider
              sx={{ marginTop: "8px", height: "1px" }}
              color="000000"
              orientation="horizontal"
              variant="middle"
              flexItem
            />
          </p>
          <div className="pt-5 mb-5">
            <form onSubmit={sendRequest}>
              <div className="flex gap-3 flex-wrap">
                {/* <input
                  onChange={(e) => setAmount(e.target.value)}
                  value={amount}
                  min="0"
                  type="number"
                  className="px-3 py-2 md:w-[75%] focus:border-indigo-200 outline-none bg-[#6a5fdf] border border-slate-700 rounded-md text-[#d0d2d6]"
                  name="amount"
                /> */}

                <TextField
                  error={!!errors.amount}
                  helperText={errors.amount}
                  onChange={inputHandle}
                  min="0"
                  type="text"
                  className="h-fit px-3 py-2 md:w-[75%] outline-none border border-slate-700 rounded-xl text-black"
                  name="amount"
                  value={state.amount}
                  size="small"
                  id="standard-basic"
                  label="Enter amounts"
                  variant="outlined"
                  color="success"
                  InputProps={{
                    style: { borderRadius: 16, backgroundColor: "whitesmoke" },
                  }}
                />
                <button
                  disabled={loader}
                  className="bg-purple-700 h-fit hover:bg-purple-600  text-white rounded-xl px-7 py-2"
                >
                  {loader ? "loading.." : "Submit"}
                </button>
              </div>
            </form>
          </div>
          <div>
            <h2 className="text-lg pb-4">Pending Request </h2>

            <div className="w-full overflow-x-auto">
              <div className="flex bg-[#a7a3de] uppercase text-xs font-bold min-w-[340px] rounded-xl">
                <div className="w-[25%] p-2"> No </div>
                <div className="w-[25%] p-2"> Amount </div>
                <div className="w-[25%] p-2"> Status </div>
                <div className="w-[25%] p-2"> Date </div>
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

        <div className="bg-[#e6e7fb] text-black rounded-xl p-5">
          <div>
            <p className="w-fit font-medium text-[28px] mb-5">
              Success Withdrawal
              <Divider
                sx={{ marginTop: "8px", height: "1px" }}
                color="000000"
                orientation="horizontal"
                variant="middle"
                flexItem
              />
            </p>

            <div className="w-full overflow-x-auto">
              <div className="flex bg-[#a7a3de] uppercase text-xs font-bold min-w-[340px] rounded-md">
                <div className="w-[25%] p-2"> No </div>
                <div className="w-[25%] p-2"> Amount </div>
                <div className="w-[25%] p-2"> Status </div>
                <div className="w-[25%] p-2"> Date </div>
              </div>
              {
                <List
                  style={{ minWidth: "340px" }}
                  className="List"
                  height={350}
                  itemCount={successWithdrows.length}
                  itemSize={35}
                  outerElementType={outerElementType}
                >
                  {Rows}
                </List>
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payments;
