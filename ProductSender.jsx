import React from "react";
import { useNavigate } from "react-router-dom";

const defaultProduct = {
  sku: "",
  grams: 0.0,
  price: 0,
  title: "",
  weight: 0.0,
};
const productExample = {
  id: 8923987,
  sku: "IPOD2008PINK",
  grams: 0.0,
  price: 199.99,
  title: "Pink",
  weight: 0.2,
};
function ProductSender() {
  const navigate = useNavigate();

  console.log(productExample, defaultProduct);

  const onProdcutClicked = (e) => {
    e.preventDefault();
    navigateToProdPage(productExample);
  };

  const navigateToProdPage = (product) => {
    navigate(`/products/${product.id}`);
  };

  return (
    <React.Fragment>
      <h1>For Sending Products</h1>
      <button
        type="button"
        id="pg "
        onClick={onProdcutClicked}
        class="btn btn-primary"
      >
        Submit
      </button>
    </React.Fragment>
  );
}
export default ProductSender;
