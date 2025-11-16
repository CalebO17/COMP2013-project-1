//The ProductCard is responsible for rendering a single product card

import QuantityCounter from "./QuantityCounter";

export default function ProductCard({
  //Various card information and functions are being brought in for use
  _id,
  productQuantity,
  productName,
  image,
  price,
  brand,
  handleAddQuantity,
  handleRemoveQuantity,
  handleAddToCart,
  handleOnDelete,
  handleOnEdit,
}) {
  console.log(productQuantity); // This was just me testing the price variable when I was in the midst of figuring out if I succesfully got rid of the dollar sign
  return (
    <div className="ProductCard">
      <h3>{productName}</h3>
      <img src={image} alt="" height="100px" />
      <p>{brand}</p>
      <QuantityCounter
        _id={productQuantity._id}
        productQuantity={productQuantity.quantity}
        handleAddQuantity={handleAddQuantity}
        handleRemoveQuantity={handleRemoveQuantity}
        mode="shop"
      />
      <h1>${productQuantity.price}</h1>{" "}
      {/*Displaying the price and adding the $ beforehand so nobody can tell I actually removed it from the variable*/}
      <button onClick={() => handleAddToCart(productQuantity)}>
        {" "}
        {/*Using the add to cart function that I brought in*/}
        Add to cart
      </button>
      <button onClick={() => handleOnDelete(_id)}>Delete</button>
      <button onClick={() => handleOnEdit(_id)}>Edit</button>
    </div>
  );
}
