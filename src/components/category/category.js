import React, { createContex, useEffect, useState } from 'react';
import BASE_URL from '../../api_url';
import Feature from '../feature/feature';

const Categories = () => {
  // products state
  const [categories, setCategory] = useState([]);
  // fetch products
  useEffect(() => {
    const fetchCategory = async () => {
      const response = await fetch(`${BASE_URL}products/categories`);
      const data = await response.json();
     
      console.log(data,'data');
      setCategory(data);
    };
    fetchCategory();
  }, []);
  if (categories.length === 0) return <div>Loading.....</div>
  return (
        <Feature cards={categories}/>
  );
};

export default Categories;
