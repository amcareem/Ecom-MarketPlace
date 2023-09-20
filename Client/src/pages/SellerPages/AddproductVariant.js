import React from 'react'
import { useState } from 'react';
import VariantDropzone from '../../components/SellerComponents/VariantDropzone';
const AddproductVariant = ({variantArray,setVariantArray,index}) => {
    const [variant,setVariant] = useState(variantArray[index]);
    const handleChange = (e) =>{
        const{name,value} = e.target;
        setVariant((prev)=>{
          return {
            ...prev,
            [name] : value
          }
        })
      }
      const handleDimensionChange = (e)=>{
        const{name,value} = e.target;
        setVariant({
          ...variant,
          dimension:{
            ...variant.dimension,
            [name] : value
          }
        })
      }
      const handleAmountChange = (e)=>{
        const{name,value} = e.target;
        setVariant({
          ...variant,
          productAmount:{
            ...variant.productAmount,
            [name] : value
          }
        })
      }
      const handleSaveVariant = ()=>{
        const newArray = [...variantArray];
        newArray[index] = variant;
        setVariantArray(newArray);
      }
      console.log(variant);
      console.log(variantArray);
  return (
    <>
      <div className='flex gap-10 w-full h-full '>
        
        <div className='pt-8 pb-12 flex flex-col gap-6 w-6/12'>
                <div className='flex flex-col gap-3 w-full'>
                    <div className="font-medium text-base after:content-['*'] after:ml-0.5 after:text-red-500">Product name</div>
                    <input type='text'
                    name='productName'
                    placeholder=''
                    value={variant.productName}
                    onChange={handleChange}
                    className='border-[1.5px] border-zinc-300 h-10 rounded-md px-3'
                    ></input>
                </div>
            <div>
                <div className='flex gap-6 w-full'>
                    <div className='flex flex-col gap-3 w-6/12'>
                        <div className="font-medium text-base after:content-['*'] after:ml-0.5 after:text-red-500">Variant type</div>
                        <input type='text'
                        name='variantType'
                        value={variant.variantType}
                        onChange={handleChange}
                        placeholder=''
                        className='border-[1.5px] border-zinc-300 h-10  rounded-md px-3'
                        ></input>
                    </div>
                    <div className='flex flex-col gap-3 w-6/12'>
                        <div className="font-medium text-base after:content-['*'] after:ml-0.5 after:text-red-500">Variant name</div>
                        <input type='text'
                        name='variantName'
                        value={variant.variantName}
                        onChange={handleChange}
                        className='border-[1.5px] border-zinc-300 h-10 rounded-md px-3'
                        ></input>
                    </div>
                </div>
                </div>
                <div>
                <div className='flex gap-6 w-full'>
                    <div className='flex flex-col gap-3 w-6/12'>
                        <div className="font-medium text-base after:content-['*'] after:ml-0.5 after:text-red-500">Product price</div>
                        <input type='number'
                        name='productPrice'
                        value={variant.productPrice}
                        onChange={handleChange}
                        placeholder=''
                        className='border-[1.5px] border-zinc-300 h-10  rounded-md px-3'
                        ></input>
                    </div>
                    <div className='flex flex-col gap-3 w-6/12'>
                        <div className='font-medium text-base'>Color</div>
                        <input type='text'
                        name='color'
                        value={variant.color}
                        onChange={handleChange}
                        className='border-[1.5px] border-zinc-300 h-10 rounded-md px-3'
                        ></input>
                    </div>
                </div>
            </div>
              <div className='flex gap-6'>
                <div className='flex flex-col gap-3 w-6/12'>
                    <div className='font-medium text-base'>Brand</div>
                    <input type='text'
                    name='brand'
                    value={variant.brand}
                    placeholder=''
                    onChange={handleChange}
                    className='border-[1.5px] border-zinc-300 h-10 rounded-md px-3'
                    ></input>
                </div>
                <div className='flex flex-col gap-3 w-6/12'>
                    <div className='font-medium text-base'>Discount<span className='text-xs text-slate-400 pl-1'>(if applicable)</span></div>
                    <input type='mumber'
                    name='discount'
                    value={variant.discount}
                    placeholder=''
                    onChange={handleChange}
                    className='border-[1.5px] border-zinc-300 h-10 rounded-md px-3'
                    ></input>
                </div>
                </div>
                
                <div className='flex flex-col gap-3 w-full'>
                    <div className="font-medium text-base after:content-['*'] after:ml-0.5 after:text-red-500">Delivery duration</div>
                    <input type='text'
                    name='expectedDelivery'
                    value={variant.expectedDelivery}
                    placeholder='e.g., 1 hour, 2 days'
                    pattern='^\d+\s(hour|hours|day|days)$'
                    onChange={handleChange}
                    className='border-[1.5px] border-zinc-300 h-10 rounded-md px-3'
                    ></input>
                </div>
                {/* <div className='flex flex-col gap-3 w-6/12'>
                    <div className='font-medium text-base'>Expected delivery</div>
                    <input type='text'
                    readOnly
                    value={calculateExpectedDelivery()}
                    placeholder='Expected Delivery Date'
                    className='border-[1.5px] border-zinc-300 h-10 rounded-md px-3'
                    ></input>
                </div> */}
                
            <div className='flex flex-col gap-3 w-full'>
                <div className="font-medium text-base after:content-['*'] after:ml-0.5 after:text-red-500">Description</div>
                    <textarea type='text'
                    name='productDescription'
                    value={variant.productDescription}
                    onChange={handleChange}
                    placeholder='' 
                    className='border-[1.5px] border-zinc-300 h-32 rounded-md p-3'
                    ></textarea>
            </div>
                <div className='flex flex-col gap-3 w-full'>
                    <div className='font-medium text-base'>Dimension</div>
                    <div className='flex justify-between w-full gap-3'>
                        <input type='number'
                        name='length'
                        value={variant.dimension.length}
                        onChange={handleDimensionChange}
                        placeholder='Length'
                        className='border-[1.5px] border-zinc-300 h-10 rounded-md px-3 w-4/12'
                        ></input>
                      <input type='number'
                      name='width'
                        value={variant.dimension.width}
                        onChange={handleDimensionChange}
                        placeholder='Width'
                        className='border-[1.5px] border-zinc-300 h-10 rounded-md px-3 w-4/12'
                        ></input>
                      <input type='number'
                      name='height'
                        value={variant.dimension.height}
                        onChange={handleDimensionChange}
                        placeholder='Height'
                        className='border-[1.5px] border-zinc-300 h-10 rounded-md px-3 w-4/12'
                        ></input>
                    </div>
                </div>
                
            </div>
                
        <div className='w-6/12 pt-8 pb-12 px-4 flex flex-col justify-between '>
          <div className='flex flex-col gap-3'> 
            <div className="font-medium text-base after:content-['*'] after:ml-0.5 after:text-red-500">Upload product images</div>
            <div className='flex justify-between w-full p-1 rounded-md h-[182px] border-[1.5px] border-zinc-300'>
              <VariantDropzone variant={variant} setVariant={setVariant}/>
              
              
            </div>
            <div className='text-xs text-slate-400'>You need to add at least 3 images.Pay attention to the quality of the 
              pictures you add,comply with the background color standards.pictures must be in certain
              dimensions.
            </div>
          </div>
          <div className='w-full flex gap-4'>
            <div className='flex flex-col gap-3 w-6/12'>
                      <div className='font-medium text-base'>Size<span className='text-xs text-slate-400 pl-1'>(If applicable)</span></div>
                      <input
                      type="text"
                      name="size"
                      value={variant.size}
                      onChange={handleChange}
                      className='border-[1.5px] border-zinc-300 h-10 rounded-md px-3'
                      ></input>
            </div>
            <div className='flex flex-col gap-3 w-6/12'>
                      <div className='font-medium text-base'>Gender<span className='text-xs text-slate-400 pl-1'>(If applicable)</span></div>
                      <input
                      type="text"
                      name="gender"
                      value={variant.gender}
                      onChange={handleChange}
                      className='border-[1.5px] border-zinc-300 h-10 rounded-md px-3'
                      ></input>
            </div>
          </div>
          <div className='w-full flex gap-4'>
          <div className='flex flex-col gap-3 w-6/12'>
                    <div className='font-medium text-base'>Manufacture date</div>
                    <input
                    type="date"
                    name="manufactureDate"
                    value={variant.manufactureDate}
                    onChange={handleChange}
                    className='border-[1.5px] border-zinc-300 h-10 rounded-md px-3'
                    ></input>
            </div>
            <div className='flex flex-col gap-3 w-6/12'>
                    <div className="font-medium text-base">Expiry date</div>
                    <input 
                    type="date"
                    name="expiryDate"
                    value={variant.expiryDate}
                    onChange={handleChange}
                    className='border-[1.5px] border-zinc-300 h-10 rounded-md px-3'
                    ></input>
            </div>
          </div>
          <div className='flex flex-col gap-3 w-full'>
                    <div className='font-medium text-base'>Product Amount<span className='text-xs text-slate-400 pl-1'>(Fill which unit applicable)</span></div>
                    <div className='flex justify-between w-full gap-3'>
                        <input type='text'
                        name='weight'
                        value={variant.productAmount.weight}
                        onChange={handleAmountChange}
                        placeholder='e.g. 1kg 200gm'
                        className='border-[1.5px] border-zinc-300 h-10 rounded-md px-3 w-6/12'
                        ></input>
                      <input type='number'
                      name='amount'
                        value={variant.productAmount.amount}
                        onChange={handleAmountChange}
                        placeholder='Quantity'
                        className='border-[1.5px] border-zinc-300 h-10 rounded-md px-3 w-6/12'
                        ></input>
                    </div>
                  </div>
        </div>
        </div>
        <div
        onClick={()=>handleSaveVariant()} 
        className='w-[14%] h-10 flex justify-center items-center text-center rounded-md py-2 mb-3 font-medium text-sm text-white bg-slate-800'><span className='text-xl font-normal pr-1 pb-[5px]'>+</span>Add this variant</div>
    </>
  )
}

export default AddproductVariant
