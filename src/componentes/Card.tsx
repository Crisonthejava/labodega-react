import React from 'react';
import type { CardProps } from '../types';

const Card: React.FC<CardProps> = ({ productos, onUpdate, onDelete }) => {
  return (
    <div className="row g-4 mt-4">
      {productos.map((producto) => (
        <div key={producto.id} className="col-lg-4 col-md-6">
          <div className="card h-100">
            {producto.imagen && (
              <img src={producto.imagen} className="card-img-top" 
              alt={producto.nombre} 
              onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => { e.currentTarget.src = 'https://placehold.co/150'; }} />
            )}
            <div className="card-body">
              <h5 className="card-title">{producto.nombre}</h5>
              <p className="card-text">{producto.descripcion}</p>
              <p className="card-text">S/ {parseFloat(producto.precio).toFixed(2)}</p>
              <p className="card-text">Stock: {producto.cantidad}</p>
            </div>
            <div className="card-footer d-flex justify-content-between">
              <button onClick={() => onUpdate(producto.id)} className="btn btn-success btn-sm">Actualizar</button>
              <button onClick={() => onDelete(producto.id)} className="btn btn-danger btn-sm">Eliminar</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Card;