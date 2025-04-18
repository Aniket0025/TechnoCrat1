import React from "react";
import { getOrders, clearOrders, Order } from "@/services/orderStorage";
import { Button } from "@/components/ui/button";

const AdminOrdersPage: React.FC = () => {
  const orders: Order[] = getOrders().reverse();

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">Admin: All Orders</h1>
      <Button variant="destructive" className="mb-4" onClick={clearOrders}>
        Clear All Orders
      </Button>
      {orders.length === 0 ? (
        <div className="text-gray-500 text-center mt-20">No orders found.</div>
      ) : (
        <ul className="divide-y">
          {orders.map((order) => (
            <li key={order.id} className="py-4">
              <div className="flex justify-between items-center">
                <div>
                  <div className="font-bold">Order #{order.id.slice(-6).toUpperCase()}</div>
                  <div className="text-xs text-gray-500">{order.date}</div>
                  <div className="text-xs text-gray-400">{order.email}</div>
                  <ul className="text-sm mt-2">
                    {order.items.map((item, idx) => (
                      <li key={idx}>
                        {item.product.name} x{item.quantity} (₹{item.product.price})
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="font-bold text-lg">₹{order.total.toFixed(2)}</div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AdminOrdersPage;
