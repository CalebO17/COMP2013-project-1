import { useState, useEffect } from "react";
import ProductsContainer from "./ProductsContainer";
import CartContainer from "./CartContainer";
import NavBar from "./NavBar";
import axios from "axios";
import ProductForm from "./ProductForm";

export default function GroceriesAppContainer(
  {
    /*products*/
  }
) {
  //Products state that is essentially acting as the replacement for the products.js file
  //It will be filled up with the products from the mongoDB database
  const [products, setProducts] = useState([]);

  //State representing the form data
  const [formData, setFormData] = useState({
    productName: "",
    brand: "",
    image: "",
    price: "",
  });

  //State representing the post response that will ensure
  //that rerendering happens as the post response will change
  //everytime something on the website changes
  const [postResponse, setPostResponse] = useState("");

  //State that represents a bool over whether or not
  //editing is happening so that the form and submit
  //button can be used for posting as well as patching
  const [isEditing, setIsEditing] = useState(false);

  //Creating a state for an array of objects representing each product
  const [productQuantity, setQuantity] = useState([]);
  // new state for cart which starts as an empty array
  const [cart, setCart] = useState([]);

  //Use effect that runs the handleProductsDB function everytime the post response state updates
  useEffect(() => {
    handleProductsDB();
  }, [postResponse]);

  //Handler to put data from database into products state array, then set quantity state using the grabbed axios data aswell
  const handleProductsDB = async () => {
    try {
      const response = await axios.get("http://localhost:3000/products");
      console.log(response.data);
      setProducts(response.data); // Update products state to data grabbed from intermediary API
      setQuantity(
        // Set quantity according to data grabbed from intermediary API
        response.data.map((prod) => {
          return {
            _id: prod._id,
            quantity: 0,
            price: prod.price.replace("$", ""),
          };
        })
      );
    } catch (error) {
      console.log(error);
    }
  };

  //Handle to reset form to empty values
  const handleResetForm = () => {
    setFormData({
      productName: "",
      brand: "",
      image: "",
      price: "",
    });
  };

  //Handling data submission
  const handleOnSubmit = async (e) => {
    e.preventDefault(); // Preventing page from refreshing when submission happens
    try {
      if (isEditing) {
        //If in editing mode, call handleOnUpdate function, reset form, and turn off editing mode
        handleOnUpdate(formData.id);
        handleResetForm(); //Set form to default values (empty strings)
        setIsEditing(false); // No longer in editing mode
      } else {
        await axios
          .post("http://localhost:3000/products", formData) // If not in editing mode, post instead of patch (adding new data)
          .then((response) => {
            setPostResponse(response.data); //Update post response so it knows to rerender without having to refresh the page
            console.log(response);
          })
          .then(() => handleResetForm()); //Set form to default values
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  //Handle onChange event of form
  const handleOnChange = (e) => {
    setFormData((prevData) => {
      return { ...prevData, [e.target.name]: e.target.value };
    });
  };

  //Handler to delete a product by its _id
  const handleOnDelete = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:3000/products/${id}` //using DELETE route of CRUD
      );
      setPostResponse(response.data); //Setting post response so it knows to rerender without having to refresh
    } catch (error) {
      console.log(error.message);
    }
  };

  //Handler to edit a product by its id
  const handleOnEdit = async (id) => {
    try {
      const productToEdit = await axios.get(
        `http://localhost:3000/products/${id}` //Getting the product to be edited
      );
      setFormData({
        productName: productToEdit.data.productName, //Putting product info into form so the form can be used to edit the product info
        brand: productToEdit.data.brand,
        image: productToEdit.data.image,
        price: productToEdit.data.price,
        id: productToEdit.data._id,
      });
      setIsEditing(true); // Turn on editing mode
    } catch (error) {
      console.log(error);
    }
  };

  //Handle updating the API patch route
  const handleOnUpdate = async (id) => {
    try {
      const result = await axios.patch(
        //Using patch AKA the update part of CRUD
        `http://localhost:3000/products/${id}`,
        formData
      );
      setPostResponse({ message: result.data.message, date: result.data.date }); //Setting post response so it rerenders due to the
      //useEffect, and adding the date so that its different
      // everytime something is updated. Otherwise you would only
      // be able to update something once
    } catch (error) {
      console.log(error);
    }
  };

  //Function to handle adding to cart
  const handleAddToCart = (productToAdd) => {
    const currentProduct = products.find(
      (prod) => prod._id === productToAdd._id
    ); // Finding product in the products array
    const productInCart = cart.find((item) => item._id === productToAdd._id); // Checking if product is in cart by looking through the cart array
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
          (item) => item._id !== productToAdd._id
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
    const filteredCart = cart.filter((item) => item._id !== cartItem._id); //Filter out selected item
    setCart(filteredCart);
  };

  //Function to increase the quantity of an item by 1
  const handleAddQuantity = (productId, mode) => {
    if (mode == "shop") {
      const newProductQuantity = productQuantity.map((prod) => {
        // If item is in shop, update accordingly
        if (prod._id === productId) {
          return { ...prod, quantity: prod.quantity + 1 }; // Return old product but update quantity by 1
        }
        return prod;
      });
      setQuantity(newProductQuantity); // Update the state with new product
      return;
    } else if (mode == "cart") {
      const newCartQuantity = cart.map((prod) => {
        // If item is in cart, update accordingly
        if (prod._id === productId) {
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
        if (prod._id === productId && prod.quantity > 0) {
          return { ...prod, quantity: prod.quantity - 1 }; // Return previous product with quantity 1 less ONLY if the quantity is above 0
        }
        return prod;
      });
      setQuantity(newProductQuantity); //Update state with new product quantity
      return;
    } else if (mode == "cart") {
      //If item is in cart, update accordingly
      const newCartQuantity = cart.map((prod) => {
        if (prod._id === productId && prod.quantity > 1) {
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
      <p style={{ color: "green" }}>{postResponse?.message}</p>
      <div className="GroceriesApp-Container">
        <ProductForm
          productName={formData.productName}
          brand={formData.brand}
          image={formData.image}
          price={formData.price}
          handleOnChange={handleOnChange}
          handleOnSubmit={handleOnSubmit}
          isEditing={isEditing}
        />
        <ProductsContainer
          products={products}
          productQuantity={productQuantity}
          handleAddQuantity={handleAddQuantity}
          handleRemoveQuantity={handleRemoveQuantity}
          handleAddToCart={handleAddToCart}
          handleOnDelete={handleOnDelete}
          handleOnEdit={handleOnEdit}
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
