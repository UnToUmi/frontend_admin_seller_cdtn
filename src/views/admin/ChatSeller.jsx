import React, { useEffect, useRef, useState } from "react";
import { FaList } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import {
  get_admin_message,
  get_sellers,
  send_message_seller_admin,
  messageClear,
  updateSellerMessage,
} from "../../store/Reducers/chatReducer";
import { Link, useParams } from "react-router-dom";
import { FaRegFaceGrinHearts } from "react-icons/fa6";
import toast from "react-hot-toast";

import { socket } from "../../utils/utils";
import { Divider } from "@mui/material";

const ChatSeller = () => {
  const scrollRef = useRef();
  const [show, setShow] = useState(false);
  const { sellerId } = useParams();
  const [text, setText] = useState("");
  const [receverMessage, setReceverMessage] = useState("");

  const {
    sellers,
    activeSeller,
    seller_admin_message,
    currentSeller,
    successMessage,
  } = useSelector((state) => state.chat);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(get_sellers());
  });

  const send = (e) => {
    e.preventDefault();
    dispatch(
      send_message_seller_admin({
        senderId: "",
        receverId: sellerId,
        message: text,
        senderName: "Admin Support",
      })
    );
    setText("");
  };

  useEffect(() => {
    if (sellerId) {
      dispatch(get_admin_message(sellerId));
    }
  }, [sellerId]);

  useEffect(() => {
    if (successMessage) {
      socket.emit(
        "send_message_admin_to_seller",
        seller_admin_message[seller_admin_message.length - 1]
      );
      dispatch(messageClear());
    }
  }, [successMessage]);

  useEffect(() => {
    socket.on("receved_seller_message", (msg) => {
      setReceverMessage(msg);
    });
  }, []);

  useEffect(() => {
    if (receverMessage) {
      if (
        receverMessage.senderId === sellerId &&
        receverMessage.receverId === ""
      ) {
        dispatch(updateSellerMessage(receverMessage));
      } else {
        toast.success(receverMessage.senderName + " " + "Send A message");
        dispatch(messageClear());
      }
    }
  }, [receverMessage]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [seller_admin_message]);

  return (
    <div className="px-2 lg:px-7 py-5">
      <div className="w-full bg-[#e6e7fb] px-4 py-4 rounded-xl h-[calc(100vh-140px)]">
        <div className="flex w-full h-full relative">
          <div
            className={`w-[280px] border-r-[1px] px-3  border-black h-full absolute z-10 ${
              show ? "-left-[16px]" : "-left-[336px]"
            } md:left-0 md:relative transition-all`}
          >
            <div className="w-full h-[calc(100vh-177px)] bg-[#e6e7fb] md:bg-transparent overflow-y-auto rounded-xl">
              <div className="flex text-xl justify-between items-center p-2 md:p-0 md:px-3 md:pb-3 text-black">
                <p className="font-medium text-[28px]">
                  Sellers
                  <Divider
                    sx={{
                      marginTop: "4px",
                      height: "2px",
                    }}
                    color="000000"
                    orientation="horizontal"
                    variant="middle"
                    flexItem
                  />
                </p>
                <span
                  onClick={() => setShow(!show)}
                  className="block cursor-pointer md:hidden"
                >
                  <IoMdClose />
                </span>
              </div>

              {sellers.map((s, i) => (
                <Link
                  key={i}
                  to={`/admin/dashboard/chat-sellers/${s._id}`}
                  className={`h-[60px] flex justify-start gap-2 items-center text-white px-2 py-2 rounded-md cursor-pointer ${
                    sellerId === s._id ? "bg-[#8288ed]" : ""
                  }  `}
                >
                  <div className="relative">
                    <img
                      className="w-[38px] h-[38px] border-white border-2 max-w-[38px] p-[2px] rounded-full"
                      src={s.image}
                      alt=""
                    />

                    {activeSeller.some((a) => a.sellerId === s._id) && (
                      <div className="w-[10px] h-[10px] bg-green-500 rounded-full absolute right-0 bottom-0"></div>
                    )}
                  </div>

                  <div className="flex justify-center items-start flex-col w-full">
                    <div className="flex justify-between items-center w-full">
                      <h2 className="text-base text-black font-semibold">
                        {s.name}
                      </h2>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          <div className="w-full md:w-[calc(100%-200px)] md:pl-4">
            <div className="flex justify-between items-center">
              {sellerId && (
                <div className="flex justify-start items-center gap-3">
                  <div className="relative">
                    <img
                      className="w-[45px] h-[45px] border-green-500 border-2 max-w-[45px] p-[2px] rounded-full"
                      src={currentSeller?.image}
                      alt=""
                    />
                    <div className="w-[10px] h-[10px] bg-green-500 rounded-full absolute right-0 bottom-0"></div>
                  </div>
                  <span className="text-white">{currentSeller?.name}</span>
                </div>
              )}

              <div
                onClick={() => setShow(!show)}
                className="w-[35px] duration-200 flex md:hidden h-[35px] rounded-md bg-blue-500 hover:bg-blue-400 justify-center cursor-pointer items-center text-white"
              >
                <span>
                  <FaList />
                </span>
              </div>
            </div>

            <div className="py-4">
              <div className="bg-slate-500 h-[calc(100vh-290px)] rounded-xl p-3 overflow-y-auto">
                {sellerId ? (
                  seller_admin_message.map((m, i) => {
                    if (m.senderId === sellerId) {
                      return (
                        <div
                          ref={scrollRef}
                          className="w-full flex justify-start items-center"
                        >
                          <div className="flex justify-start items-start gap-2 md:px-3 py-2 max-w-full lg:max-w-[85%]">
                            <div>
                              <img
                                className="w-[38px] h-[38px] border-2 border-white rounded-full max-w-[38px] p-[3px]"
                                src="http://localhost:3001/images/demo.jpg"
                                alt=""
                              />
                            </div>
                            <div className="flex justify-center items-start flex-col w-full bg-slate-400 text-white py-2 px-3 rounded-xl">
                              <span>{m.message} </span>
                            </div>
                          </div>
                        </div>
                      );
                    } else {
                      return (
                        <div
                          ref={scrollRef}
                          className="w-full flex justify-end items-center"
                        >
                          <div className="flex justify-start items-start gap-2 md:px-3 py-2 max-w-full lg:max-w-[85%]">
                            <div className="flex justify-center items-start flex-col w-full bg-blue-500 text-white py-2 px-3 rounded-xl">
                              <span>{m.message} </span>
                            </div>
                            <div>
                              <img
                                className="w-[38px] h-[38px] border-2 border-white rounded-full max-w-[38px] p-[3px]"
                                src="http://localhost:3001/images/admin.jpg"
                                alt=""
                              />
                            </div>
                          </div>
                        </div>
                      );
                    }
                  })
                ) : (
                  <div className="w-full h-full flex justify-center items-center flex-col gap-2 text-white">
                    <span>
                      <FaRegFaceGrinHearts />
                    </span>
                    <span>Select Seller </span>
                  </div>
                )}
              </div>
            </div>

            <form onSubmit={send} className="flex gap-3 items-center">
              <input
                readOnly={sellerId ? false : true}
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="w-full flex justify-between px-3 border border-slate-700 items-center py-2 focus:border-green-500 rounded-xl outline-none bg-transparent text-black"
                type="text"
                placeholder="Input Your Message"
              />
              <button
                disabled={sellerId ? false : true}
                className=" bg-blue-500 hover:bg-blue-400 duration-200 text-semibold w-[75px] h-[35px] rounded-xl text-white flex justify-center items-center"
              >
                Send
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatSeller;
