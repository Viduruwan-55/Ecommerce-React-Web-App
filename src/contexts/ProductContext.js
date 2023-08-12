import React, { createContext, useState, useEffect } from "react";
import BASE_URL from "../api_url";

export const ProductContext = createContext();

const ProductProvider = ({ children }) => {
  // products state
  const [products, setProducts] = useState([]);
  const {currentPage} = useState(1);
  const productsPerPage = 6; // Number of products to display per page

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  // fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch(`${BASE_URL}products`);
      const data0 = await response.json();
      const data = data0.products;

      data.forEach(element => {
        // element.images = element.images[0];
        element["image"] = element.images[0];
      });
      console.log(data);
      setProducts(data);
    };
    fetchProducts();
  }, []);
 

  return (
    <>
    <ProductContext.Provider value={{ currentProducts,products }}>
      {children}
    </ProductContext.Provider>
   
  </>
  );
};

export default ProductProvider;
