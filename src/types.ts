export interface Producto {
  id: number;
  nombre: string;
  descripcion: string;
  precio: string;
  cantidad: string;
  imagen: string;
}

export interface FormProps {
  onAddProduct: (newProduct: Omit<Producto, 'id'>) => void;
}

export interface CardProps {
  productos: Producto[];
  onUpdate: (id: number) => void;
  onDelete: (id: number) => void;
}

export interface UpdateFormProps {
  productoToEdit: Producto;
  onUpdateProduct: (updatedProduct: Producto) => void;
  onCancelEdit: () => void;
}