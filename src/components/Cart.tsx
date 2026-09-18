import { X, Plus, Minus, Trash2, ShoppingBag } from 'lucide-react';

export interface CartItem {
  id: string;
  name: string;
  brand: string;
  price: number;
  image: string;
  quantity: number;
}

interface CartProps {
  items: CartItem[];
  isOpen: boolean;
  onClose: () => void;
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemove: (id: string) => void;
  onCheckout: () => void;
}

export default function Cart({ items, isOpen, onClose, onUpdateQuantity, onRemove, onCheckout }: CartProps) {
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const delivery = subtotal >= 5000 ? 0 : 150;
  const total = subtotal + delivery;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[200]">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />

      {/* Drawer */}
      <div className="absolute right-0 top-0 h-full w-full max-w-md bg-aurelia-white text-aurelia-black shadow-2xl flex flex-col animate-slide-in-right">
        {/* Header */}
        <div className="flex items-center justify-between px-8 py-6 border-b border-gray-100">
          <div>
            <h2 className="font-playfair text-xl font-bold">YOUR BAG</h2>
            <p className="text-[10px] text-gray-400 uppercase tracking-widest mt-1">{items.length} {items.length === 1 ? 'item' : 'items'}</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-50 rounded-lg transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-8 py-6">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-gray-400">
              <ShoppingBag className="w-16 h-16 mb-4 stroke-[0.5]" />
              <p className="text-sm font-medium">Your bag is empty</p>
              <p className="text-xs mt-1">Add items to get started</p>
            </div>
          ) : (
            <div className="space-y-6">
              {items.map((item) => (
                <div key={item.id} className="flex gap-4 pb-6 border-b border-gray-50">
                  {/* Image */}
                  <div className="w-24 h-28 bg-[#F5F5F5] flex-shrink-0 overflow-hidden">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </div>

                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <p className="text-[9px] text-gray-400 uppercase tracking-[0.2em] font-bold">{item.brand}</p>
                    <h3 className="text-sm font-medium mt-0.5 truncate">{item.name}</h3>
                    <p className="font-playfair font-bold mt-1">৳{item.price.toLocaleString()}</p>

                    <div className="flex items-center justify-between mt-3">
                      {/* Quantity */}
                      <div className="flex items-center border border-gray-200">
                        <button
                          onClick={() => onUpdateQuantity(item.id, Math.max(1, item.quantity - 1))}
                          className="w-8 h-8 flex items-center justify-center hover:bg-gray-50 transition-colors"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-8 h-8 flex items-center justify-center text-xs font-bold border-x border-gray-200">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                          className="w-8 h-8 flex items-center justify-center hover:bg-gray-50 transition-colors"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      {/* Remove */}
                      <button
                        onClick={() => onRemove(item.id)}
                        className="p-2 text-gray-300 hover:text-red-500 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-gray-100 px-8 py-6 space-y-4">
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">Subtotal</span>
                <span className="font-medium">৳{subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Delivery</span>
                <span className={delivery === 0 ? 'text-green-600 font-medium' : 'font-medium'}>
                  {delivery === 0 ? 'Free' : `৳${delivery}`}
                </span>
              </div>
              {delivery === 0 && (
                <p className="text-[10px] text-green-600 tracking-wide">✓ Complimentary delivery applied</p>
              )}
            </div>
            <div className="flex justify-between pt-3 border-t border-gray-100">
              <span className="font-bold">Total</span>
              <span className="font-playfair text-xl font-bold">৳{total.toLocaleString()}</span>
            </div>
            <button
              onClick={onCheckout}
              className="w-full py-4 bg-aurelia-black text-aurelia-ivory text-[11px] font-bold uppercase tracking-[0.2em] hover:bg-aurelia-gold hover:text-aurelia-black transition-all"
            >
              Proceed To Checkout
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
