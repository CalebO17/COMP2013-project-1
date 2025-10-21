//App.Jsx has one single purpose and that is to render the GroceriesAppContainer that contains all the logic of the program
import "./App.css";
import GroceriesAppContainer from "./Components/GroceriesAppContainer";
import products from "./data/products";

function App() {
  return (
    <>
      <GroceriesAppContainer products={products} />{" "}
      {/*Rendering the GroceriesAppContainer and using products.js*/}
    </>
  );
}

export default App;
