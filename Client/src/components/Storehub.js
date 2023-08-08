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
    useEffect(() =>{
      getAll();
    },[])
    const getAll = async() => {
        return await axios
          .get('http://localhost:4000/api/getAll')
          .then((response) => {
            setStoreList(response.data);
            console.log(response.data);
          })
          .catch((err) => console.log(err));
        
      }
  return (
    <>
      <div className='bg-white w-11/12 h-72 md:h-[22rem] rounded-lg lg:w-10/12 m-auto lg:h-96 lg:pt-3 lg:px-2'>
      <Swiper
        freeMode={true}
        autoplay={{
          delay: 2500,
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
       
        className="mySwiper rounded-md w-full h-full ml-auto mr-auto"
      >
        {
          storeList.filter((curr,idx) => idx < 12).map((currStore) =>{
            return <SwiperSlide className=''><Storecard storeName = {currStore._source.storeName} shopId = {currStore._source.shopId}/></SwiperSlide>
          })
        }
        </Swiper>
        </div>
    </>
  )
}

export default Storehub
