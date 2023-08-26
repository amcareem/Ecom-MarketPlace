import express from 'express';
import Stripe from 'stripe';
import dotenv from 'dotenv';

dotenv.config();

const stripe = new Stripe(process.env.SECRET_KEY)
export const createCheckoutSession = async(req, res) => {
  console.log(req.body)
  const line_items = req.body.cartList.map((item) =>{
    return {
      price_data: {
        currency: 'inr',
        product_data: {
          name: item.productName,
        },
        unit_amount: item.productAmount * 100,
      },
      quantity: item.quantity,
    };
  });
  const session = await stripe.checkout.sessions.create({
    line_items,
    mode: 'payment',
    success_url: `${process.env.CLIENT_URL}/checkout-success`,
    cancel_url: `${process.env.CLIENT_URL}/`,
  });

  res.send({url : session.url});
};

