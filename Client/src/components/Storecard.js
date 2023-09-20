import React from 'react'
import { Link, useLocation } from "react-router-dom";

const Storecard = (props) => {
  return (
    <>
      <div className="font-Inter flex flex-col  bg-white w-11/12 p-1 md:p-4 h-11/12 mx-2 mt-2  overflow-hidden rounded-lg  shadow-lg ">
      {/* <img className="object-cover w-full h-48" src={store} alt="Product Image" /> */}
        <div className="text-gray-900 font-medium text-sm md:text-lg capitalize h-11 md:h-9">{props.storeName}</div>
        <div className="text-gray-700 text-xs md:text-sm h-3/12">Hardware shop</div>
        <div className="mt-3 mb-1 h-4/12">
          <Link to={`/ShopProductPage/${props.shopId}`}><button className="bg-buttonColor hover:bg-[#3F5CFB] text-white font-normal w-28 h-8 text-sm md:text-lg md:w-44 md:h-11 md:py-2 md:px-3 rounded">Visit the store</button></Link>
        </div>
      </div>

    </>
  )
}

export default Storecard
