export const decreaseCartItem = (cartItems, cartItemToRemove) => {
  const newCart = cartItems.map((cartItem, index) => {
    if (index === cartItemToRemove) {
      return {
        ...cartItem,
        quantity: cartItem.quantity - 1,
      };
    } else {
      return cartItem;
    }
  });
  return newCart;
};

export const addItemToCart = (cartItems, cartItemToAdd) => {
  if (cartItems.length === 0) {
    return [{ ...cartItemToAdd, quantity: 1 }];
  }
  if (cartItems.length > 0) {
    const existingItem = cartItems.find(
      (cartItem) =>
        cartItem.id === cartItemToAdd.id &&
        JSON.stringify(cartItem.attributes) ===
          JSON.stringify(cartItemToAdd.attributes)
    );

    if (existingItem === undefined) {
      return [...cartItems, { ...cartItemToAdd, quantity: 1 }];
    }
    if (existingItem !== undefined) {
      const newCart = cartItems.filter((cartItem) => {
        return (
          cartItem.id !== existingItem.id ||
          JSON.stringify(cartItem.attributes) !==
            JSON.stringify(existingItem.attributes)
        );
      });
      return [
        ...newCart,
        { ...existingItem, quantity: existingItem.quantity + 1 },
      ];
    }
  }
};

export const increaseCartItem = (cartItems, cartItemToAdd) => {
  const newCart = cartItems.map((cartItem, index) => {
    console.log(index);
    console.log(cartItemToAdd);
    if (index === cartItemToAdd) {
      return {
        ...cartItem,
        quantity: cartItem.quantity + 1,
      };
    } else {
      return cartItem;
    }
  });
  return newCart;
};
