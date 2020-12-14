import React, { createContext, useContext, useReducer } from 'react';
import products from '../products';

// creating the context
const CartContext = createContext();
//creating custom hook for Context
export const useCart = () => useContext(CartContext);

//reducer
const initialState = { cart: []}

function reducer(state, {type, payload}){
    switch (type){
        case 'ADD':
            //action.payload is sku
            return {
                // create (spread) a new state object that is copy with old state when making reducer
                ...state,
                cart: [
                    ...state.cart,
                     products.find((product) => product.sku === payload)
                ]
            }
        case 'REMOVE':
            // find index of sku
            const indexInCart = state.cart.findIndex((p) => p.sku === payload);
            // create new state for cart
            const newCart = [...state.cart];
            // remove from new cart
            newCart.splice(indexInCart, 1);
            // return newCart state while spreading the old state
            return {
                ...state, 
                cart: newCart
            }
        case 'EMPTY':
            // empty the cart
            return { cart: [] }
        default: 
        return state;
    }
}

// cart context for Provider
export default function CartProvider({children}){
    // useReducer
    const [state, dispatch] = useReducer(reducer, initialState);

    const addItem = (sku) => dispatch({type: 'ADD', payload: sku});
    const removeItem = (sku) => dispatch({type: 'REMOVE', payload: sku});
    const emptyItems = () => dispatch({type: 'EMPTY'})

    const totalItems = sku =>{
        const itemsInCart = state.cart.filter((product) => product.sku === sku) ?? [];
        return itemsInCart.length;
    }

    function totalPrice(){
        return groupCartItems().reduce((totalPrice, product) =>{
            return totalPrice + product.price * product.quantity;
        }, 0);
    }

    function groupCartItems(){
        return state.cart.reduce((newCart, product) => {
            // check the newCart array for product
            const indexInCart = newCart.findIndex( p => p.sku === product.sku);
            const isInCart = indexInCart !== -1;

            // if product is in cart - update the quantity
            if(isInCart){
                newCart[indexInCart].quantity = newCart[indexInCart].quantity + 1;
                return newCart;
            }

            // if not in cart array, add it to array
            newCart.push({...product, quantity: 1});
            return newCart;
        }, []);
    }

    return (
        <CartContext.Provider value={{
            addItem,
            removeItem,
            emptyItems,
            cart: state.cart,
            cartGroupedByItems: groupCartItems(),
            totalItems,
            totalPrice: totalPrice(),
        }}>
            {children}
        </CartContext.Provider>
    )
}
