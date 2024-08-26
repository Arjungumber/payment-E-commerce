import React from "react";
import CategoryList from "../Components/CategoryList";
import BannerProduct from "../Components/BannerProduct";
import HorizontalCardProduct from "../Components/HorizontalCardProduct";
import VerticalCardProduct from "../Components/VerticalCardProduct";

const Home = () => {
  return (
    <div>
      <CategoryList />
      <BannerProduct/>
      <HorizontalCardProduct category={"airpodes"} heading={"Best Airpodes"}/>
      <HorizontalCardProduct category={"watches"} heading={"Trendsetters"}/>
    
    <VerticalCardProduct category={"mobiles"} heading={"Latest Launches"}/>
    <VerticalCardProduct category={"mouse"} heading={"Mouse"}/>
    <VerticalCardProduct category={"televisions"} heading={"Entertainment Box"}/>
    <VerticalCardProduct category={"camera"} heading={"Camera"}/>
    <VerticalCardProduct category={"earphones"} heading={"Earphones"}/>
    <VerticalCardProduct category={"speakers"} heading={"Speakers"}/>
    <VerticalCardProduct category={"refrigerator"} heading={"Cooling Boxes"}/>
    <VerticalCardProduct category={"printers"} heading={"Printer"}/>
    <VerticalCardProduct category={"trimmers"} heading={"Trimmers"}/>

    </div>
  );
};

export default Home;
