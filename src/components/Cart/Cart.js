import React, { useContext } from 'react';

import classes from './Cart.module.css';
import Modal from '../UI/Modal';
import CartContext from '../../store/cart-context';
import CartItem from './CartItem';

export default function Cart(props) {

    const cartContext = useContext(CartContext);

    const cartItemRemoveHandler = (id) => {
        cartContext.removeItem(id);
    }
    const cartItemAddHandler = (item) => {
        cartContext.addItem({
            ...item,
            amount: 1
        })
    }

    const cartItems = ( 
        <ul className={classes['cart-items']}>
            { cartContext.items.map((item => 
                <CartItem key={item.id} 
                    name={item.name} 
                    price={item.price}
                    amount={item.amount}
                    onRemove={cartItemRemoveHandler.bind(null, item)}
                    onAdd={cartItemAddHandler.bind(null, item)}
                />)) }
        </ul> 
    );
    const totalAmount = `$${cartContext.totalAmount.toFixed(2)}`;
    const hasItems = cartContext.items.length > 0;

    return (
        <Modal onClose={props.onHideCard}>
            {hasItems && cartItems}
            <div className={classes.total}>
                <span>Total Amount</span>
                <span>{totalAmount}</span>
            </div>
            <div className={classes.actions}>
                <button className={classes['button--alt']} 
                        onClick={props.onHideCard}>
                    Close
                </button>
                {hasItems && <button className={classes.button}>Order</button>}
            </div>
        </Modal>
    )
}
