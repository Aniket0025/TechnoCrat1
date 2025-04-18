// EmailJS integration for order confirmation emails
import emailjs from 'emailjs-com';

// OrderDetails type should match the one used in GooglePayButton
export interface OrderItem {
  product: { name: string; price: number };
  quantity: number;
}
export interface OrderDetails {
  email: string;
  items: OrderItem[];
  total: number;
  createdAt: string;
}

export const sendOrderConfirmation = async (email: string, orderDetails: OrderDetails) => {
  // You must set up your EmailJS account and replace these values:
  const SERVICE_ID = process.env.REACT_APP_EMAILJS_SERVICE_ID || '<YOUR_SERVICE_ID>';
  const TEMPLATE_ID = process.env.REACT_APP_EMAILJS_TEMPLATE_ID || '<YOUR_TEMPLATE_ID>';
  const USER_ID = process.env.REACT_APP_EMAILJS_USER_ID || '<YOUR_USER_ID>';

  const templateParams = {
    to_email: email,
    order_details: JSON.stringify(orderDetails, null, 2),
  };

  return emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, USER_ID);
};
