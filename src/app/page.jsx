'use client';
import React from 'react';
import ReactPDF from '@react-pdf/renderer';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';
import Producto from '../components/producto.jsx';
import Carrito from '../components/carrito.jsx';
import CalcularTotal from '../components/calcularTotal.jsx';
import estilos from './page.module.css';
import ReactDOM from 'react-dom';
import { PDFViewer } from '@react-pdf/renderer';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      productos: [
        { id: 1, nombre: 'Zapatos', precio: 20, imgUrl: '../img/zapatos.jpg', stock: 5},
        { id: 2, nombre: 'Camisa', precio: 30,  imgUrl: '../img/camisa.png', stock: 5}, 
        { id: 3, nombre: 'Overall',precio: 40, imgUrl: '../img/Overall.jpg', stock: 5},
        { id: 4, nombre: 'Gorra',precio: 50, imgUrl: '../img/gorra.png', stock: 4},
        { id: 5, nombre: 'Bigote',precio: 60, imgUrl: '../img/bigote.jpg', stock: 8},
        { id: 6, nombre: 'Guantes',precio: 60, imgUrl: '../img/guantes.jpg', stock: 3},
      ],
      carrito: [],
      facturas: [],
    };
  }

  agregarAlCarrito = (producto) => {
    const productoConID = { ...producto, carritoId: Date.now() };
    const { stock } = producto;
  
    if (stock > 0) {
      // Reducir el stock y agregar al carrito
      this.setState({
        productos: this.state.productos.map((p) =>
          p.id === producto.id ? { ...p, stock: p.stock - 1 } : p
        ),
        carrito: [...this.state.carrito, productoConID],
      });
    } else {
      alert('No hay suficiente stock disponible.');
    }
  };

  eliminarDelCarrito = (carritoId) => {
    const nuevoCarrito = this.state.carrito.filter(
      (producto) => producto.carritoId !== carritoId
    );
    const productoEliminado = this.state.carrito.find(
      (producto) => producto.carritoId === carritoId
    );
  
    if (productoEliminado) {
      // Incrementar el stock del producto eliminado
      this.setState({
        productos: this.state.productos.map((p) =>
          p.id === productoEliminado.id ? { ...p, stock: p.stock + 1 } : p
        ),
        carrito: nuevoCarrito,
      });
    }
  };
  
  vaciarCarrito = () => {
    this.setState({ carrito: [] });
  };
  calcularTotal = (carrito) => {
    return carrito.reduce((total, producto) => total + (producto.precio || 0), 0);
  };
 
  handleCompra = () => {
    if (this.state.carrito.length > 0) {
      const numeroRandom = Math.floor(Math.random() * 1000) + 1;

      // Crear elementos de React para representar la información
      const items = this.state.carrito.map((producto) => (
        <tr key={producto.carritoId}>
          <td>{producto.nombre}</td>
          <td>${producto.precio}</td>
        </tr>
      ));

      const total = (
        <tr>
          <td><h3>Total:</h3></td>
          <td><h3>${this.calcularTotal(this.state.carrito)}</h3>1</td>
        </tr>
      );

      const nuevaFactura = (
        <div key={numeroRandom}>
          <table>
            <thead>
              <h1 className={estilos.title2}>Factura</h1>
              <h3>Numero Factura: {numeroRandom}</h3>
              <tr>
                <th>Producto</th>
                <th>Precio</th>
              </tr>
            </thead>
            <tbody>
              {items}
              {total}
            </tbody>
          </table>
          <hr /> {/* Línea separadora entre facturas */}
        </div>
      );

      // Actualizar el estado con la nueva factura
      this.setState((prevState) => ({
        facturas: [...prevState.facturas, nuevaFactura],
        carrito: [],
      }));
    } else {
      alert('No hay productos en el carrito.');
    }
  };

  render() {
    return (
      <div className={estilos.divCard}>
        <h1 className={estilos.title}>Mira Flores Shop</h1>

        <div className={estilos.parent}>
          {this.state.productos.map((producto) => (
            <Producto key={producto.id} producto={producto} agregarAlCarrito={this.agregarAlCarrito} />
          ))}
        </div>

        <Carrito carrito={this.state.carrito} eliminarDelCarrito={this.eliminarDelCarrito} />
        <CalcularTotal carrito={this.state.carrito} />
        <div>
            <button onClick={this.handleCompra} className={estilos.btnCompra}>Comprar</button>
        </div>
        <div id='root' className={estilos.facturas}>
          {/* Renderizar todas las facturas */}
          {this.state.facturas}
        </div>
      </div>
    );
  }
}

export default App;
