import { Avatar, Divider } from "@mui/material";
import React from "react";
import { TbCurrencyDong } from "react-icons/tb";
import { GiMoneyStack } from "react-icons/gi";
import { MdOutlineShoppingCart } from "react-icons/md";
import { FaUsers } from "react-icons/fa";
import { TbShoppingBag } from "react-icons/tb";
import Chart from "react-apexcharts";
import { Link } from "react-router-dom";
import { FormattedMessage } from "react-intl";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { get_seller_dashboard_data } from "../../store/Reducers/dashboardReducer";
import moment from "moment";
import customer from "../../assets/demo.jpg";

const SellerDashboard = () => {
  const dispatch = useDispatch();
  const {
    totalSale,
    totalOrder,
    totalProduct,
    totalPendingOrder,
    recentOrder,
    recentMessage,
  } = useSelector((state) => state.dashboard);
  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(get_seller_dashboard_data());
  }, []);
  const state = {
    series: [
      {
        name: "Orders",
        data: [23, 43, 56, 6, 7, 76, 87, 98],
      },
      {
        name: "Revenue",
        data: [23, 43, 56, 7, 54, 8, 87, 98],
      },
      {
        name: "Sales",
        data: [23, 43, 8, 76, 54, 76, 9, 98],
      },
    ],
    options: {
      dataLabels: {
        enabled: false,
        style: {
          colors: ["#000000", "#000000", "#000000"], // Màu chữ cho các nhãn trong series
        },
      },
      plotOptions: {
        radius: 30,
      },
      chart: {
        background: "transparent",
        foreColor: "#000000",
      },

      strock: {
        show: true,
        curve: ["smooth", "straight", "stepline"],
        lineCap: "butt",
        colors: "#f0f0f0",
        width: 0.5,
        dashArray: 0,
      },
      xaxis: {
        categories: [
          "Jan",
          "Feb",
          "Mar",
          "Apl",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ],
        labels: {
          style: {
            colors: "#000000", // Màu chữ cho trục x
          },
        },
      },
      yaxis: {
        labels: {
          style: {
            colors: "#000000", // Màu chữ cho trục y
          },
        },
      },

      legend: {
        position: "top",
      },
      responsive: [
        {
          breakpoint: 565,
          yaxis: {
            categories: [
              "Jan",
              "Feb",
              "Mar",
              "Apl",
              "May",
              "Jun",
              "Jul",
              "Aug",
              "Sep",
              "Oct",
              "Nov",
              "Dec",
            ],
          },
          options: {
            plotOptions: {
              bar: {
                horizontal: true,
              },
              chart: {
                height: "550px",
              },
            },
          },
        },
      ],
    },
  };
  return (
    <div className="px-2 md:px-7 py-5">
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
              {new Intl.NumberFormat("de-DE").format(totalSale)}
              <TbCurrencyDong />
            </p>
            <span className="text-lg">
              <FormattedMessage id="seller-dashboard.total_sales" />
            </span>
          </div>

          <div>
            <Avatar sx={{ width: 60, height: 60, bgcolor: "#FFFFFF" }}>
              <GiMoneyStack size={50} color="#28D45C" />
            </Avatar>
          </div>
        </div>

        <div
          className="flex justify-between items-start p-5
         bg-[#FFF6E8] rounded-xl gap-3"
        >
          <div className="flex flex-col justify-start items-start ">
            <p className="text-2xl font-bold flex items-center gap-1">
              {totalProduct}
            </p>
            <span className="text-lg">
              <FormattedMessage id="seller-dashboard.products" />
            </span>
          </div>

          <div>
            <Avatar sx={{ width: 60, height: 60, bgcolor: "#FFFFFF" }}>
              <MdOutlineShoppingCart size={40} color="#E2A446" />
            </Avatar>
          </div>
        </div>

        <div
          className="flex justify-between items-start p-5
         bg-[#DAF2FF] rounded-xl gap-3"
        >
          <div className="flex flex-col justify-start items-start ">
            <p className="text-2xl font-bold flex items-center gap-1">
              {totalOrder}
            </p>
            <span className="text-lg">
              <FormattedMessage id="seller-dashboard.orders" />
            </span>
          </div>

          <div>
            <Avatar sx={{ width: 60, height: 60, bgcolor: "#FFFFFF" }}>
              <FaUsers size={40} color="#41A6F3" />
            </Avatar>
          </div>
        </div>

        <div
          className="flex justify-between items-start p-5
         bg-[#FFD4FF] rounded-xl gap-3"
        >
          <div className="flex flex-col justify-start items-start ">
            <p className="text-2xl font-bold flex items-center gap-1">
              {totalPendingOrder}
            </p>
            <span className="text-lg">
              <FormattedMessage id="seller-dashboard.pending_orders" />
            </span>
          </div>

          <div>
            <Avatar sx={{ width: 60, height: 60, bgcolor: "#FFFFFF" }}>
              <TbShoppingBag size={40} color="#FF43FF" />
            </Avatar>
          </div>
        </div>
      </div>

      <div className="w-full flex flex-wrap mt-7 h-full">
        <div className="w-full lg:w-7/12 lg:pr-3">
          <div className="w-full bg-[#e6e7fb] p-4 rounded-xl">
            <Chart
              options={state.options}
              series={state.series}
              type="line"
              height={350}
            />
          </div>
        </div>

        <div className="w-full lg:w-5/12 lg:pl-4 mt-6 lg:mt-0">
          <div className="w-full bg-[#e6e7fb] p-4 rounded-xl ">
            <div className="flex justify-between items-center">
              <h2 className="font-semibold text-lg pb-3">
                <FormattedMessage id="seller-dashboard.recent_customer_message" />
                <Divider
                  sx={{ marginTop: "6px", height: "1px" }}
                  color="#8B8B8B"
                  orientation="horizontal"
                  variant="middle"
                  flexItem
                />
              </h2>
              <Link
                className="font-semibold text-sm duration-200
              w-fit py-2 px-2 hover:bg-slate-500 hover:text-white hover:border-slate-500 rounded-xl
              border border-slate-700 bg-slate-100
              "
              >
                <FormattedMessage id="seller-dashboard.view_all" />
              </Link>
            </div>

            <div className="flex flex-col gap-2 pt-4 text-[#d0d2d6]">
              <ol className="relative border-1 border-slate-600 ml-4">
                {recentMessage.map((m, i) => (
                  <li className="mb-3 ml-6">
                    <div className="flex absolute -left-5 shadow-lg justify-center items-center w-10 h-10 p-[6px] bg-[#4c7fe2] rounded-full z-10">
                      {m.senderId === userInfo._id ? (
                        <img
                          className="w-full rounded-full h-full shadow-lg"
                          src={userInfo.image}
                          alt=""
                        />
                      ) : (
                        <img
                          className="w-full rounded-full h-full shadow-lg"
                          src={customer}
                          alt=""
                        />
                      )}
                    </div>
                    <div className="p-3 bg-slate-800 rounded-lg border border-slate-600 shadow-sm">
                      <div className="flex justify-between items-center mb-2">
                        <Link className="text-md font-normal">
                          {m.senderName}
                        </Link>
                        <time className="mb-1 text-sm font-normal sm:order-last sm:mb-0">
                          {moment(m.createdAt).startOf("hour").fromNow()}
                        </time>
                      </div>
                      <div className="p-2 text-xs font-normal bg-slate-700 rounded-lg border border-slate-800">
                        {m.message}
                      </div>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>

        <div className="w-full p-4 bg-[#e6e7fb] rounded-xl mt-6">
          <div className="flex justify-between items-center">
            <h2 className="font-semibold text-lg  pb-3 ">
              <FormattedMessage id="seller-dashboard.recent_orders" />
              <Divider
                sx={{ marginTop: "6px", height: "1px" }}
                color="#8B8B8B"
                orientation="horizontal"
                variant="middle"
                flexItem
              />
            </h2>
            <Link
              className="font-semibold text-sm duration-200
              w-fit py-2 px-2 hover:bg-slate-500 hover:text-white hover:border-slate-500 rounded-xl
              border border-slate-700 bg-slate-100
              "
            >
              <FormattedMessage id="seller-dashboard.view_all" />
            </Link>
          </div>

          <div className="w-full rounded-xl relative overflow-x-auto ">
            <table className="w-full  text-sm text-left text-black">
              <thead className="text-sm text-black uppercase border-b border-slate-700">
                <tr>
                  <th scope="col" className="py-3 px-4">
                    <FormattedMessage id="seller-dashboard.order_id" />
                  </th>
                  <th scope="col" className="py-3 px-4">
                    <FormattedMessage id="seller-dashboard.price" />
                  </th>
                  <th scope="col" className="py-3 px-4">
                    <FormattedMessage id="seller-dashboard.payment_status" />
                  </th>
                  <th scope="col" className="py-3 px-4">
                    <FormattedMessage id="seller-dashboard.order_status" />
                  </th>
                  <th scope="col" className="py-3 px-4">
                    <FormattedMessage id="seller-dashboard.active" />
                  </th>
                </tr>
              </thead>

              <tbody>
                {recentOrder.map((item, index) => (
                  <tr>
                    <td
                      scope="row"
                      className="py-3 px-4 font-medium whitespace-nowrap"
                    >
                      #{item._id}
                    </td>
                    <td
                      scope="row"
                      className="text-[#28D45C] items-center flex py-3 px-4 font-medium whitespace-nowrap"
                    >
                      {new Intl.NumberFormat("de-DE").format(item.price)}
                      <TbCurrencyDong />
                    </td>
                    <td
                      scope="row"
                      className="py-3 px-4 font-medium whitespace-nowrap"
                    >
                      {item.payment_status}
                    </td>
                    <td
                      scope="row"
                      className="py-3 px-4 font-medium whitespace-nowrap"
                    >
                      {item.delivery_status}
                    </td>
                    <td
                      scope="row"
                      className="py-3 px-4 font-medium whitespace-nowrap"
                    >
                      <Link to={`/seller/dashboard/order/details/${item._id}`}>
                        <FormattedMessage id="seller-dashboard.view" />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellerDashboard;
