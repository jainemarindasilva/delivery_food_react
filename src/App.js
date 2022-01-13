import React, { useState } from "react";

import Header from "./components/Layout/Header";
import Cart from "./components/Cart/Cart";
import Meals from "./components/Meals/Meals";
import CartProvider from "./store/CartProvider";

function App() {

    const [cartIsVisible, setCartIsVisible] = useState(false);

    const showCartHandler = () => {
        setCartIsVisible(true);
    }
    const hideCartHandler = () => {
        setCartIsVisible(false);
    }

    return (
        <CartProvider>
            { cartIsVisible && <Cart onHideCard={hideCartHandler}/> }
            <Header onShowCart={showCartHandler} />
            <main>
                <Meals />
            </main>
        </CartProvider>
    );
}

export default App;