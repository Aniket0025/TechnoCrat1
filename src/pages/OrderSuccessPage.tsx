import React from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const OrderSuccessPage: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh]">
      <div className="text-green-600 text-6xl mb-4">✓</div>
      <h1 className="text-2xl font-bold mb-2">Order Confirmed!</h1>
      <p className="text-gray-600 mb-6">Thank you for shopping eco-friendly with EcoCart.<br />Your payment was successful and your order is on its way.</p>
      <Button className="mb-2" onClick={() => navigate("/product-list")}>Shop More</Button>
      <Button variant="outline" onClick={() => navigate("/")}>Go to Home</Button>
    </div>
  );
};

export default OrderSuccessPage;
