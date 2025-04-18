// CartPage removed
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const CartPage: React.FC = () => {
  const { items, increaseQty, decreaseQty, removeFromCart, clearCart, total } = useCart();
  const navigate = useNavigate();

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">🛒 Your Cart</h1>
      {items.length === 0 ? (
        <div className="text-gray-500 text-center mt-20">
          Cart is empty.
          <div className="mt-4">
            <Button onClick={() => navigate("/product-list")}>Browse Products</Button>
          </div>
        </div>
      ) : (
        <>
          <ul className="divide-y mb-6">
            {items.map((item) => (
              <li key={item.product.id} className="flex justify-between items-center py-4">
                <div>
                  <div className="font-medium">{item.product.name}</div>
                  <div className="text-xs text-gray-500">₹{item.product.price} each</div>
                  <div className="flex items-center gap-2 mt-1">
                    <Button size="sm" variant="outline" onClick={() => decreaseQty(item.product.id)}>-</Button>
                    <span className="font-bold px-2">{item.quantity}</span>
                    <Button size="sm" variant="outline" onClick={() => increaseQty(item.product.id)}>+</Button>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <span className="font-bold">₹{(item.product.price * item.quantity).toFixed(2)}</span>
                  <Button size="sm" variant="destructive" onClick={() => removeFromCart(item.product.id)}>
                    Remove
                  </Button>
                </div>
              </li>
            ))}
          </ul>
          <div className="flex justify-between items-center mb-6">
            <span className="font-bold text-lg">Total:</span>
            <span className="text-xl font-bold">₹{total.toFixed(2)}</span>
          </div>
          <div className="flex gap-4 mb-6">
            <Button variant="outline" onClick={clearCart}>Clear Cart</Button>
            <Button onClick={() => navigate("/product-list")}>Continue Shopping</Button>
          </div>
          <div className="flex justify-center">

          </div>
        </>
      )}
    </div>
  );
};

export default CartPage;
