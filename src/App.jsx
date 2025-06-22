import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Products from './components/Products';
import SingleProduct from './pages/SingleProduct';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Products />} />
        <Route path="/products/:id" element={<SingleProduct />} />
        <Route path="*" element={<div className="text-center mt-20">Страница не найдена</div>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
