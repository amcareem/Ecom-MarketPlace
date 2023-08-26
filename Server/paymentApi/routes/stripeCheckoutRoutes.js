import express from 'express';
import Stripe from 'stripe';
import dotenv from 'dotenv';
import { v4 as uuidv4 } from 'uuid';
import db from '../utils/SqlConnection.js';
dotenv.config();

const router = express.Router();
const stripe = new Stripe(process.env.SECRET_KEY)
const endpointSecret = "whsec_1b8b9984a1469b8f891adea098eacfcce4ab37161d4a37b227a2d35c8a1b3d3c";

router.post('/webhook', express.raw({type: 'application/json'}) , async(request, response) => {
  const payload = request.body;
  const payloadString = JSON.stringify(payload, null, 2);
  // console.log(payloadString);
  const header = stripe.webhooks.generateTestHeaderString({
    payload: payloadString,
    secret: endpointSecret,
  });
  let event;

  try {
    event = stripe.webhooks.constructEvent(payloadString, header, endpointSecret);
    console.log("webhook verified")
  } catch (err) {
    console.log(`webhook error ${err.message}`)
    response.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }

  // Handle the event
  switch (event.type) {
    case 'payment_intent.succeeded':
      const paymentIntentSucceeded = event.data.object;
      break;
      case 'checkout.session.completed': {
        const session = event.data.object;
        const customer = await stripe.customers.retrieve(session.customer);
        console.log(customer);
        // console.log(session);
        // Save an order in your database, marked as 'awaiting payment'
        // createOrder(session);
        // Check if the order is paid (for example, from a card payment)
        //
        // A delayed notification payment will have an `unpaid` status, as
        // you're still waiting for funds to be transferred from the customer's
        // account.
        if (session.payment_status === 'paid') {
          fulfillOrder(session,customer);
        }
  
        break;
      }
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  response.status(200).end();
});
router.post("/create-checkout-session", async(req, res) => {
  const cartProduct = req.body.cartList.map((item) =>{
    return {
      productId : item.productId,
      productPrice : item.productAmount,
      productQuantity : item.quantity,
    }
  })
  const customer = await stripe.customers.create({
    metadata : { 
      userId : req.body.userId, 
      productList : JSON.stringify(cartProduct) 
    }
  })
  const userId = req.body.userId;
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
    customer:customer.id,
    success_url: `${process.env.CLIENT_URL}/checkout-success`,
    cancel_url: `${process.env.CLIENT_URL}/`,
  });
  console.log(session);
  createPaymentEvent(session.id,customer);
  res.send({session});
});

const createPaymentEvent = async(id,customer) =>{
    try{

      const query = 'INSERT INTO user_payment_event SET ?';
      const values = {
        checkout_id: id,
        user_id: customer.metadata.userId,
        provider: 'stripe',
        payment_status: 'not paid',
        created_at: new Date(), // Insert the current date and time
        modified_at: new Date() // Insert the current date and time
      };

      await db.query(query, values, (error, results) => {
        if (error) {
          console.error('Error inserting payment event:', error);
          // Handle the error
        } else {
          console.log('Payment event inserted successfully:');
          // Handle the success
        }
      });
    }
    catch(err){
      console.log(err);
    }
} 
 
const fulfillOrder = async(session,customer) =>{
  try{
    const createTime = new Date();
    const productList = JSON.parse(customer.metadata.productList);
    console.log(productList);
    await db.query('insert into payment_details set ?' ,
    { 
      payment_id : session.payment_intent , 
      total_price: session.amount_total / 100,
      currency : session.currency,
      checkout_id : session.id,
      payment_status : session.payment_status,
      payment_method : session.payment_method_types[0],
      created_at : createTime,
      modified_at : createTime
    },async(err,res) =>{
      if(err){
        console.log(err);
      }
      else{
        await db.query('update user_payment_event set payment_status = ?,modified_at = ? where checkout_id = ?',
        [session.payment_status,createTime,session.id]);
        const orderTableValues = {
          id : uuidv4(),
          user_id : customer.metadata.userId,
          payment_id : session.payment_intent,
          total_price : session.amount_total/100,
          created_at : createTime,
          modified_at : createTime
        }
        await db.query('insert into order_details set ?', orderTableValues ,async(err,res) =>{
          if(err){
            console.log(err);
          }
          else{
            await db.query('update payment_details set order_id = ? where checkout_id = ?',[orderTableValues.id,session.id]);
            
            for (const item of productList) {
              const orderItemValues = {
                  id: uuidv4(),
                  order_id: orderTableValues.id,
                  product_id: item.productId,
                  quantity: item.productQuantity,
                  price : item.productPrice,
                  created_at : createTime,
                  modified_at : createTime
              };
              await db.query('insert into order_items set ?', orderItemValues,(err,res) =>{
                if(err){
                  console.log(err);
                }
                else{
                  console.log('successfullyadded order items');
                }
              });
          }
            
            console.log('order successfully created');
          }
        })
        console.log('payment order created');
      }
    })


  }
  catch(err){
    console.log(err);
  }
}



export default router;