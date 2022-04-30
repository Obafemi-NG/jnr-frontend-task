// export const addItemToCart = (cartItems, cartItemToAdd) => {
//   const existingItem = cartItems.find(
//     (cartItem) => cartItem.id === cartItemToAdd.id
//   );
//   if (existingItem) {
//     return cartItems.map((cartItem) =>
//       cartItem.id === cartItemToAdd.id
//         ? { ...cartItem, quantity: cartItem.quantity + 1 }
//         : cartItem
//     );
//   } else {
//     return [...cartItems, { ...cartItemToAdd, quantity: 1 }];
//   }
// };

export const removeItemFromCart = (cartItems, cartItemToRemove) => {
  const existingItem = cartItems.find(
    (cartItem) => cartItem.id === cartItemToRemove.id
  );
  if (existingItem.quantity === 1) {
    return cartItems.filter((cartItem) => cartItem.id !== cartItemToRemove.id);
  } else {
    return cartItems.map((cartItem) =>
      cartItem.id === cartItemToRemove.id
        ? { ...cartItem, quantity: cartItemToRemove.quantity - 1 }
        : cartItem
    );
  }
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
  // if (existingItem) {
  //   const incomingAttribute = Object.values(cartItemToAdd.attributes).map(
  //     (val) => {
  //       return val;
  //     }
  //   );
  //   console.log(JSON.stringify(incomingAttribute));
  //   const existingAttribute = Object.values(existingItem.attributes).map(
  //     (val) => {
  //       return val;
  //     }
  //   );
  //   if (!(existingAttribute === incomingAttribute)) {
  //     return [...cartItems, { ...cartItemToAdd, quantity: 1 }];
  //   }
  //   return cartItems.map((cartItem) =>
  //     cartItem.id === cartItemToAdd.id
  //       ? { ...cartItem, quantity: cartItem.quantity + 1 }
  //       : cartItem
  //   );
  // }
  // console.log(cartItemToAdd.attributes);
  // if (!existingItem) {
  //   return [...cartItems, { ...cartItemToAdd, quantity: 1 }];
  // } else {
  //   // return;
  // }
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
  // const existingItem = cartItems.find(
  //   (cartItem) => cartItem.id === cartItemToAdd.id
  // );

  // if (existingItem) {
  //   return cartItems.map((cartItem) =>
  //     cartItem.id === cartItemToAdd.id
  //       ? { ...cartItem, quantity: cartItem.quantity + 1 }
  //       : cartItem
  //   );
  // }
};

// export const decreaseCartItem = (cartItems, cartItemToRemove) => {
//   const existingItem = cartItems.find(cartItem => cartItem.id === cartItemToRemove.id );
//   if(existingItem.quantity === 1 ){
//     return(
//       cartItems.filter(cartItem => cartItem.id !== cartItemToRemove )
//     )

//     } else {
//       cartItems.map(cartItem => cartItem.id === cartItemToRemove.id ? { ...cartItem, quantity: cartItem.quantity - 1 } : cartItem  )
//     }

// }
