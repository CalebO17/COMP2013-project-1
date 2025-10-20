import QuantityCounter from "./QuantityCounter";

export default function ProductCard({
  id,
  productQuantity,
  productName,
  image,
  price,
  brand,
  handleAddQuantity,
  handleRemoveQuantity,
  handleAddToCart,
}) {
  console.log(price);
  return (
    <div className="ProductCard">
      <h1>{productName}</h1>
      <img src={image} alt="" height="100px" />
      <h2>{brand}</h2>
      <QuantityCounter
        id={productQuantity.id}
        productQuantity={productQuantity.quantity}
        handleAddQuantity={handleAddQuantity}
        handleRemoveQuantity={handleRemoveQuantity}
        mode="shop"
      />
      <h1>${productQuantity.price}</h1>
      <button onClick={() => handleAddToCart(productQuantity)}>
        Add to cart
      </button>
    </div>
  );
}
