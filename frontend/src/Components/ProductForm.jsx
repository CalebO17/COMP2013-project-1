export default function ProductForm({
  productName,
  brand,
  image,
  price,
  handleOnSubmit,
  handleOnChange,
  isEditing,
}) {
  return (
    <div>
      <h2>Product Form</h2>
      <form onSubmit={handleOnSubmit}>
        <label htmlFor="productName"></label>
        <input
          type="text"
          name="productName"
          id="productName"
          value={productName}
          onChange={handleOnChange}
          placeholder="Product Name"
          required
        />
        <br />
        <label htmlFor="brand"></label>
        <input
          type="text"
          name="brand"
          id="brand"
          value={brand}
          onChange={handleOnChange}
          placeholder="Brand"
          required
        />
        <br />
        <label htmlFor="image"></label>
        <input
          type="text"
          name="image"
          id="image"
          value={image}
          onChange={handleOnChange}
          placeholder="Image URL"
          required
        />
        <br />
        <label htmlFor="price"></label>
        <input
          type="text"
          name="price"
          id="price"
          value={price}
          onChange={handleOnChange}
          placeholder="Price"
          required
        />
        <br />
        <button>{isEditing ? "Editing" : "Submit"}</button>
      </form>
    </div>
  );
}
