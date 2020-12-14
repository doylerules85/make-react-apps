import React from 'react';

export default function Products({product}){
    // const { addItem, removeItem, findInCart } = useCart();
      return (
        <div className="product">
            <h3>{product.name}</h3>
            <img src={product.image_url} alt={product.name}/>
            <div className="product-buttons">
            <button className="remove"> Remove</button>
            <button className="add"> Add to Cart (0) </button>
            </div>
        </div>
      )
  }