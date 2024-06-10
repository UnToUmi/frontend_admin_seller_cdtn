import React from "react";
import { HashLoader } from "react-spinners";
const Loading = () => {
  return (
    <div className="w-screen h-screen flex flex-col gap-4 justify-center items-center">
      <HashLoader size={100} color="#36d7b7" />
      <div className="text-purple-700 text-[20px]">Is Loading...</div>
    </div>
  );
};

export default Loading;
