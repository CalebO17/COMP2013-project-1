//CartContainer is responsible for looping through the cart array and displaying every object in it

import CartCard from "./CartCard";
{
  /* Importing CartCard so it can be used when the container maps each cart card */
}

export default function CartContainer({
  //Cart functions and the cart state are being brought in to be used
  cart,
  handleRemoveFromCart,
  handleAddQuantity,
  handleRemoveQuantity,
  handleClearCart,
}) {
  return (
    <div className="CartContainer">
      <div>
        <h1>Cart</h1>
        <p>{cart.length === 0 && "Cart is empty"}</p>
        {/*Using a short circuit to display "Cart is empty" if there is nothing in the cart*/}
        <p>Number of items {cart.length}</p>
      </div>
      <div>
        {/*Mapping out each CartCard*/}
        {cart.map((item) => (
          <CartCard
            key={item.id}
            {...item}
            handleRemoveFromCart={handleRemoveFromCart}
            handleAddQuantity={handleAddQuantity}
            handleRemoveQuantity={handleRemoveQuantity}
          />
        ))}
      </div>
      {/*Adding a button to clear the entire cart by setting its state to an empty array (its initial state), aswell as a non function purchase button*/}
      <div className="CartListBtns">
        <button className="RemoveButton" onClick={() => handleClearCart()}>
          Empty Cart
        </button>
        <button id="BuyButton">
          Checkout$
          {cart.reduce(
            (total, item) => (total + item.price * item.quantity).toFixed(2),
            0
          )}
          {/*calculating the entire value of the cart*/}
        </button>
      </div>
    </div>
  );
}
