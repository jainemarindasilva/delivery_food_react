import { useReducer } from 'react';

import CartContext from './cart-context';

const defaultCartState = {
    items: [],
    totalAmount: 0
}
const cartReducer = (state, action) => {

    let updatedTotalAmount = 0;
    let updatedItemAmount = 0;
    
    const existingCartItemIndex = state.items.findIndex(item => item.id === action.item.id);
    const existingCartItem = state.items[existingCartItemIndex];
    
    if (action.type === 'ADD') {        
        
        updatedTotalAmount = state.totalAmount + (action.item.price * action.item.amount);
        
        let updatedItems = [];
        if (existingCartItemIndex >= 0) {
            updatedItemAmount = existingCartItem.amount + action.item.amount;
            updatedItems = [...state.items];
            updatedItems[existingCartItemIndex] = {
                ...existingCartItem,
                amount: updatedItemAmount
            };
        }
        else {
            updatedItems = state.items.concat(action.item); //copia + novo item
        }
 
        return {
            items: updatedItems,
            totalAmount: updatedTotalAmount
        }
    }
    if (action.type === 'REMOVE') {

        updatedTotalAmount = state.totalAmount - existingCartItem.price;
        updatedItemAmount = existingCartItem.amount - 1;

        let updatedItems = [...state.items];
        
        if (existingCartItem.amount === 1) {
            updatedItems = state.items.filter(item => item.id !== existingCartItem.id);
        }
        else {
            updatedItems[existingCartItemIndex] = {
                ...existingCartItem,
                amount: existingCartItem.amount - 1
            };
        }
        
        return {
            items: updatedItems,
            totalAmount: updatedTotalAmount
        }
    }
    
    return defaultCartState;
} 

export default function CartProvider(props) {
    
    const [cartState, dispatchCartAction] = useReducer(cartReducer, defaultCartState);

    const addItemToCartHandler = (item) => {
        dispatchCartAction({type: 'ADD', item: item});
    }
    const removeItemFromCartHandler = (item) => {
        dispatchCartAction({type: 'REMOVE', item: item});
    }

    const cartContext = {
        items: cartState.items,
        totalAmount: cartState.totalAmount,
        addItem: addItemToCartHandler,
        removeItem: removeItemFromCartHandler
    }

    return (
        <CartContext.Provider value={cartContext}>
            {props.children}
        </CartContext.Provider>
    )
}
