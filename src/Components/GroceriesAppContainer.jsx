import { useState } from "react";
import ProductsContainer from "./ProductsContainer";
import CartContainer from "./CartContainer";
import NavBar from "./NavBar";

export default function GroceriesAppContainer({ products }) {
  //products.js file being brought in
  //Creating a state for an array of objects representing each product
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

  //Function to handle adding to cart
  const handleAddToCart = (productToAdd) => {
    const currentProduct = products.find((prod) => prod.id === productToAdd.id); // Finding product in the products array
    const productInCart = cart.find((item) => item.id === productToAdd.id); // Checking if product is in cart by looking through the cart array
    if (productToAdd.quantity === 0) {
      alert("Please add quantity before adding to cart!"); // Cannot add an item with quantity "0" to the cart
      return;
    }
    if (!productInCart) {
      //If the product is not in the cart, add it in
      // Below is returning the previous cart array but with the updated new quantity and price to the current product
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
        // If the product is in the cart, remove the previous instance of it (using filter) and then add a new instance with updated quantity and total price
        prevCart = prevCart.filter(
          (item) => item.id !== productToAdd.id
        ); /* I was having an issue where I would have the proper quantity on an item
          where the new quantity was being added on top of the old quantity in the cart
          but it would duplicate the item. So I would have a coke with a price of 1$ then
          another coke with quantity of 3 and the price of 3$ for example. So I thought maybe filtering to 
          constantly delete the old versions of items in the cart would work (and it does)
          but I know it might be overkill and there may be an easier way to do it without
          constantly filtering out the same item, but I couldnt seem to figure it out*/

        // Below is returning the previous cart array but with the updated new quantity and price to the current product
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
  // Function to remove item from cart
  const handleRemoveFromCart = (cartItem) => {
    const filteredCart = cart.filter((item) => item.id !== cartItem.id); //Filter out selected item
    setCart(filteredCart);
  };

  //Function to increase the quantity of an item by 1
  const handleAddQuantity = (productId, mode) => {
    if (mode == "shop") {
      const newProductQuantity = productQuantity.map((prod) => {
        // If item is in shop, update accordingly
        if (prod.id === productId) {
          return { ...prod, quantity: prod.quantity + 1 }; // Return old product but update quantity by 1
        }
        return prod;
      });
      setQuantity(newProductQuantity); // Update the state with new product
      return;
    } else if (mode == "cart") {
      const newCartQuantity = cart.map((prod) => {
        // If item is in cart, update accordingly
        if (prod.id === productId) {
          return { ...prod, quantity: prod.quantity + 1 }; // Return old product (prod) but update quantity by 1
        }
        return prod;
      });
      setCart(newCartQuantity); // Update the state with new cart
      return;
    }
  };

  //Function to decrease quantity of an item by 1
  const handleRemoveQuantity = (productId, mode) => {
    if (mode == "shop") {
      //If item is in shop, update accordingly
      const newProductQuantity = productQuantity.map((prod) => {
        if (prod.id === productId && prod.quantity > 0) {
          return { ...prod, quantity: prod.quantity - 1 }; // Return previous product with quantity 1 less ONLY if the quantity is above 0
        }
        return prod;
      });
      setQuantity(newProductQuantity); //Update state with new product quantity
      return;
    } else if (mode == "cart") {
      //If item is in cart, update accordingly
      const newCartQuantity = cart.map((prod) => {
        if (prod.id === productId && prod.quantity > 1) {
          return { ...prod, quantity: prod.quantity - 1 }; // Return previous product with quantity 1 less ONLY if the quantity is above 1
        }
        return prod;
      });
      setCart(newCartQuantity); //Update state with new cart quantity
      return;
    }
  };

  const handleClearCart = () => {
    {
      /*Clearing cart by setting it to its initial state of being an empty array */
    }
    setCart([]);
  };

  {
    /*Passing the proper states and functions as props below*/
  }
  return (
    <div>
      <NavBar quantity={cart.length} />
      <div className="GroceriesApp-Container">
        <ProductsContainer
          products={products}
          productQuantity={productQuantity}
          handleAddQuantity={handleAddQuantity}
          handleRemoveQuantity={handleRemoveQuantity}
          handleAddToCart={handleAddToCart}
        />
        <CartContainer
          cart={cart}
          handleRemoveFromCart={handleRemoveFromCart}
          handleAddQuantity={handleAddQuantity}
          handleRemoveQuantity={handleRemoveQuantity}
          handleClearCart={handleClearCart}
        />
      </div>
    </div>
  );
}
