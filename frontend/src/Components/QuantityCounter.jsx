//Quantity Counter is responsible for handling a quantity counter that can be increased or decreased certain amounts depending on the mode
export default function QuantityCounter({
  //Bringing in various quantity related functions, aswell as the productQuantity
  // state and id/mode to differentiate which product is being used and whether its in a cart or the shop
  handleAddQuantity,
  handleRemoveQuantity,
  productQuantity,
  _id,
  mode,
}) {
  console.log(productQuantity);

  return (
    <div className="ProductQuantityDiv">
      <div>
        <button
          className="QuantityBtn"
          onClick={() => handleRemoveQuantity(_id, mode)}
        >
          -
          {/*Bringing in handleRemoveQuantity function designed to decrease quantity by 1*/}
        </button>
        {/*id = which product we are using, mode = cart or shop*/}
      </div>
      <p>{productQuantity}</p>
      <div>
        <button
          className="QuantityBtn"
          onClick={() => handleAddQuantity(_id, mode)}
        >
          {/*Bringing in handleAddQuantity function designed to increase quantity by 1*/}
          +
        </button>
      </div>
    </div>
  );
}
