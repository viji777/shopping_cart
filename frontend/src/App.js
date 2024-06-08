import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { debounce } from 'lodash';
import Cart from './Cart';
import OrderSummary from './OrderSummary';


function App() {
  const [carts, setCarts] = useState([]);
  const [cartNumber, setCartNumber] = useState(1);
  const [loading, setLoading] = useState(true);
  const [totalCarts, setTotalCarts] = useState(1);

  const fetchCartsData = () => {
    axios.get('http://localhost:5000/carts')
      .then(response => {
        const cartsData = response.data.carts;
        console.log(response)
        setTotalCarts(cartsData.length);
        setCarts(cartsData[cartNumber - 1]?.products || []);
        setLoading(false);
        console.log("Fetched carts data:", cartsData);
      })
      .catch(error => {
        console.error("Error fetching carts data:", error);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchCartsData();
  }, []);

  useEffect(() => {
    if (totalCarts > 0) {
      fetchCartsData();
    }
  }, [cartNumber, totalCarts]);

  const nextCart = () => {
    if (cartNumber < totalCarts) {
      setCartNumber(prevIndex => prevIndex + 1);
    }
  };

  const prevCart = () => {
    if (cartNumber > 1) {
      setCartNumber(prevIndex => prevIndex - 1);
    }
  };

  const updateCartItem = useCallback(
    debounce((updatedCartItem) => {
      setCarts(prevCarts => {
        const updatedCarts = prevCarts.map(cartItem => {
          if (cartItem.id === updatedCartItem.id) {
            return updatedCartItem;
          }
          return cartItem;
        }).filter(cartItem => cartItem.quantity > 0);

        axios.put(`http://localhost:5000/carts/${cartNumber}`, { products: updatedCarts })
          .then(response => {
            console.log("Cart updated successfully:", response.data);
            fetchCartsData();
          })
          .catch(error => {
            console.error("Error updating cart:", error);
            setLoading(false);
          });

        return updatedCarts;
      });
    }, 300), // 300ms debounce time
    [cartNumber]
  );

  if (loading) {
    return <h1>Loading...</h1>;
  }

  return (
    <div>
      <div className='grid grid-cols-6 h-screen'>
        <div className='col-span-4 m-16'>
          <Cart cart={carts} updateCartItem={updateCartItem} />
          <div className="flex justify-between items-center text-violet-600 font-semibold">
            <div className='flex gap-2 items-center'>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 15.75 3 12m0 0 3.75-3.75M3 12h18" />
              </svg>
              <button onClick={prevCart} className={`text-lg ${cartNumber === 1 ? 'disabled' : ''}`} disabled={cartNumber === 1}>
                Previous Cart
              </button>
            </div>
            <div className='flex gap-2 items-center'>
              <button onClick={nextCart} className={`text-lg ${cartNumber === totalCarts ? 'disabled' : ''}`} disabled={cartNumber === totalCarts}>
                Next Cart
              </button>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
              </svg>
            </div>
          </div>
        </div>
        <div className='col-span-2'>
          <OrderSummary carts={carts} />
        </div>
      </div>
    </div>
  );
}

export default App;
