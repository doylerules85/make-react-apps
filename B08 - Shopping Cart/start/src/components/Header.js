import React, { useRef, useState } from 'react';
import CartIcon from '../supermarket.svg';
import useOnClickOutside from 'use-onclickoutside';

export default function Header() {

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
            <img src={CartIcon} width="30" />({0})
          </button>
          <div ref={modalRef} className="cart-modal" style={{ display: isOpen ? 'block' : 'none' }}>
            cart goes here
          </div>
        </div>
      </div>
    </header>
  );
}
