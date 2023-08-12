import React, { createContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Product from '../components/Product';
import BASE_URL from '../api_url'

export const ProductContext = createContext();
const CategoryProducts = ({ children }) => {
    const { name } = useParams()
    const [products, setProducts] = useState([])
    useEffect(() => {
      const fetchProducts = async () => {
        const response = await fetch(`${BASE_URL}products/category/${name}`)
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
  
    if (products?.length === 0) return <div>Loading.....</div>
  
    return (
      <>
      
      {/* </div> */}
      <div className='py-10'></div>
      <section className="py-20 ">
        <div className="container mx-auto">
          <h2 className="text-3xl font-semibold mb-10 text-center">{name}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 lg:mx-8 gap-[30px] max-w-sm mx-auto md:max-w-none md:mx-0">
            {products.map((product) => {
              return (
                <Product product={product} key={product.id}/>
              );
            })}
          </div>
        </div>
      </section>
      </>  
    )
  }
  
export default CategoryProducts;
