import React, { createContext, useReducer } from 'react';

// Define initial state
const initialState = {
  cartItems: [],
};

// Define reducer function
const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_CART':
      return {
        ...state,
        cartItems: [...state.cartItems, action.payload],
      };
    case 'DELETE_FROM_CART':
      return {
        ...state,
        cartItems: state.cartItems.filter(item => item.id !== action.payload),
      };
    case 'UPDATE_QUANTITY':
      return {
        ...state,
        cartItems: state.cartItems.map(item =>
          item.id === action.payload.productId
            ? { ...item, quantity: action.payload.newQuantity }
            : item
        ),
      };
    case 'CLEAR_CART':
      return {
        ...state,
        cartItems: [],
      };
    default:
      return state;
  }
};

// Create a context for the cart state
export const CartContext = createContext();

// CartContextProvider component to provide the cart state to its children
export const CartContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  const addToCart = (product) => {
    dispatch({ type: 'ADD_TO_CART', payload: product });
  };

  const deleteFromCart = (productId) => {
    dispatch({ type: 'DELETE_FROM_CART', payload: productId });
  };

  const updateQuantity = (productId, newQuantity) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { productId, newQuantity } });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  return (
    <CartContext.Provider value={{ cartItems: state.cartItems, addToCart, deleteFromCart, updateQuantity, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};
