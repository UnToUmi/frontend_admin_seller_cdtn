import React from "react";
import { Pagination } from "@mui/material";
const PaginationConfig = ({
  pageNumber,
  setPageNumber,
  totalItem,
  perPage,
  showItem,
}) => {
  let totalPage = Math.ceil(totalItem / perPage);

  const handleChange = (event, value) => {
    setPageNumber(value);
    console.log("pageNumber", value);
  };
  return (
    <Pagination
      onChange={handleChange}
      page={pageNumber}
      color="secondary"
      count={totalPage}
      showFirstButton
      showLastButton
      siblingCount={1}
      boundaryCount={0}
    />
  );
};

export default PaginationConfig;
