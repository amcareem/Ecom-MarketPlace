import React from 'react'
import { useGlobalContext } from './context';
import { useEffect } from 'react';
import axios from 'axios';
import Storecard from './Storecard';
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/grid";
import { Swiper, SwiperSlide } from "swiper/react";
import { Grid, Autoplay, Pagination, Navigation } from "swiper";
import "../App.css";

const Storehub = () => {
    const {storeList,setStoreList} = useGlobalContext();
    
  return (
    <>
      <Swiper
        freeMode={true}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        modules={[Grid, Autoplay, Pagination]}
        breakpoints={{
          0: {
            slidesPerView: 2,
            grid: {
              rows: 2,
            }
          },
          768: {
            slidesPerView: 3,
            grid: {
              rows: 2,
            }
          },
          1024: {
            slidesPerView: 4,
            grid: {
              rows: 2,
            }
          }
        }}
       
        className="mySwiper rounded-sm w-full h-full"
      >
        {
          storeList.filter((curr,idx) => idx < 12).map((currStore) =>{
            return <SwiperSlide className=''><Storecard storeName = {currStore._source.storeName} shopId = {currStore._source.shopId}/></SwiperSlide>
          })
        }
        </Swiper>

    </>
  )
}

export default Storehub
