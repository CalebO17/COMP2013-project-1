import QuantityCounter from "./QuantityCounter";
export default function CartCard({
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
  return (
    <div className="CartCard">
      <h1>{productName}</h1>
      <img src={image} alt="" height="100px" />
      <h2>{brand}</h2>
      <QuantityCounter
        id={id}
        productQuantity={quantity}
        handleAddQuantity={handleAddQuantity}
        handleRemoveQuantity={handleRemoveQuantity}
        mode="cart"
      />
      <h2>${(quantity * price).toFixed(2)}</h2>
      <button
        onClick={() => {
          handleRemoveFromCart({ id, productName, quantity, price });
        }}
      >
        Remove from cart
      </button>
    </div>
  );
}
