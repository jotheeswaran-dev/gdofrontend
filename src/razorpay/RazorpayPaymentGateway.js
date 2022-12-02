import * as api from "../config/api";
import * as http from "../config/http";

const loadScript = (src) => {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
    document.body.appendChild(script);
  });
};

export default async function displayRazorpay(user, orderId, setIsPayed) {
  //load the Razorpay checkout script
  const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js')

  if (!res) {
    alert('Razorpay checkout script failed to load. Please check your internet connection and try to reload the page?');
    return;
  }

  const token = localStorage.getItem("token");

  const user_data = {
    user_name: `${user.firstName} ${user.lastName}`,
    user_email: user.email,
    user_mobile: user.contactNo
  }

  try{
    const razorpay_order_data = await http.post(`${api.root}/payment/create_razorpay_order?orderId=${orderId}`, {}, {Authorization: `Bearer ${token}`});
    const options = {
      key: process.env.REACT_APP_RAZORPAY_KEY_ID,
      order_id: razorpay_order_data.data.data.id,
      currency: razorpay_order_data.data.data.currency,
      amount: razorpay_order_data.data.data.amount,
      name: "GDO Retail",
      description: razorpay_order_data.data.data.receipt,
      notes: [{
        "orderId": orderId
      }],
      handler: function (response) {
        setIsPayed(true);
      },
      prefill: {
        name: user_data.user_name,
        email: user_data.user_email,
        contact: user_data.user_mobile,
      },
      theme: {
        color: "#8369FF"
      }
    };
  
    // Initiate payment - open the Razorpay modal
  
    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  }
  catch(err){
    console.log(err)
  }
}
