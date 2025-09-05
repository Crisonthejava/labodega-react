import React, { useState, useEffect } from 'react';
import type { UpdateFormProps } from '../types';

const UpdateForm: React.FC<UpdateFormProps> = ({ productoToEdit, onUpdateProduct, onCancelEdit }) => {
  const [updatedProduct, setUpdatedProduct] = useState(productoToEdit);

  useEffect(() => {
    setUpdatedProduct(productoToEdit);
  }, [productoToEdit]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setUpdatedProduct({ ...updatedProduct, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateProduct(updatedProduct);
  };

  return (
    <div className="card my-4 bg-light">
      <div className="card-header bg-warning text-white">
        <h5 className="mb-0">Actualizar Producto</h5>
      </div>
      <div className="card-body">
        <form onSubmit={handleSubmit}>
          <div className="mb-3 text-start">
            <label htmlFor="nombreProducto" className="form-label">Nombre Producto</label>
            <input type="text" className="form-control" id="nombreProducto" name="nombre" value={updatedProduct.nombre} onChange={handleChange} />
          </div>
          <div className="mb-3 text-start">
            <label htmlFor="descripcionProducto" className="form-label">Descripción</label>
            <textarea className="form-control" id="descripcionProducto" name="descripcion" value={updatedProduct.descripcion} onChange={handleChange}></textarea>
          </div>
          <div className="mb-3 text-start">
            <label htmlFor="precioProducto" className="form-label">Precio</label>
            <input type="number" className="form-control" id="precioProducto" name="precio" value={updatedProduct.precio} onChange={handleChange} />
          </div>
          <div className="mb-3 text-start">
            <label htmlFor="cantidadProducto" className="form-label">Cantidad</label>
            <input type="number" className="form-control" id="cantidadProducto" name="cantidad" value={updatedProduct.cantidad} onChange={handleChange} />
          </div>
          <div className="mb-3 text-start">
            <label htmlFor="imagenProducto" className="form-label">URL de Imagen</label>
            <input type="text" className="form-control" id="imagenProducto" name="imagen" value={updatedProduct.imagen} onChange={handleChange} />
          </div>
          <div className="d-flex justify-content-between">
            <button type="submit" className="btn btn-warning">Guardar Cambios</button>
            <button type="button" onClick={onCancelEdit} className="btn btn-secondary">Cancelar</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateForm;