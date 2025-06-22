import React, { useEffect, useState } from 'react';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [carModels, setCarModels] = useState([]);

  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedModel, setSelectedModel] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://bydbackend.vercel.app/api/products')
      .then(res => res.json())
      .then(data => {
        const items = Array.isArray(data.docs) ? data.docs : data;
        setProducts(items);
        setAllProducts(items);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    fetch('https://bydbackend.vercel.app/api/categories')
      .then(res => res.json())
      .then(data => {
        setCategories(Array.isArray(data.docs) ? data.docs : data);
      });
  }, []);

  useEffect(() => {
    fetch('https://bydbackend.vercel.app/api/carmodel')
      .then(res => res.json())
      .then(data => {
        setCarModels(Array.isArray(data.docs) ? data.docs : data);
      });
  }, []);

  useEffect(() => {
    let filtered = [...allProducts];

    if (selectedCategory) {
      filtered = filtered.filter(product =>
        product.category?.some(cat => cat.id === selectedCategory)
      );
    }

    if (selectedModel) {
      filtered = filtered.filter(product =>
        product['Car Model']?.some(model => model.id === selectedModel)
      );
    }

    setProducts(filtered);
  }, [selectedCategory, selectedModel, allProducts]);

  if (loading) return <div className="text-center mt-20">Загрузка...</div>;

  return (
    <div className="p-4 max-w-7xl mx-auto">
      <div className="flex flex-wrap gap-4 items-center mb-6">
        <div>
          <label className="text-gray-700 font-medium mr-2">Категория:</label>
          <select
            value={selectedCategory}
            onChange={e => setSelectedCategory(e.target.value)}
            className="border p-2 rounded">
            <option value="">Все</option>
            {categories.map(cat => (
              <option key={cat.id} value={cat.id}>{cat.name}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="text-gray-700 font-medium mr-2">Модель:</label>
          <select value={selectedModel}
            onChange={e => setSelectedModel(e.target.value)}
            className="border p-2 rounded">
            <option value="">Все</option>
            {carModels.map(model => (
              <option key={model.id} value={model.id}>{model.name}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {products.length > 0 ? (
          products.map(product => (
            <div key={product.id} className="border rounded-xl shadow-md p-4 bg-white">
              <img
                src={product.image?.url}
                alt={product.title}
                className="w-full h-40 object-cover rounded mb-3"
              />
              <h3 className="text-lg font-bold">{product.title}</h3>
              <p className="text-gray-600">Price $: {product.price.toLocaleString()}</p>
              {/* <p className="text-sm text-gray-500">Категория: {product.category?.map(c => c.name).join(', ')}</p> */}
              {/* <p className="text-sm text-gray-500">Модель: {product['Car Model']?.map(m => m.name).join(', ')}</p> */}
            </div>
          ))
        ) : (
          <div className="col-span-full text-center text-gray-500">Нет товаров по выбранным фильтрам</div>
        )}
      </div>
    </div>
  );
};

export default Products;
