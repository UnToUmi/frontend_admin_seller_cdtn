import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Pagination from "../Pagination";
import { FaEye } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { get_active_sellers } from "../../store/Reducers/sellerReducer";
import { Divider, TextField } from "@mui/material";
import Search from "../components/Search";
import PaginationConfig from "../PaginationConfig";

const Sellers = () => {
  const dispatch = useDispatch();

  const [currentPage, setCurrentPage] = useState(1);
  const [searchValue, setSearchValue] = useState("");
  const [parPage, setParPage] = useState(5);
  const [show, setShow] = useState(false);

  const { sellers, totalSeller } = useSelector((state) => state.seller);

  useEffect(() => {
    const obj = {
      parPage: parseInt(parPage),
      page: parseInt(currentPage),
      searchValue,
    };
    dispatch(get_active_sellers(obj));
  }, [searchValue, currentPage, parPage]);

  return (
    <div className="px-2 lg:px-7 pt-5">
      <div className="w-full p-4 bg-[#e6e7fb] rounded-xl">
        <div className="flex justify-between items-center">
          <p className="font-medium text-[28px]">
            Sellers Table
            <Divider
              sx={{ marginTop: "8px", height: "1px" }}
              color="000000"
              orientation="horizontal"
              variant="middle"
              flexItem
            />
          </p>
          <TextField
            onChange={(e) => setSearchValue(e.target.value)}
            className="lg:w-[230px] w-[100px]"
            size="small"
            type="text"
            id="standard-basic"
            label="Search..."
            variant="outlined"
            color="success"
            InputProps={{
              style: { borderRadius: 16, backgroundColor: "whitesmoke" }, // Thay đổi borderRadius ở đây
            }}
          />
        </div>
        {/* <div className="flex justify-between items-center">
          <select
            onChange={(e) => setParPage(parseInt(e.target.value))}
            className="px-4 py-2 focus:border-indigo-500 outline-none bg-[#6a5fdf] border border-slate-700 rounded-md text-[#d0d2d6]"
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="20">20</option>
          </select>
          <input
            onChange={(e) => setSearchValue(e.target.value)}
            value={searchValue}
            className="px-4 py-2 focus:border-indigo-500 outline-none bg-[#6a5fdf] border border-slate-700 rounded-md text-[#d0d2d6]"
            type="text"
            placeholder="search"
          />
        </div> */}

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
                  Shop Name
                </th>
                <th scope="col" className="py-3 px-4">
                  Payment Status
                </th>
                <th scope="col" className="py-3 px-4">
                  Email
                </th>
                <th scope="col" className="py-3 px-4">
                  Status
                </th>
                <th scope="col" className="py-3 px-4">
                  District
                </th>
                <th scope="col" className="py-3 px-4">
                  Action
                </th>
              </tr>
            </thead>

            <tbody>
              {sellers.length > 0 ? (
                sellers.map((d, i) => (
                  <tr key={i} className="border-b-[1px] border-black">
                    <td
                      scope="row"
                      className="py-1 px-4 font-medium whitespace-nowrap"
                    >
                      {i + 1}
                    </td>
                    <td
                      scope="row"
                      className="py-1 px-4 font-medium whitespace-nowrap"
                    >
                      <img className="w-[45px] h-[45px]" src={d.image} alt="" />
                    </td>
                    <td
                      scope="row"
                      className="py-1 px-4 font-medium whitespace-nowrap"
                    >
                      {d.name}{" "}
                    </td>
                    <td
                      scope="row"
                      className="py-1 px-4 font-medium whitespace-nowrap"
                    >
                      {d.shopInfo?.shopName}
                    </td>
                    <td
                      scope="row"
                      className="py-1 px-4 font-medium whitespace-nowrap"
                    >
                      <span>{d.payment}</span>{" "}
                    </td>
                    <td
                      scope="row"
                      className="py-1 px-4 font-medium whitespace-nowrap"
                    >
                      {d.email}{" "}
                    </td>

                    <td
                      scope="row"
                      className="py-1 px-4 font-medium whitespace-nowrap"
                    >
                      {d.status}{" "}
                    </td>

                    <td
                      scope="row"
                      className="py-1 px-4 font-medium whitespace-nowrap"
                    >
                      {d.shopInfo?.district}{" "}
                    </td>

                    <td
                      scope="row"
                      className="py-1 px-4 font-medium whitespace-nowrap"
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

        {/* {totalSeller <= parPage ? ( */}
        <div className="w-full flex justify-end mt-4 bottom-4 right-4">
          <PaginationConfig
            pageNumber={currentPage}
            setPageNumber={setCurrentPage}
            totalItem={totalSeller}
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
        {/* ) : (
          ""
        )} */}
      </div>
    </div>
  );
};

export default Sellers;
