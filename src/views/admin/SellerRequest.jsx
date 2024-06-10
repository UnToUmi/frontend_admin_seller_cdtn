import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaEye } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import Search from "../components/Search";
import { get_seller_request } from "../../store/Reducers/sellerReducer";
import { Divider } from "@mui/material";
import { Input } from "../components/Input";
import PaginationConfig from "../PaginationConfig";

const SellerRequest = () => {
  const dispatch = useDispatch();
  const { sellers, totalSeller } = useSelector((state) => state.seller);

  const [currentPage, setCurrentPage] = useState(1);
  const [searchValue, setSearchValue] = useState("");
  const [parPage, setParPage] = useState(5);
  const [show, setShow] = useState(false);

  useEffect(() => {
    dispatch(
      get_seller_request({
        parPage,
        searchValue,
        page: currentPage,
      })
    );
  }, [parPage, searchValue, currentPage]);

  return (
    <div className="px-2 lg:px-7 pt-5">
      <div className="w-full p-4 bg-[#e6e7fb] rounded-xl">
        <div className="flex justify-between items-center">
          <p className="font-medium text-[28px]">
            Sellers Request
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

        <div className="relative overflow-x-auto mt-3">
          <table className="w-full text-sm text-left text-black">
            <thead className="text-sm uppercase border-b-[2px] border-slate-700">
              <tr>
                <th scope="col" className="py-3 px-4">
                  No
                </th>
                <th scope="col" className="py-3 px-4">
                  Name
                </th>
                <th scope="col" className="py-3 px-4">
                  Email
                </th>
                <th scope="col" className="py-3 px-4">
                  Payment Status
                </th>
                <th scope="col" className="py-3 px-4">
                  Status
                </th>
                <th scope="col" className="py-3 px-4">
                  Action
                </th>
              </tr>
            </thead>

            <tbody>
              {sellers.length > 0 ? (
                sellers.map((d, i) => (
                  <tr className="py-2 border-b-[1px] border-black" key={i}>
                    <td
                      scope="row"
                      className="py-2 px-4 font-medium whitespace-nowrap"
                    >
                      {i + 1}
                    </td>
                    <td
                      scope="row"
                      className="py-2 px-4 font-medium whitespace-nowrap"
                    >
                      {d.name}
                    </td>
                    <td
                      scope="row"
                      className="py-2 px-4 font-medium whitespace-nowrap"
                    >
                      {d.email}
                    </td>
                    <td
                      scope="row"
                      className="py-2 px-4 font-medium whitespace-nowrap"
                    >
                      <span>{d.payment}</span>
                    </td>

                    <td
                      scope="row"
                      className="py-2 px-4 font-medium whitespace-nowrap"
                    >
                      <span>{d.status}</span>
                    </td>

                    <td
                      scope="row"
                      className="py-2 px-4 font-medium whitespace-nowrap"
                    >
                      <div className="flex ml-3 justify-start items-center gap-4">
                        <Link
                          to={`/admin/dashboard/seller/details/${d._id}`}
                          className=" text-white p-[6px] bg-green-500 rounded  hover:bg-green-400 duration-200"
                        >
                          <FaEye />
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <div className="relative translate-x-[400px] my-3 ">
                  No data
                </div>
              )}
            </tbody>
          </table>
        </div>

        <div className="w-full flex justify-end mt-4 bottom-4 right-4">
          <PaginationConfig
            pageNumber={currentPage}
            setPageNumber={setCurrentPage}
            totalItem={sellers}
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

export default SellerRequest;
