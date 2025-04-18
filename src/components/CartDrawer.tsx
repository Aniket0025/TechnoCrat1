// CartDrawer removed
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";

interface CartDrawerProps {
  open: boolean;
  onClose: () => void;
}

const CartDrawer: React.FC<CartDrawerProps> = ({ open, onClose }) => {
  const { items, removeFromCart, clearCart, increaseQty, decreaseQty, total } = useCart();

  return (
    <div
      className={`fixed top-0 right-0 h-full w-80 bg-white dark:bg-gray-900 shadow-lg z-50 transform transition-transform duration-300 border-l border-gray-200 dark:border-gray-700 ${open ? "translate-x-0" : "translate-x-full"}`}
    >
      <div className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
        <h2 className="text-xl font-bold text-blue-700 dark:text-blue-300">🛒 Your Cart</h2>
        <Button variant="ghost" size="icon" aria-label="Close Cart" onClick={onClose}>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} className="h-5 w-5 text-gray-700 dark:text-gray-200">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </Button>
      </div>
      <div className="p-4 flex-1 overflow-y-auto bg-white dark:bg-gray-900">
        {items.length === 0 ? (
          <div className="text-gray-500 dark:text-gray-400 text-center mt-12">Cart is empty</div>
        ) : (
          <ul className="space-y-4">
            {items.map((item) => (
              <li key={item.product.id} className="flex justify-between items-center border-b border-gray-100 dark:border-gray-800 pb-2">
                <div>
                  <div className="font-medium text-gray-900 dark:text-gray-100">{item.product.name}</div>
                  <div className="flex items-center gap-2 mt-1">
                    <Button size="sm" variant="outline" onClick={() => decreaseQty(item.product.id)}>-</Button>
                    <span className="font-bold px-2 text-gray-900 dark:text-gray-100">{item.quantity}</span>
                    <Button size="sm" variant="outline" onClick={() => increaseQty(item.product.id)}>+</Button>
                  </div>
                  <div className="text-xs text-gray-400 dark:text-gray-300">₹{item.product.price} each</div>
                </div>
                <Button size="sm" variant="destructive" onClick={() => removeFromCart(item.product.id)}>
                  Remove
                </Button>
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 flex flex-col gap-2">
        <div className="flex justify-between font-bold text-lg text-gray-900 dark:text-gray-100">
          <span>Total:</span>
          <span>₹{total.toFixed(2)}</span>
        </div>
        <Button variant="outline" onClick={clearCart} disabled={items.length === 0}>Clear Cart</Button>
        <Button className="w-full" disabled={items.length === 0} onClick={onClose}>
          Proceed to Checkout
        </Button>
      </div>
    </div>
  );
};

export default CartDrawer;
