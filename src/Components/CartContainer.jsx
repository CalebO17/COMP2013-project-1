import CartCard from "./CartCard";

export default function CartContainer({
  cart,
  handleRemoveFromCart,
  handleAddQuantity,
  handleRemoveQuantity,
}) {
  return (
    <div>
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
  );
}
