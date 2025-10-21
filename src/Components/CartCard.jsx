/* CartCard.jsx is response for rendering each individual product added inside the cart */
import QuantityCounter from "./QuantityCounter"; // Importing QuantityCounter.jsx because it is part of the cartCard and will be used
export default function CartCard({
  //Various variables and functions being brought in for usage
  id,
  productName,
  quantity,
  price,
  brand,
  image,
  handleRemoveFromCart,
  handleAddQuantity,
  handleRemoveQuantity,
}) {
  /*Rendering an individual cart using values that will be brought in when the CartCard is called*/
  return (
    <div className="CartCard">
      <div className="CartCardInfo">
        <img src={image} alt="" height="100px" />
        <p>{productName}</p>
        <p>{price}</p>
        <QuantityCounter
          id={id}
          productQuantity={quantity}
          handleAddQuantity={handleAddQuantity}
          handleRemoveQuantity={handleRemoveQuantity}
          mode="cart"
        />
      </div>
      {/* Using two seperate divs to coordinate the button and total being seperate from the other information*/}
      <div className="CartCardInfo">
        <h2>${(quantity * price).toFixed(2)}</h2>{" "}
        {/*Ensuring that the total price is only two decimals*/}
        <button
          className="RemoveButton"
          onClick={() => {
            handleRemoveFromCart({ id, productName, quantity, price });
            {
              /*Bringing in a function that will handle the logic of removing an item from the cart */
            }
          }}
        >
          Remove from cart
        </button>
      </div>
    </div>
  );
}
