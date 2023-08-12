import React, { useContext, useState, useEffect } from "react";
import { ProductContext } from "../contexts/ProductContext";
import { useLocation } from "react-router-dom";
import Product from "../components/Product";
import Hero from "../components/Hero";
import Pagination from "../components/Pagination";
import BASE_URL from "../api_url";

const SearchResults = () => {
  const location = useLocation();
  const { searchResults, searchTerm } = location.state;

  // Display search term in the page title
  document.title = `Search Results for: ${searchTerm}`;

  const { products } = useContext(ProductContext);
  const productsPerPage = 6; // Number of products to display per page
  const [currentPage, setCurrentPage] = useState(1);
  const [currentProducts, setCurrentProducts] = useState([]);
  const [totalProducts, setTotalProducts] = useState(0);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch(
        `${BASE_URL}products?limit=${productsPerPage}&skip=${
          (currentPage - 1) * productsPerPage
        }`
      );
      const data = await response.json();
      setCurrentProducts(data.products);
      setTotalProducts(data.total);
    };
    fetchProducts();
  }, [currentPage]);

  const totalPages = Math.ceil(totalProducts / productsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  if (!Array.isArray(searchResults)) {
    console.error("Search results are not in expected format:", searchResults);
    return <div>Error loading search results.</div>;
  }

  return (
    <div>
      <Hero/>
      <section className="py-20">
    <div className="container mx-auto">
          <h1 className="sm:text-3xl text-2xl font-semibold title-font text-gray-900 text-center mb-5">
            Explore Search Product
          </h1>
          <h2 className="text-lg text-center  text-indigo-600 tracking-widest font-medium font-semibold title-font mb-5">
            {searchTerm}
          </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mt-10">
      {searchResults.map((result) => {
            const matchedProduct = products.find((product) => product.id === result.id);
            if (matchedProduct) {
                return (
                  <Product product={matchedProduct} key={matchedProduct.id} />
                );  
            }
            return null; // Handle the case if the product is not found
          })}
      </div>
    </div>
    {/* Pagination */}
    <div className="py-10"></div>
    <div className="container mx-auto ">
          <h1 className="sm:text-3xl text-2xl font-semibold title-font text-gray-900 text-center mb-5">
            Explore Our Product
          </h1>
          <h2 className="text-lg text-center  text-indigo-600 tracking-widest font-medium font-semibold title-font mb-5">
            Product
          </h2>
          </div>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 lg:mx-8 gap-[30px] max-w-sm mx-auto md:max-w-none md:mx-0">
          {currentProducts.map((product) => {
            const matchedProduct = products.find((p) => p.id === product.id);
            if (matchedProduct) {
              return <Product product={matchedProduct} key={matchedProduct.id} />;
            }
            return null;
          })}
        </div>
        {/* Use the Pagination component */}
        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />

    </section>
    </div>
  );
};

export default SearchResults;
