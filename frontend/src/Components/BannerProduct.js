import React, { useEffect, useState } from "react";
import Image1Mobile from "../assest/assest/banner/img1_mobile.jpg";
import Image1 from "../assest/assest/banner/img1.webp";
import Image2 from "../assest/assest/banner/img2.webp";
import Image2Mobile from "../assest/assest/banner/img2_mobile.webp";
import Image3 from "../assest/assest/banner/img3.jpg";
import Image3Mobile from "../assest/assest/banner/img3_mobile.jpg";
import Image4 from "../assest/assest/banner/img4.jpg";
import Image4Mobile from "../assest/assest/banner/img4_mobile.jpg";
import Image5 from "../assest/assest/banner/img5.webp";
import Image5Mobile from "../assest/assest/banner/img5_mobile.png";
import { FaAngleRight } from "react-icons/fa6";
import { FaAngleLeft } from "react-icons/fa6";
const BannerProduct = () => {
  const [currImage, setCurrImage] = useState(0);
  // this is for banner image sliding according to it will set our transform function

  const desktopImages = [Image1, Image2, Image3, Image4, Image5];
  const mobileImages = [
    Image1Mobile,
    Image2Mobile,
    Image3Mobile,
    Image4Mobile,
    Image5Mobile,
  ];

  const  nextImage = () => {
    if(desktopImages.length-1 > currImage){
    setCurrImage(preve=>preve+1)
    }
  }

  const  prevImage = () => {
    if(currImage !== 0){
    setCurrImage(preve=>preve-1)
    }
  }

  useEffect(()=>{
  const interval = setInterval(()=>{
    if(desktopImages.length-1 > currImage){ // if there is image on right side will move it auto
     nextImage();
      } else{
        setCurrImage(0);
      }
  },5000)

  return ()=> clearInterval(interval);

  },[currImage])


  return (
    <div className="container mx-auto px-4 rounded">
      <div className="h-56 md:h-72 w-full bg-slate-200 relative">
        
        {/*buttons will not be visible to phone dimension  */}
        <div className="absolute z-10 h-full w-full md:flex items-center hidden">
          <div className="flex justify-between w-full text-2xl">
            <button className="bg-white shadow-md rounded-full p-1" onClick={()=>prevImage()}>
              <FaAngleLeft />
            </button>
            <button className="bg-white shadow-md rounded-full p-1" onClick={()=>nextImage()} >
              <FaAngleRight />
            </button>
          </div>
         </div>
        
        {/* desktop and tablet version */}
        <div className=" hidden md:flex h-full w-full overflow-hidden  ">
          {desktopImages.map((ImageUrl, index) => {
            return (
              <div
                className="w-full h-full min-w-full min-h-full transition-all"
                key={ImageUrl}
                style={{ transform: `translateX(-${currImage * 100}%)` }}
              >
                <img
                  className="w-full h-full"
                  src={ImageUrl}
                  alt="displayImages"
                />
              </div>
            );
          })}
        </div>
       {/* mobile version, will be hidden for md size */}
        <div className="flex h-full w-full overflow-hidden md:hidden  ">
          {mobileImages.map((ImageUrl, index) => {
            return (
              <div
                className="w-full h-full min-w-full min-h-full transition-all"
                key={ImageUrl}
                style={{ transform: `translateX(-${currImage * 100}%)` }}
              >
                <img
                  className="w-full h-full object-cover "
                  src={ImageUrl}
                  alt="displayImages"
                />
              </div>
            );
          })}
        </div>


      </div>
    </div>
  );
};

export default BannerProduct;
