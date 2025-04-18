// Google Sheets persistence via webhook
import type { OrderDetails } from "@/services/emailService";

export const saveOrderToSheet = async (orderDetails: OrderDetails) => {
  // Replace with your actual Google Apps Script Webhook URL
  const SHEETS_WEBHOOK_URL = process.env.REACT_APP_SHEETS_WEBHOOK_URL || '<YOUR_WEBHOOK_URL>';
  const res = await fetch(SHEETS_WEBHOOK_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(orderDetails),
  });
  if (!res.ok) throw new Error('Failed to save order to Google Sheets');
  return res.json();
};
