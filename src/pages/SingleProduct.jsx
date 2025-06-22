import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

const SingleProduct = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetch(`https://bydbackend.vercel.app/api/products/${id}`)
      .then(res => res.json())
      .then(data => {
        setProduct(data?.doc || data); 
      });
  }, [id]);

  if (!product) return <div className="text-center mt-20 text-gray-500">Загрузка...</div>;

  return (
    <div className="max-w-4xl mx-auto p-4">
      <Link to="/" className="text-blue-600 mb-4 inline-block">Назад</Link>
      <img
        src={product.image?.url}
        alt={product.image?.alt || product.title}
        className="w-full h-80 object-cover rounded-lg mb-6"
      />
      <h1 className="text-2xl font-bold mb-2">{product.title}</h1>
      <p className="text-black text-lg mb-2">Price: ${product.price.toLocaleString()}</p>
      <p className="text-black mb-1 text-lg">Product Code: {product['vin-number']}</p>
      <p className="text-black mb-1 text-lg">Category: {product.category?.map(c => c.name).join(', ') || 'N/A'}</p>
      <p className="text-black mb-1 text-lg">Auto Model: {product['Car Model']?.map(m => m.name).join(', ') || 'N/A'}</p>
      <p className="text-black mt-4">Description: {product.description}</p>
    </div>
  );
};

export default SingleProduct;
