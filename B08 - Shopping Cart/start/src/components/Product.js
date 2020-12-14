import React from 'react';
import { useCart } from '../Context/use-cart';

export default function Products({product}){
    // const { addItem, removeItem, findInCart } = useCart();
    const {addItem, totalItems, removeItem} = useCart();
      return (
        <div className="product">
            <h3>{product.name}</h3>
            <img src={product.image_url} alt={product.name}/>
            <div className="product-buttons">
            {
                 totalItems(product.sku) > 0 ? (
                    <button onClick={() => removeItem(product.sku)} className="remove"> Remove</button>
                 ) : (
                    <div></div>
                 )
            }
            <button onClick={() => addItem(product.sku)} className="add"> Add to Cart ({totalItems(product.sku)}) </button>
            </div>
        </div>
      )
  }