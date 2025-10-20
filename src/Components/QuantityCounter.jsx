export default function QuantityCounter({
  handleAddQuantity,
  handleRemoveQuantity,
  productQuantity,
  id,
  mode,
}) {
  console.log(productQuantity);

  return (
    <div className="ProductQuantityDiv">
      <div>
        <button
          className="QuantityBtn"
          onClick={() => handleRemoveQuantity(id, mode)}
        >
          -
        </button>
        {/*id = which product we are using and mode is cart or not*/}
      </div>
      <p>{productQuantity}</p>
      <div>
        <button
          className="QuantityBtn"
          onClick={() => handleAddQuantity(id, mode)}
        >
          +
        </button>
      </div>
    </div>
  );
}
