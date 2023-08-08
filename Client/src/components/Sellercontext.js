import React,{useContext, useState} from 'react'

const SellerContext = React.createContext();

const SellerProvider = ({children}) =>{
    // const [formData,setFormData] = useState({
    //     shopId: '',
    //     shopName: '',
    //     productName: '',
    //     productImages: [],
    //     productDescription: '',
    //     productAmount: { 
    //       weight: '', 
    //       amount: '' 
    //     },
    //     isAvailable: true,
    //     productPrice: '',
    //     size: '',
    //     expiryDate: '',
    //     manufactureDate: '',
    //     expectedDelivery: '',
    //     discount: 0,
    //     dimension:{
    //       length: '',
    //       width: '',
    //       height: ''
    //     },
    //     color:'',
    //     brand:'',
    //     gender:''
    //   })

    return <SellerContext.Provider value={{}}>{children}</SellerContext.Provider>
}

const useSellerContext = () =>{
    return useContext(SellerContext);
}

export {useSellerContext,SellerProvider};
