import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  get_seller,
  seller_status_update,
  messageClear,
} from "../../store/Reducers/sellerReducer";
import toast from "react-hot-toast";
import { IoChevronBackOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import {
  Button,
  Divider,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";

const SellerDetails = () => {
  const dispatch = useDispatch();
  const { seller, successMessage } = useSelector((state) => state.seller);
  const { sellerId } = useParams();
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    dispatch(get_seller(sellerId));
  }, [sellerId]);

  const [status, setStatus] = useState("");

  const submit = (e) => {
    e.preventDefault();
    if (status === "") {
      setHasError(true); // Nếu chưa chọn, đặt lỗi
      return;
    }
    dispatch(
      seller_status_update({
        sellerId,
        status,
      })
    );
  };

  const handleChange = (event) => {
    setStatus(event.target.value);
    setHasError(false); // Khi chọn giá trị, xoá lỗi
  };

  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage);
      dispatch(messageClear());
    }
  }, [successMessage]);

  useEffect(() => {
    if (seller) {
      setStatus(seller.status);
    }
  }, [seller]);

  return (
    <div className="px-2 lg:px-7 pt-5">
      <div className="w-full p-4 bg-[#e6e7fb] rounded-xl">
        <div className="w-full text-black">
          <p className="font-medium text-[28px] w-fit">
            <div className="flex items-center cursor-pointer hover:translate-x-[-4px] duration-200 hover:text-blue-400">
              <IoChevronBackOutline className="text-[40px]" />
              <Link
                to="/admin/dashboard/sellers-request"
                className="font-medium text-[28px]"
              >
                Seller Detail
                <Divider
                  sx={{ marginTop: "8px", height: "1px" }}
                  color="000000"
                  orientation="horizontal"
                  variant="middle"
                  flexItem
                />
              </Link>
            </div>
          </p>
          <div className="flex justify-center ">
            <div className="lg:w-4/12 w-full flex justify-center items-center py-3">
              <div>
                {seller?.image ? (
                  <img className="w-full h-[230px]" src={seller.image} alt="" />
                ) : (
                  <span className="flex justify-center items-center border-[2px] border-purple-800 w-full h-[80%] rounded-xl border-dashed">
                    {`Seller image is not uploaded! :(`}
                  </span>
                )}
              </div>
            </div>

            <div className="w-4/12">
              <div className="px-0 md:px-5 py-2">
                <div className="py-2 text-lg">
                  <h2>Basic Info</h2>
                </div>

                <div className="flex  justify-between text-sm flex-col gap-2 p-4 bg-slate-400 rounded-xl">
                  <div className="flex gap-2 font-bold text-[#000000]">
                    <span>Name : </span>
                    <span>{seller?.name} </span>
                  </div>
                  <div className="flex gap-2 font-bold text-[#000000]">
                    <span>Email : </span>
                    <span>{seller?.email}</span>
                  </div>

                  <div className="flex gap-2 font-bold text-[#000000]">
                    <span>Role : </span>
                    <span>{seller?.role} </span>
                  </div>
                  <div className="flex gap-2 font-bold text-[#000000]">
                    <span>Status : </span>
                    <span>{seller?.status} </span>
                  </div>
                  <div className="flex gap-2 font-bold text-[#000000]">
                    <span>Payment Status : </span>
                    <span>{seller?.payment} </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="w-4/12">
              <div className="px-0 md:px-5 py-2">
                <div className="py-2 text-lg">
                  <h2>Address</h2>
                </div>

                <div className="flex justify-between text-sm flex-col gap-2 p-4 bg-slate-400 rounded-xl">
                  <div className="flex gap-2 font-bold text-[#000000]">
                    <span>Shop Name : </span>
                    <span>{seller?.shopInfo?.shopName} </span>
                  </div>
                  <div className="flex gap-2 font-bold text-[#000000]">
                    <span>Divission : </span>
                    <span>{seller?.shopInfo?.division} </span>
                  </div>

                  <div className="flex gap-2 font-bold text-[#000000]">
                    <span>District : </span>
                    <span>{seller?.shopInfo?.district} </span>
                  </div>
                  <div className="flex gap-2 font-bold text-[#000000]">
                    <span>State : </span>
                    <span>{seller?.shopInfo?.sub_district} </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex w-full h-full">
          <div className="flex gap-4 ml-7 py-3">
            <FormControl
              sx={{
                width: "200px",
                borderColor: hasError ? "red" : undefined,
              }}
              variant="outlined"
              size="small"
              error={hasError} // Đặt lỗi nếu có
            >
              <InputLabel color="success" id="demo-simple-select-helper-label">
                Select Status
              </InputLabel>
              <Select
                style={{
                  borderRadius: "16px",
                  backgroundColor: "whitesmoke",
                }}
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper"
                label="Pages"
                color="success"
                onChange={handleChange}
                required
                value={status}
              >
                <MenuItem value={"active"}>Active</MenuItem>
                <MenuItem value={"deactive"}>Deactive</MenuItem>
              </Select>
              {hasError && (
                <FormHelperText error>
                  Please select a status before submitting.
                </FormHelperText>
              )}
            </FormControl>
            <Button
              className="h-fit my-3 ml-4"
              onClick={submit}
              type="submit"
              color="secondary"
              variant="contained"
              sx={{ borderRadius: "20px" }}
            >
              Submit
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellerDetails;
