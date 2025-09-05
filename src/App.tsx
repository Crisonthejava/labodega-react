import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import type { Producto } from './types.ts';
import UpdateForm from './componentes/UpdateForm.tsx';
import Form from './componentes/Form.tsx';
import Card from './componentes/Card.tsx';
import './App.css';
import Login from './componentes/Login.tsx';
import logo from './assets/images/logo-bodega.png';

const Home = () => {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [editingProduct, setEditingProduct] = useState<Producto | null>(null);
  const navigate = useNavigate();
  
  const loggedInUserName = localStorage.getItem('userName');

  const handleAddProduct = (newProduct: Omit<Producto, 'id'>) => {
    const productWithId = { ...newProduct, id: Date.now() };
    setProductos([...productos, productWithId]);
  };

  const handleDeleteProduct = (id: number) => {
    const updatedProductos = productos.filter(producto => producto.id !== id);
    setProductos(updatedProductos);
  };

  const handleUpdateClick = (id: number) => {
    const productToEdit = productos.find(producto => producto.id === id);
    if (productToEdit) {
      setEditingProduct(productToEdit);
    }
  };

  const handleUpdateProduct = (updatedProduct: Producto) => {
    const updatedProductos = productos.map(producto =>
      producto.id === updatedProduct.id ? updatedProduct : producto
    );
    setProductos(updatedProductos);
    setEditingProduct(null);
  };

  const handleCancelEdit = () => {
    setEditingProduct(null);
  };

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userName'); 
    navigate('/login');
  };

  return (
    <div className="container mt-4">
      <div className="bg-header p-3 mb-4 text-black rounded d-flex align-items-center justify-content-between">
        <div className="d-flex align-items-center">
          <img src={logo} alt="Logo de Bodega" className="logo-img me-3" />
          <div>
            <h1 className="mb-0">Gestión de Productos</h1>
            {loggedInUserName && <p className="mb-0">Bienvenido, {loggedInUserName}!</p>}
          </div>
        </div>
        <button onClick={handleLogout} className="btn btn-danger">Cerrar Sesión</button>
      </div>

      {editingProduct ? (
        <UpdateForm
          productoToEdit={editingProduct}
          onUpdateProduct={handleUpdateProduct}
          onCancelEdit={handleCancelEdit}
        />
      ) : (
        <Form onAddProduct={handleAddProduct} />
      )}

      <Card
        productos={productos}
        onUpdate={handleUpdateClick}
        onDelete={handleDeleteProduct}
      />
    </div>
  );
};

type ProtectedRouteProps = {
  children: React.ReactNode;
};

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        } />
      </Routes>
    </Router>
  );
}

export default App;