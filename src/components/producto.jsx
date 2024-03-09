import React from 'react';
import estilos from '../app/page.module.css';

const Producto = ({ producto, agregarAlCarrito }) => {
  const { id, nombre, precio, imgUrl, stock } = producto;
    
  return (
    <div className={estilos.divProducto}>

      <h3 >{nombre}</h3>


      <img src={imgUrl} alt="" className={estilos.img}/> <br></br>
      <p>Precio: ${precio}</p>
      <p>Stock: {stock}</p>
      <button onClick={() => agregarAlCarrito(producto)} className={estilos.btnAñadir}>Agregar al carrito</button>

    </div>
  );
};


export default Producto;
