//The NavBar is responsible for displaying the title, username, and cart image at the top of the screen
export default function NavBar({ quantity }) {
  // cart quantity being passed in for a ternerie later
  return (
    <div className="NavBar">
      <p className="NavUser">Hello user</p>
      <h1 className="NavTitle">Groceries App</h1>
      <img
        src={
          quantity > 0
            ? "./src/assets/cart-full.png"
            : "./src/assets/cart-empty.png"
        }
        alt=""
      />
      {/*If the cart length is above 0, show full cart, otherwise, show empty cart*/}
    </div>
  );
}
