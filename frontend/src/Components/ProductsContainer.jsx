//ProductsContainer is responsible for looping through the products array and displaying the information onto ProductCards
import ProductCard from "./ProductCard";
export default function ProductsContainer({
  //Bringing in product related functions aswell as product states to be used
  products,
  productQuantity,
  handleAddQuantity,
  handleRemoveQuantity,
  handleAddToCart,
}) {
  console.log(products);
  return (
    <div className="ProductsContainer">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          {...product}
          productQuantity={productQuantity.find(
            (prod) => prod.id == product.id
          )}
          handleAddQuantity={handleAddQuantity}
          handleRemoveQuantity={handleRemoveQuantity}
          handleAddToCart={handleAddToCart}
        />
      ))}
    </div>
  );
}
