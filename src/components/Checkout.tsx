import { useState } from 'react';
import { CartItem } from './Cart';
import { ArrowLeft, CreditCard, Banknote, CheckCircle2, Lock, Truck, ShieldCheck } from 'lucide-react';

interface CheckoutProps {
  items: CartItem[];
  onBack: () => void;
  onOrderComplete: () => void;
}

type PaymentMethod = 'bkash' | 'nagad' | 'card' | 'cod' | 'rocket' | null;
type CheckoutStep = 'shipping' | 'payment' | 'confirm' | 'success';

export default function Checkout({ items, onBack, onOrderComplete }: CheckoutProps) {
  const [step, setStep] = useState<CheckoutStep>('shipping');
  const [selectedPayment, setSelectedPayment] = useState<PaymentMethod>(null);
  const [processing, setProcessing] = useState(false);

  const [shipping, setShipping] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    area: '',
    city: 'Dhaka',
    note: '',
  });

  const [cardInfo, setCardInfo] = useState({
    number: '',
    name: '',
    expiry: '',
    cvv: '',
  });

  const [mfsNumber, setMfsNumber] = useState('');
  const [mfsTrxId, setMfsTrxId] = useState('');

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const delivery = subtotal >= 5000 ? 0 : 150;
  const total = subtotal + delivery;

  const orderId = `AUR-${Date.now().toString(36).toUpperCase()}`;

  const handlePlaceOrder = () => {
    setProcessing(true);
    setTimeout(() => {
      setProcessing(false);
      setStep('success');
    }, 2500);
  };

  const areas = [
    'Gulshan', 'Banani', 'Baridhara', 'Bashundhara', 'Dhanmondi', 'Uttara',
    'Mirpur', 'Mohammadpur', 'Motijheel', 'Tejgaon', 'Badda', 'Khilgaon', 'Other'
  ];

  const paymentMethods = [
    {
      id: 'bkash' as PaymentMethod,
      name: 'bKash',
      desc: 'Pay with bKash mobile wallet',
      color: 'bg-[#E2136E]',
      icon: '🅱️',
    },
    {
      id: 'nagad' as PaymentMethod,
      name: 'Nagad',
      desc: 'Pay with Nagad mobile wallet',
      color: 'bg-[#F6921E]',
      icon: '🟠',
    },
    {
      id: 'rocket' as PaymentMethod,
      name: 'Rocket',
      desc: 'Pay with Rocket (DBBL)',
      color: 'bg-[#8B2F8B]',
      icon: '🚀',
    },
    {
      id: 'card' as PaymentMethod,
      name: 'Credit / Debit Card',
      desc: 'Visa, Mastercard, AMEX accepted',
      color: 'bg-blue-600',
      icon: '💳',
    },
    {
      id: 'cod' as PaymentMethod,
      name: 'Cash on Delivery',
      desc: 'Pay when your order arrives',
      color: 'bg-green-600',
      icon: '💵',
    },
  ];

  // SUCCESS SCREEN
  if (step === 'success') {
    return (
      <div className="min-h-screen bg-aurelia-white flex items-center justify-center p-6">
        <div className="max-w-md w-full text-center animate-fade-in">
          <div className="w-20 h-20 rounded-full bg-green-50 flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-10 h-10 text-green-500" />
          </div>
          <h1 className="font-playfair text-3xl font-bold mb-2">Order Confirmed!</h1>
          <p className="text-sm text-gray-500 mb-8">Thank you for shopping with AURELIA</p>

          <div className="bg-[#F9F9F9] border border-gray-100 p-6 text-left space-y-4 mb-8">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Order ID</span>
              <span className="font-mono font-bold text-aurelia-gold">{orderId}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Total</span>
              <span className="font-playfair font-bold text-lg">৳{total.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Payment</span>
              <span className="font-medium">{paymentMethods.find(p => p.id === selectedPayment)?.name}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Delivery</span>
              <span className="font-medium">{shipping.area}, {shipping.city}</span>
            </div>
            <div className="pt-3 border-t border-gray-100">
              <p className="text-xs text-gray-400">Estimated delivery: 2-4 business days inside Dhaka</p>
            </div>
          </div>

          <div className="space-y-3">
            <button
              onClick={onOrderComplete}
              className="w-full py-4 bg-aurelia-black text-aurelia-ivory text-[11px] font-bold uppercase tracking-[0.2em] hover:bg-aurelia-gold hover:text-aurelia-black transition-all"
            >
              Continue Shopping
            </button>
          </div>

          <p className="text-[10px] text-gray-400 mt-6">
            A confirmation has been sent to {shipping.email || 'your email'}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-aurelia-white text-aurelia-black">
      {/* Header */}
      <div className="border-b border-gray-100 sticky top-0 bg-white/95 backdrop-blur-md z-50">
        <div className="max-w-6xl mx-auto px-6 md:px-20 py-5 flex items-center justify-between">
          <button onClick={onBack} className="flex items-center gap-2 text-sm hover:text-aurelia-gold transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back
          </button>
          <h1 className="font-playfair text-xl font-bold tracking-[0.1em]">AURELIA</h1>
          <div className="flex items-center gap-1 text-[10px] text-gray-400 uppercase tracking-widest">
            <Lock className="w-3 h-3" /> Secure Checkout
          </div>
        </div>
      </div>

      {/* Progress Steps */}
      <div className="max-w-6xl mx-auto px-6 md:px-20 py-8">
        <div className="flex items-center justify-center gap-3 mb-12">
          {['shipping', 'payment', 'confirm'].map((s, i) => (
            <div key={s} className="flex items-center gap-3">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                step === s ? 'bg-aurelia-black text-white' :
                ['shipping', 'payment', 'confirm'].indexOf(step) > i ? 'bg-aurelia-gold text-white' :
                'bg-gray-100 text-gray-400'
              }`}>
                {['shipping', 'payment', 'confirm'].indexOf(step) > i ? '✓' : i + 1}
              </div>
              <span className={`text-[10px] uppercase tracking-[0.2em] font-bold hidden sm:block ${
                step === s ? 'text-aurelia-black' : 'text-gray-300'
              }`}>
                {s === 'shipping' ? 'Shipping' : s === 'payment' ? 'Payment' : 'Review'}
              </span>
              {i < 2 && <div className="w-16 h-[1px] bg-gray-200 hidden sm:block" />}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* STEP 1: SHIPPING */}
            {step === 'shipping' && (
              <div className="animate-fade-in">
                <h2 className="font-playfair text-2xl font-bold mb-8">Shipping Information</h2>
                <div className="space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-[10px] text-gray-400 uppercase tracking-[0.2em] font-bold mb-2">Full Name *</label>
                      <input
                        type="text"
                        value={shipping.name}
                        onChange={(e) => setShipping({...shipping, name: e.target.value})}
                        placeholder="Enter your full name"
                        className="w-full px-4 py-3.5 border border-gray-200 text-sm focus:outline-none focus:border-aurelia-black transition-colors placeholder:text-gray-300"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] text-gray-400 uppercase tracking-[0.2em] font-bold mb-2">Phone Number *</label>
                      <input
                        type="tel"
                        value={shipping.phone}
                        onChange={(e) => setShipping({...shipping, phone: e.target.value})}
                        placeholder="01XXXXXXXXX"
                        className="w-full px-4 py-3.5 border border-gray-200 text-sm focus:outline-none focus:border-aurelia-black transition-colors placeholder:text-gray-300"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[10px] text-gray-400 uppercase tracking-[0.2em] font-bold mb-2">Email Address</label>
                    <input
                      type="email"
                      value={shipping.email}
                      onChange={(e) => setShipping({...shipping, email: e.target.value})}
                      placeholder="your@email.com"
                      className="w-full px-4 py-3.5 border border-gray-200 text-sm focus:outline-none focus:border-aurelia-black transition-colors placeholder:text-gray-300"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] text-gray-400 uppercase tracking-[0.2em] font-bold mb-2">Full Address *</label>
                    <input
                      type="text"
                      value={shipping.address}
                      onChange={(e) => setShipping({...shipping, address: e.target.value})}
                      placeholder="House, Road, Block, Sector"
                      className="w-full px-4 py-3.5 border border-gray-200 text-sm focus:outline-none focus:border-aurelia-black transition-colors placeholder:text-gray-300"
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-[10px] text-gray-400 uppercase tracking-[0.2em] font-bold mb-2">Area *</label>
                      <select
                        value={shipping.area}
                        onChange={(e) => setShipping({...shipping, area: e.target.value})}
                        className="w-full px-4 py-3.5 border border-gray-200 text-sm focus:outline-none focus:border-aurelia-black transition-colors bg-white"
                      >
                        <option value="">Select Area</option>
                        {areas.map((a) => <option key={a} value={a}>{a}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="block text-[10px] text-gray-400 uppercase tracking-[0.2em] font-bold mb-2">City</label>
                      <select
                        value={shipping.city}
                        onChange={(e) => setShipping({...shipping, city: e.target.value})}
                        className="w-full px-4 py-3.5 border border-gray-200 text-sm focus:outline-none focus:border-aurelia-black transition-colors bg-white"
                      >
                        <option value="Dhaka">Dhaka</option>
                        <option value="Chittagong">Chittagong</option>
                        <option value="Sylhet">Sylhet</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-[10px] text-gray-400 uppercase tracking-[0.2em] font-bold mb-2">Order Note (Optional)</label>
                    <textarea
                      value={shipping.note}
                      onChange={(e) => setShipping({...shipping, note: e.target.value})}
                      placeholder="Special delivery instructions..."
                      rows={3}
                      className="w-full px-4 py-3.5 border border-gray-200 text-sm focus:outline-none focus:border-aurelia-black transition-colors resize-none placeholder:text-gray-300"
                    />
                  </div>
                </div>
                <button
                  onClick={() => setStep('payment')}
                  disabled={!shipping.name || !shipping.phone || !shipping.address || !shipping.area}
                  className="w-full mt-8 py-4 bg-aurelia-black text-aurelia-ivory text-[11px] font-bold uppercase tracking-[0.2em] hover:bg-aurelia-gold hover:text-aurelia-black transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  Continue to Payment
                </button>
              </div>
            )}

            {/* STEP 2: PAYMENT */}
            {step === 'payment' && (
              <div className="animate-fade-in">
                <h2 className="font-playfair text-2xl font-bold mb-8">Payment Method</h2>
                <div className="space-y-3">
                  {paymentMethods.map((method) => (
                    <button
                      key={method.id}
                      onClick={() => setSelectedPayment(method.id)}
                      className={`w-full flex items-center gap-4 p-5 border text-left transition-all ${
                        selectedPayment === method.id
                          ? 'border-aurelia-black bg-[#F9F9F9]'
                          : 'border-gray-100 hover:border-gray-300'
                      }`}
                    >
                      <div className={`w-12 h-12 ${method.color} rounded-lg flex items-center justify-center text-white text-xl flex-shrink-0`}>
                        {method.icon}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-bold">{method.name}</p>
                        <p className="text-xs text-gray-400 mt-0.5">{method.desc}</p>
                      </div>
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                        selectedPayment === method.id ? 'border-aurelia-black' : 'border-gray-200'
                      }`}>
                        {selectedPayment === method.id && <div className="w-3 h-3 rounded-full bg-aurelia-black" />}
                      </div>
                    </button>
                  ))}
                </div>

                {/* bKash / Nagad / Rocket Details */}
                {(selectedPayment === 'bkash' || selectedPayment === 'nagad' || selectedPayment === 'rocket') && (
                  <div className="mt-6 p-6 bg-[#F9F9F9] border border-gray-100 animate-fade-in space-y-4">
                    <div className={`p-4 rounded-lg text-white text-sm ${
                      selectedPayment === 'bkash' ? 'bg-[#E2136E]' :
                      selectedPayment === 'nagad' ? 'bg-[#F6921E]' : 'bg-[#8B2F8B]'
                    }`}>
                      <p className="font-bold mb-1">Send Payment To:</p>
                      <p className="text-2xl font-bold font-mono tracking-widest">01711-000000</p>
                      <p className="text-xs mt-1 opacity-80">
                        {selectedPayment === 'bkash' ? 'bKash' : selectedPayment === 'nagad' ? 'Nagad' : 'Rocket'} Personal • AURELIA
                      </p>
                    </div>
                    <div className="space-y-3">
                      <div>
                        <label className="block text-[10px] text-gray-400 uppercase tracking-[0.2em] font-bold mb-2">
                          Your {selectedPayment === 'bkash' ? 'bKash' : selectedPayment === 'nagad' ? 'Nagad' : 'Rocket'} Number
                        </label>
                        <input
                          type="tel"
                          value={mfsNumber}
                          onChange={(e) => setMfsNumber(e.target.value)}
                          placeholder="01XXXXXXXXX"
                          className="w-full px-4 py-3.5 border border-gray-200 text-sm focus:outline-none focus:border-aurelia-black transition-colors placeholder:text-gray-300"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] text-gray-400 uppercase tracking-[0.2em] font-bold mb-2">Transaction ID (TrxID)</label>
                        <input
                          type="text"
                          value={mfsTrxId}
                          onChange={(e) => setMfsTrxId(e.target.value)}
                          placeholder="e.g. AK47XYZ9"
                          className="w-full px-4 py-3.5 border border-gray-200 text-sm focus:outline-none focus:border-aurelia-black transition-colors placeholder:text-gray-300"
                        />
                      </div>
                      <p className="text-[10px] text-gray-400">
                        Amount: <span className="font-bold text-aurelia-black">৳{total.toLocaleString()}</span> — 
                        Send exact amount, then enter your number and TrxID above.
                      </p>
                    </div>
                  </div>
                )}

                {/* Card Details */}
                {selectedPayment === 'card' && (
                  <div className="mt-6 p-6 bg-[#F9F9F9] border border-gray-100 animate-fade-in space-y-4">
                    <div className="flex items-center gap-2 mb-2">
                      <CreditCard className="w-5 h-5 text-gray-400" />
                      <span className="text-xs text-gray-400 font-bold uppercase tracking-widest">Card Details</span>
                    </div>
                    <div>
                      <label className="block text-[10px] text-gray-400 uppercase tracking-[0.2em] font-bold mb-2">Card Number</label>
                      <input
                        type="text"
                        value={cardInfo.number}
                        onChange={(e) => setCardInfo({...cardInfo, number: e.target.value})}
                        placeholder="1234 5678 9012 3456"
                        maxLength={19}
                        className="w-full px-4 py-3.5 border border-gray-200 text-sm focus:outline-none focus:border-aurelia-black transition-colors placeholder:text-gray-300 font-mono tracking-widest"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] text-gray-400 uppercase tracking-[0.2em] font-bold mb-2">Cardholder Name</label>
                      <input
                        type="text"
                        value={cardInfo.name}
                        onChange={(e) => setCardInfo({...cardInfo, name: e.target.value})}
                        placeholder="Name on card"
                        className="w-full px-4 py-3.5 border border-gray-200 text-sm focus:outline-none focus:border-aurelia-black transition-colors placeholder:text-gray-300"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] text-gray-400 uppercase tracking-[0.2em] font-bold mb-2">Expiry Date</label>
                        <input
                          type="text"
                          value={cardInfo.expiry}
                          onChange={(e) => setCardInfo({...cardInfo, expiry: e.target.value})}
                          placeholder="MM/YY"
                          maxLength={5}
                          className="w-full px-4 py-3.5 border border-gray-200 text-sm focus:outline-none focus:border-aurelia-black transition-colors placeholder:text-gray-300 font-mono"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] text-gray-400 uppercase tracking-[0.2em] font-bold mb-2">CVV</label>
                        <input
                          type="password"
                          value={cardInfo.cvv}
                          onChange={(e) => setCardInfo({...cardInfo, cvv: e.target.value})}
                          placeholder="•••"
                          maxLength={4}
                          className="w-full px-4 py-3.5 border border-gray-200 text-sm focus:outline-none focus:border-aurelia-black transition-colors placeholder:text-gray-300 font-mono"
                        />
                      </div>
                    </div>
                    <div className="flex items-center gap-2 pt-2 text-gray-400">
                      <Lock className="w-3 h-3" />
                      <p className="text-[10px]">Your card details are encrypted and secure</p>
                    </div>
                  </div>
                )}

                {/* COD Note */}
                {selectedPayment === 'cod' && (
                  <div className="mt-6 p-6 bg-green-50 border border-green-100 animate-fade-in flex items-start gap-3">
                    <Banknote className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-green-800">Cash on Delivery</p>
                      <p className="text-xs text-green-600 mt-1">Pay ৳{total.toLocaleString()} in cash when your order is delivered. Our delivery partner will collect the payment.</p>
                    </div>
                  </div>
                )}

                <div className="flex gap-4 mt-8">
                  <button
                    onClick={() => setStep('shipping')}
                    className="px-8 py-4 border border-gray-200 text-[11px] font-bold uppercase tracking-[0.2em] hover:border-aurelia-black transition-all"
                  >
                    Back
                  </button>
                  <button
                    onClick={() => setStep('confirm')}
                    disabled={!selectedPayment}
                    className="flex-1 py-4 bg-aurelia-black text-aurelia-ivory text-[11px] font-bold uppercase tracking-[0.2em] hover:bg-aurelia-gold hover:text-aurelia-black transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                  >
                    Review Order
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3: CONFIRM */}
            {step === 'confirm' && (
              <div className="animate-fade-in">
                <h2 className="font-playfair text-2xl font-bold mb-8">Order Review</h2>

                {/* Shipping Summary */}
                <div className="p-6 border border-gray-100 mb-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400">Delivery Address</h3>
                    <button onClick={() => setStep('shipping')} className="text-[10px] text-aurelia-gold font-bold uppercase tracking-widest">Edit</button>
                  </div>
                  <p className="text-sm font-medium">{shipping.name}</p>
                  <p className="text-xs text-gray-500 mt-1">{shipping.phone}</p>
                  <p className="text-xs text-gray-500">{shipping.address}</p>
                  <p className="text-xs text-gray-500">{shipping.area}, {shipping.city}</p>
                </div>

                {/* Payment Summary */}
                <div className="p-6 border border-gray-100 mb-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400">Payment Method</h3>
                    <button onClick={() => setStep('payment')} className="text-[10px] text-aurelia-gold font-bold uppercase tracking-widest">Edit</button>
                  </div>
                  <p className="text-sm font-medium">{paymentMethods.find(p => p.id === selectedPayment)?.name}</p>
                  {(selectedPayment === 'bkash' || selectedPayment === 'nagad' || selectedPayment === 'rocket') && mfsTrxId && (
                    <p className="text-xs text-gray-500 mt-1">TrxID: {mfsTrxId}</p>
                  )}
                </div>

                {/* Items Summary */}
                <div className="p-6 border border-gray-100 mb-6">
                  <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 mb-4">Items ({items.length})</h3>
                  {items.map((item) => (
                    <div key={item.id} className="flex items-center gap-4 py-3 border-b border-gray-50 last:border-0">
                      <div className="w-16 h-16 bg-[#F5F5F5] flex-shrink-0 overflow-hidden">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">{item.brand}</p>
                        <p className="text-sm font-medium truncate">{item.name}</p>
                        <p className="text-xs text-gray-400">Qty: {item.quantity}</p>
                      </div>
                      <p className="font-playfair font-bold">৳{(item.price * item.quantity).toLocaleString()}</p>
                    </div>
                  ))}
                </div>

                <div className="flex gap-4">
                  <button
                    onClick={() => setStep('payment')}
                    className="px-8 py-4 border border-gray-200 text-[11px] font-bold uppercase tracking-[0.2em] hover:border-aurelia-black transition-all"
                  >
                    Back
                  </button>
                  <button
                    onClick={handlePlaceOrder}
                    disabled={processing}
                    className="flex-1 py-4 bg-aurelia-gold text-aurelia-black text-[11px] font-bold uppercase tracking-[0.2em] hover:bg-aurelia-black hover:text-aurelia-ivory transition-all disabled:opacity-70 flex items-center justify-center gap-2"
                  >
                    {processing ? (
                      <>
                        <div className="w-4 h-4 border-2 border-aurelia-black/30 border-t-aurelia-black rounded-full animate-spin" />
                        Processing...
                      </>
                    ) : (
                      `Place Order • ৳${total.toLocaleString()}`
                    )}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Order Summary Sidebar */}
          {step !== 'success' as string && (
            <div className="lg:col-span-1">
              <div className="sticky top-28 bg-[#F9F9F9] border border-gray-100 p-6">
                <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 mb-6">Order Summary</h3>

                <div className="space-y-4 mb-6">
                  {items.map((item) => (
                    <div key={item.id} className="flex gap-3">
                      <div className="w-14 h-14 bg-white flex-shrink-0 relative overflow-hidden">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                        <span className="absolute -top-1 -right-1 w-5 h-5 bg-aurelia-black text-white text-[9px] rounded-full flex items-center justify-center font-bold">
                          {item.quantity}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-medium truncate">{item.name}</p>
                        <p className="text-[10px] text-gray-400">{item.brand}</p>
                      </div>
                      <p className="text-xs font-bold whitespace-nowrap">৳{(item.price * item.quantity).toLocaleString()}</p>
                    </div>
                  ))}
                </div>

                <div className="space-y-3 pt-4 border-t border-gray-200 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Subtotal</span>
                    <span>৳{subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Delivery</span>
                    <span className={delivery === 0 ? 'text-green-600' : ''}>{delivery === 0 ? 'Free' : `৳${delivery}`}</span>
                  </div>
                  <div className="flex justify-between pt-3 border-t border-gray-200 font-bold">
                    <span>Total</span>
                    <span className="font-playfair text-lg">৳{total.toLocaleString()}</span>
                  </div>
                </div>

                <div className="mt-6 space-y-3">
                  <div className="flex items-center gap-2 text-[10px] text-gray-400">
                    <ShieldCheck className="w-3.5 h-3.5 text-green-500" />
                    <span>100% Authentic Products</span>
                  </div>
                  <div className="flex items-center gap-2 text-[10px] text-gray-400">
                    <Truck className="w-3.5 h-3.5 text-green-500" />
                    <span>Secure & Premium Packaging</span>
                  </div>
                  <div className="flex items-center gap-2 text-[10px] text-gray-400">
                    <Lock className="w-3.5 h-3.5 text-green-500" />
                    <span>Encrypted & Secure Payment</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
