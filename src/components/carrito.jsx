// Carrito.js
import React from 'react';
import estilos from '../app/page.module.css';

class Carrito extends React.Component {
  render() {
    const { carrito, eliminarDelCarrito } = this.props;

    return (
      <div className={estilos.divCar}>
        <h2 className={estilos.title}>Carrito de Compras</h2>
        <ul className={estilos.parent}>
          {carrito.map((producto) => (
            <li key={producto.carritoId} className={estilos.card}>
              <h4>{producto.nombre} - ${producto.precio}</h4>
              <br/>
              <img src={producto.imgUrl} alt="" className={estilos.img} />
              <button onClick={() => eliminarDelCarrito(producto.carritoId)} className={estilos.btnEliminar}>Eliminar</button>
            </li>
          ))}
        </ul>


      </div>
    );
  }
}

export default Carrito;
