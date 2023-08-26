import React, { useState } from 'react';
import { useGlobalContext } from '../../components/context';
import axios from 'axios';

const Paymentpage = () => {
  const [selectedOption, setSelectedOption] = useState('');
  const cartList = JSON.parse(localStorage.getItem('cartList'));
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const userId = userInfo.user_id;
  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleSubmit = async(event) => {
    event.preventDefault();
    
    if (selectedOption === 'razorpayUPI') {
      try{
        const totalAmount = JSON.parse(localStorage.getItem('totalPrice'));
        const {data:{key}} = await axios.get('http://localhost:7000/getApiKey');
        const response = await axios.post("http://localhost:7000/razorpayCheckout",{
          totalAmount : totalAmount
        })
        var options = {
          key, // Enter the Key ID generated from the Dashboard
          amount: response.data.order.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
          currency: "INR",
          name: "Acme Corp",
          description: "Test Transaction",
          image: "https://www.pngwing.com/en/search?q=razorpay",
          order_id: response.data.order.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
          callback_url: "http://localhost:7000/paymentVerification",
          prefill: {
              name: "Gaurav Kumar",
              email: "gaurav.kumar@example.com",
              contact: "9000090000"
          },
          notes: {
              address: "Razorpay Corporate Office"
          },
          theme: {
              color: "#3399cc"
          }
      };
      const razor = new window.Razorpay(options);
      razor.open();
      }
      catch(err){
        console.log(err);
      }
    } 
    else if (selectedOption === 'stripe') {
      console.log(cartList);
        try{
          const res = await axios.post("http://localhost:7000/create-checkout-session",{
            cartList: cartList,
            userId : userId
          })
          if(res.data.url){
            window.open(res.data.url, "_blank");
          }
        }
        catch(err){
          console.log(err);
      }
      }
  };
  const handlePayment = async () => {
   
    } 
  return (
    <>
    <div className="font-Inter">
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className={`flex items-center w-full h-16 rounded-lg  px-4 ${
              selectedOption === 'razorpayUPI' ? 'bg-[#E8EBFF] border border-buttonColor' : 'border border-transparent bg-cardColor'
            }`}>
            <input
              type="radio"
              name="paymentOption"
              value="razorpayUPI"
              checked={selectedOption === 'razorpayUPI'}
              onChange={handleOptionChange}
              className="mr-2"
            />
            UPI/Credit/Debit/ATM(RAZORPAY)
          </label>
        </div>
        <div className="mb-4">
          <label className={`flex items-center w-full h-16 rounded-lg  px-4  ${
              selectedOption === 'stripe' ? 'bg-[#E8EBFF] border border-buttonColor' : 'border border-transparent bg-cardColor'
            }`}>
            <input
              type="radio"
              name="paymentOption"
              value="stripe"
              checked={selectedOption === 'stripe'}
              onChange={handleOptionChange}
              className="mr-2"
            />
            Credit/Debit/ATM card(Stripe)
          </label>
        </div>
        <div className="mb-4">
          <label className={`flex items-center w-full h-16 rounded-lg  px-4  ${
              selectedOption === 'cashOnDelivery' ? 'bg-[#E8EBFF] border border-buttonColor' : 'border border-transparent bg-cardColor'
            }`}>
            <input
              type="radio"
              name="paymentOption"
              value="cashOnDelivery"
              checked={selectedOption === 'cashOnDelivery'}
              onChange={handleOptionChange}
              className="mr-2"
            />
            Cash on delivery
          </label>
        </div>
        <div>
          <button
            type="submit"
            className="bg-buttonColor hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Proceed to Payment
          </button>
        </div>
      </form>
    </div>
    </>
  );
};

export default Paymentpage;
