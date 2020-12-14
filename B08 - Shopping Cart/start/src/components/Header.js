import React, { useRef, useState } from 'react';
import CartIcon from '../supermarket.svg';
import useOnClickOutside from 'use-onclickoutside';
import { useCart } from '../Context/use-cart';
import Cart from './Cart';

export default function Header() {
  const {cart} = useCart();

  const modalRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  
  useOnClickOutside(modalRef, () =>{
    if(isOpen === true) setIsOpen(false);
  });

  
  return (
    <header>
      <div className="container">
        <div className="cart-button">
          <button onClick={() => setIsOpen(!isOpen)}>
            <img src={CartIcon} width="30" />({cart.length})
          </button>
          <div ref={modalRef} className="cart-modal" style={{ display: isOpen ? 'block' : 'none' }}>
            <Cart/>
          </div>
        </div>
      </div>
    </header>
  );
}
