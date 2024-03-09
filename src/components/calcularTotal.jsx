import React from 'react';
import estilos from '../app/page.module.css';

class CalcularTotal extends React.Component {

  calcularTotal = (carrito) => {
    return carrito.reduce((total, producto) => total + (producto.precio || 0), 0);
  };


  render() {
    return (
      <div className={estilos.total}>
        <h2 className={estilos.title}>Total del Carrito</h2>
        <h2> Total: ${this.calcularTotal(this.props.carrito)}</h2>
        

      </div>
    );
  }
}

export default CalcularTotal;
