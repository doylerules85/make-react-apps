import React from 'react';
import { useCart } from '../Context/use-cart';

export default function Cart() {
  const { addItem, removeItem,emptyItems, totalPrice, cartGroupedByItems, cart } = useCart();
  return (
    <div className="cart">
      {/* show cart items here */}
      {cartGroupedByItems.map((product, index) => (
        <div key={index} className="cart-item">
          <img src={product.image_url} alt={ product.name} width={100}/>

          <div className="content">
            <h3>{product.name}</h3>
            <div className="cart-buttons">
              <button onClick={() => removeItem(product.sku)}>(-)</button>
              <button>{product.quantity}</button>
              <button onClick={() => addItem(product.sku)}>(+)</button>
            </div>
          </div>
        </div>
      ))}
      {
        cart.length > 0 && (
          <button onClick={() => emptyItems()}> Empty Cart</button>
        )
      }
      {
        cart.length === 0
        ? <div> Add to Your Cart!</div>
        : <></>
      }
      <div className="total">${totalPrice}</div>
    </div>
  );
}
