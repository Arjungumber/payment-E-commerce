import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import SummaryApi from "../common";
import VerticalCard from "../Components/VerticalCard";

const SearchProduct = () => {
  const query = useLocation();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  // console.log("query",query.search);
  // query will be an object and query.search will be caarying our actual query value
  const fetchProduct = async () => {
    setLoading(true);
    const response = await fetch(SummaryApi.searchProduct.url + query?.search);
    const dataResponse = await response.json();
    setData(dataResponse.data);
    setLoading(false);
  };
  useEffect(() => {
    fetchProduct();
  }, [query]);
  // dependent on query
  return (
    <div className="container mx-auto p-4">
      {loading && <p className="text-lg text-center">Loading....</p>}
      <p className="text-lg font-semibold my-3 ">Search Result : {data?.length}</p>
      {data.length === 0 && !loading && (
        <p className="bg-white text-lg text-centre p-4">No Data Found....</p>
      )}
      {data.length !== 0 && !loading && (
        <VerticalCard loading={loading} data={data} />
      )}
    </div>
  );
};

export default SearchProduct;
