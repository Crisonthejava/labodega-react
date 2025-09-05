import React, { useState } from 'react';
import type { FormProps } from '../types';

const Form: React.FC<FormProps> = ({ onAddProduct }) => {
  const [product, setProduct] = useState({
    nombre: '',
    descripcion: '',
    precio: '',
    cantidad: '',
    imagen: ''  
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddProduct(product);
    setProduct({
      nombre: '',
      descripcion: '',
      precio: '',
      cantidad: '',
      imagen: ''
    });
  };

  return (
    <div className="card my-4">
      <div className="card-header bg-light">
        <h5 className="mb-0">Productos</h5>
      </div>
      <div className="card-body">
        <form onSubmit={handleSubmit}>
          <div className="mb-3 text-start" >
            <label htmlFor="nombreProducto" className="form-label">Producto</label>
            <input type="text" className="form-control" id="nombreProducto" 
            name="nombre" value={product.nombre} onChange={handleChange} required />
          </div>
          <div className="mb-3 text-start">
            <label htmlFor="descripcionProducto" className="form-label">Info</label>
            <textarea className="form-control" id="descripcionProducto" 
            name="descripcion" value={product.descripcion} onChange={handleChange} required></textarea>
          </div>
          <div className="mb-3 text-start">
            <label htmlFor="precioProducto" className="form-label">Precio</label>
            <input type="number" className="form-control" id="precioProducto" 
            name="precio" value={product.precio} onChange={handleChange} required />
          </div>
          <div className="mb-3 text-start">
            <label htmlFor="cantidadProducto" className="form-label">Cantidad</label>
            <input type="number" className="form-control" id="cantidadProducto" 
            name="cantidad" value={product.cantidad} onChange={handleChange} required />
          </div>
          <div className="mb-3 text-start">
            <label htmlFor="imagenProducto" className="form-label">URL de Imagen</label>
            <input type="text" className="form-control" id="imagenProducto" 
            name="imagen" value={product.imagen} onChange={handleChange} required />
          </div>
          <button type="submit" className="btn btn-primary">Generar nuevo producto</button>
        </form>
      </div>
    </div>
  );
};

export default Form;