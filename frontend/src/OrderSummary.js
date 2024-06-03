import DeliveryDropdown from "./DeliveryDropdown";
import { useState } from "react";

function OrderSummary({ carts }) {
    const [discount, setDiscount] = useState('');
    const [deliveryOption, setDeliveryOption] = useState('standard');
    const [appliedDiscount, setAppliedDiscount] = useState(0); // State to store the applied discount
    const [isDiscountApplied, setIsDiscountApplied] = useState(false); // State to control discount application

    const handleDeliveryChange = (option) => {
        setDeliveryOption(option);
        
    };
    

    const handleDiscountChange = (e) => {
        setDiscount(e.target.value);
        setIsDiscountApplied(false); // Reset discount application when input changes
    };

    const applyDiscount = () => {
        let numericValue = parseFloat(discount);
        if (!isNaN(numericValue)) {
            if (discount.includes('%')) {
                setAppliedDiscount(numericValue / 100); // Store as a decimal fraction for percentage
            } else {
                setAppliedDiscount(numericValue);
            }
            setIsDiscountApplied(true); // Set discount as applied
        } else {
            setAppliedDiscount(0); // Reset applied discount if input is invalid
            setIsDiscountApplied(false);
        }
    };

    // Calculate total quantity
    
    const totalQuantity =carts.reduce((total, cartItem) => total + cartItem.quantity, 0);

    

    // Calculate subtotal
    const subtotal = carts.reduce((total, cartItem) => total + cartItem.quantity * cartItem.price, 0);

    // Calculate delivery cost based on the selected delivery option
    const deliveryCost = deliveryOption === 'standard' ? 5.00 : 10.00;

    // Calculate discount amount
    const discountAmount = isDiscountApplied ? (discount.includes('%') ? (subtotal * appliedDiscount) : appliedDiscount) : 0;

    // Calculate total cost
    const totalCost = (subtotal - discountAmount + deliveryCost);

    return (
        <div className="h-full bg-slate-100 fixed right-0 w-1/3">
            <div className="px-12">
                <div className="font-bold text-4xl pt-16">
                    <h2>Order Summary</h2>
                </div>
                <hr className="h-0.5 my-6 px-8 bg-slate-200"></hr>
                <div className="flex justify-between text-lg font-semibold">
                    <p>ITEMS {totalQuantity}</p>
                    <p>${Math.round(subtotal)}</p> {/* Subtotal without discount and shipping */}
                </div>
                <div className="flex flex-col space-y-4 mt-8 text-lg font-semibold">
                    <p>SHIPPING</p>
                    <DeliveryDropdown handleDeliveryChange={handleDeliveryChange} />
                    <p>PROMO CODE</p>
                    <input className="h-8 p-3 focus:outline-none cursor-text text-gray-500 text-lg" placeholder="Enter your code"></input>
                    <p>DISCOUNT</p>
                    <input className="h-8 p-3 focus:outline-none cursor-text text-gray-500 text-lg" placeholder="Enter your Discount" value={discount} onChange={handleDiscountChange}></input>
                    <button className="bg-orange-600 text-white p-2 w-28" onClick={applyDiscount}>APPLY</button>
                   
                    <hr className="h-0.5 px-8 bg-slate-200"></hr>
                </div>
                <div className="flex justify-between my-4 text-lg font-semibold">
                    <p>TOTAL COST</p>
                    <p>${Math.round(totalCost)}</p>
                </div>
                <button className="text-lg bg-violet-600 text-white py-2 font-semibold w-full">CHECKOUT</button>
            </div>
        </div>
    );
}

export default OrderSummary;
