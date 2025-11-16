//ProductsContainer is responsible for looping through the products array and displaying the information onto ProductCards
import ProductCard from "./ProductCard";
export default function ProductsContainer({
  //Bringing in product related functions aswell as product states to be used
  products,
  productQuantity,
  handleAddQuantity,
  handleRemoveQuantity,
  handleAddToCart,
  handleOnDelete,
  handleOnEdit,
}) {
  console.log("Product Quantity");
  console.log(productQuantity);
  return (
    <div className="ProductsContainer">
      {products.map((product) => (
        <ProductCard
          key={product._id}
          {...product}
          productQuantity={productQuantity.find(
            (prod) => prod._id == product._id
          )}
          handleAddQuantity={handleAddQuantity}
          handleRemoveQuantity={handleRemoveQuantity}
          handleAddToCart={handleAddToCart}
          handleOnDelete={handleOnDelete}
          handleOnEdit={handleOnEdit}
        />
      ))}
    </div>
  );
}
