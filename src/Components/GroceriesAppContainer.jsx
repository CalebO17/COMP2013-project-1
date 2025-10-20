import { useState } from "react";
import ProductsContainer from "./ProductsContainer";
import CartContainer from "./CartContainer";

export default function GroceriesAppContainer({ products }) {
  const [productQuantity, setQuantity] = useState(
    products.map((prod) => {
      return {
        id: prod.id,
        quantity: 0,
        price: prod.price.replace("$", ""),
      };
    })
  );
  // new state for cart which starts as an empty array
  const [cart, setCart] = useState([]);

  const handleAddToCart = (productToAdd) => {
    const currentProduct = products.find((prod) => prod.id === productToAdd.id);
    const productInCart = cart.find((item) => item.id === productToAdd.id);
    if (productToAdd.quantity === 0) {
      alert("Please add quantity before adding to cart!");
      return;
    }
    if (!productInCart) {
      setCart((prevCart) => {
        return [
          ...prevCart,
          {
            ...currentProduct,
            quantity: productToAdd.quantity,
            price: productToAdd.price,
          },
        ];
      });
    } else {
      setCart((prevCart) => {
        prevCart = prevCart.filter(
          (item) => item.id !== productToAdd.id
        ); /* I was having an issue where I would have the proper quantity on an item
          where the new quantity was being added on top of the old quantity in the cart
          but it would duplicate the item. So I would have a coke with a price of 1$ then
          another coke with quantity of 3 and the price of 3$ for example. So I thought maybe filtering to 
          constantly delete the old versions of items in the cart would work (and it does)
          but I know it might be overkill and there may be an easier way to do it without
          constantly filtering out the same item, but I couldnt seem to figure it out*/
        return [
          ...prevCart,
          {
            ...currentProduct,
            quantity: productToAdd.quantity + productInCart.quantity,
            price: productToAdd.price,
          },
        ];
      });
    }
  };

  const handleRemoveFromCart = (cartItem) => {
    const filteredCart = cart.filter((item) => item.id !== cartItem.id);
    setCart(filteredCart);
  };
  const handleAddQuantity = (productId, mode) => {
    const newProductQuantity = productQuantity.map((prod) => {
      if (prod.id === productId) {
        return { ...prod, quantity: prod.quantity + 1 };
      }
      return prod;
    });
    setQuantity(newProductQuantity);
    return;
  };
  const handleRemoveQuantity = (productId, mode) => {
    const newProductQuantity = productQuantity.map((prod) => {
      if (prod.id === productId && mode == "cart" && prod.quantity > 1) {
        return { ...prod, quantity: prod.quantity - 1 };
      } else if (prod.id === productId && mode == "shop" && prod.quantity > 0) {
        return { ...prod, quantity: prod.quantity - 1 };
      } else {
        return { ...prod };
      }
    });
    setQuantity(newProductQuantity);
    return;
  };
  return (
    <div>
      <div>
        <ProductsContainer
          products={products}
          productQuantity={productQuantity}
          setQuantity={setQuantity}
          handleAddQuantity={handleAddQuantity}
          handleRemoveQuantity={handleRemoveQuantity}
          handleAddToCart={handleAddToCart}
        />
        ;
      </div>
      <div>
        <h1>Cart</h1>
        <CartContainer
          cart={cart}
          handleRemoveFromCart={handleRemoveFromCart}
          handleAddQuantity={handleAddQuantity}
          handleRemoveQuantity={handleRemoveQuantity}
        />
      </div>
    </div>
  );
}
