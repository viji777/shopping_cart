import Header from "./Header"
import { useState, useEffect } from "react";

function Cart({ cart, updateCartItem }) {

    console.log("Received cart data:", cart);

    const [items, setItems] = useState(cart);
    const [totalQuantity, setTotalQuantity] = useState(0);
    useEffect(() => {

        setItems(cart);
        updateTotalQuantity(cart);
    }, [cart]);


    useEffect(() => {
        updateTotalQuantity(items); // Update total quantity when items change
    }, [items]);

    const decreaseQuantity = (index) => {
        const updatedItems = [...items];
        if (updatedItems[index].quantity > 1) {
            updatedItems[index].quantity -= 1;
            setItems(updatedItems);
            updateCartItem(updatedItems[index]);

        }
    };

    const increaseQuantity = (index) => {
        const updatedItems = [...items];
        updatedItems[index].quantity += 1;
        setItems(updatedItems);
        updateCartItem(updatedItems[index]);
    };

    const handleQuantityChange = (event, index) => {
        const newQuantity = parseInt(event.target.value);
        if (!isNaN(newQuantity) && newQuantity >= 0) {
            const updatedItems = [...items];
            updatedItems[index].quantity = newQuantity;
            setItems(updatedItems);
            updateCartItem(updatedItems[index]);

        }
    };

    const handlePriceChange = (event, index) => {
        const inputValue = event.target.value.replace('$', '');
        const newPrice = parseFloat(inputValue);
        const updatedItems = [...items];

        if (!isNaN(newPrice) && newPrice >= 0) {
            updatedItems[index].price = newPrice;
        } else if (inputValue === '') {
            updatedItems[index].price = 0;  // Handle empty input as zero
        }

        setItems(updatedItems);
        updateCartItem(updatedItems[index]);
    };

    const removeItem = (index) => {
        const updatedItems = [...items];
        const removedItem = updatedItems.splice(index, 1)[0];
        setItems(updatedItems);
        updateTotalQuantity(updatedItems);
        updateCartItem({ ...removedItem, quantity: 0 }); // Update cart with zero quantity to indicate removal
    };
    const updateTotalQuantity = (updatedItems) => {
        let total = 0;
        updatedItems.forEach((product) => {
            total += product.quantity;
        });
        setTotalQuantity(total);
    }

    console.log("Items state:", items);

    return (
        <div>
            <div className="gabarito">
                <div className="flex justify-between font-bold text-4xl">

                    <h2 >Shopping Cart</h2>
                    <h2>{totalQuantity} Items</h2>
                </div>
                <hr className="h-0.5 my-6  bg-slate-200"></hr>
                <Header></Header>


                {
                    items.map(function (product, index) {
                        return (
                            <div>

                                <div className="grid grid-cols-5 gap-1 mb-12 " key={product.id}>

                                    <img className="col-span-1 h-36 w-36 " src={product.thumbnail} alt={product.title}></img>
                                    <div className="col-span-1 ">
                                        <p className=" font-semibold text-xl flex  " >{product.title}</p>
                                        <p className="mt-4 text-base text-red-500">Id:{product.id}</p>
                                        <button className="mt-4 text-base text-slate-500" onClick={() => removeItem(index)}>Remove</button>
                                    </div>

                                    <div className=" col-span-1 ">
                                        <div className="flex gap-2 mx-28 justify-center items-center">
                                            <button className=" text-4xl" onClick={() => decreaseQuantity(index)}>-</button>
                                            <input type="text"
                                                className=" h-8 w-10  text-slate-500 cursor-text text-center  border border-slate-300 rounded"
                                                value={product.quantity} onChange={(event) => handleQuantityChange(event, index)}></input>
                                            <button className="text-3xl" onClick={() => increaseQuantity(index)}>+</button>{/* <p className="col-span-1 mx-24 ">{product.quantity}</p> */}
                                        </div>
                                    </div>
                                    <input
                                        type="text"
                                        className="col-span-1 mx-24 font-semibold flex justify-center  text-center border border-slate-300 rounded h-8 w-14"
                                        
                                        value={product.price > 0 ? `$${Math.round(product.price)}` : 0}

                                        onChange={(event) => handlePriceChange(event, index)}
                                    />
                                    <p className="col-span-1 mx-28 font-semibold flex justify-center">${product.quantity * Math.round(product.price)}</p>
                                </div>
                            </div>
                        )
                    })
                }




            </div>

        </div >

    )
}
export default Cart