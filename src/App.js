import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

const productos = {
  electrodos: [
    { nombre: "Conarco 2.5mm", precioKilo: 16500 },
    { nombre: "Conarco 2mm", precioKilo: 22000 },
    { nombre: "Común 2mm", precioKilo: 8500 },
    { nombre: "Común 3.2mm", precioKilo: 8000 },
  ],
  clavos: [
    { nombre: "Punta París 1\"", precioKilo: 5400 },
    { nombre: "Punta París 1 1/2\"", precioKilo: 5300 },
    { nombre: "Punta París 2\"", precioKilo: 4700 },
    { nombre: "Punta París 2 1/2 - 3\"", precioKilo: 4600 },
    { nombre: "Punta París 4 - 8\"", precioKilo: 4700 },
    { nombre: "Espiralado 1 1/2\"", precioKilo: 7300 },
    { nombre: "Espiralado 2\"", precioKilo: 7200 },
    { nombre: "Espiralado 2 1/2\"", precioKilo: 6600 },
    { nombre: "Espiralado 3\"", precioKilo: 6300 },
  ],
};

function App() {
  const [tipoCalculo, setTipoCalculo] = useState('');
  const [categoria, setCategoria] = useState('');
  const [producto, setProducto] = useState(null);
  const [inputValue, setInputValue] = useState(0);
  const [total, setTotal] = useState(null);

  const handleTipoCalculoChange = (e) => {
    setTipoCalculo(e.target.value);
    setCategoria('');
    setProducto(null);
    setInputValue(0);
    setTotal(null);
  };

  const handleCategoriaChange = (e) => {
    setCategoria(e.target.value);
    setProducto(null);
    setInputValue(0);
    setTotal(null);
  };

  const handleProductoChange = (e) => {
    const prod = productos[categoria].find(p => p.nombre === e.target.value);
    setProducto(prod);
    setTotal(null);
  };

  const calcularPrecio = () => {
    if (producto && inputValue) {
      let precioFinal;
      if (tipoCalculo === "peso") {
        precioFinal = (producto.precioKilo / 1000) * inputValue; // precio por gramos
      } else if (tipoCalculo === "dinero") {
        precioFinal = (inputValue / producto.precioKilo) * 1000; // gramos por monto de dinero
      }
      setTotal(
        tipoCalculo === "peso"
          ? `Total a pagar: $${precioFinal.toFixed(2)}`
          : `Cantidad en gramos: ${precioFinal.toFixed(2)} g`
      );
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Calculadora de Precio</h1>
      
      <div className="form-group">
        <label htmlFor="tipoCalculo">¿Querés calcular por peso o por dinero?</label>
        <select 
          className="form-control" 
          id="tipoCalculo" 
          value={tipoCalculo} 
          onChange={handleTipoCalculoChange}>
          <option value="">Elegir...</option>
          <option value="peso">Por peso</option>
          <option value="dinero">Por dinero</option>
        </select>
      </div>

      {tipoCalculo && (
        <div className="form-group">
          <label htmlFor="categoria">Seleccioná la categoría:</label>
          <select 
            className="form-control" 
            id="categoria" 
            value={categoria} 
            onChange={handleCategoriaChange}>
            <option value="">Elegir...</option>
            <option value="electrodos">Electrodos</option>
            <option value="clavos">Clavos</option>
          </select>
        </div>
      )}

      {categoria && (
        <div className="form-group">
          <label htmlFor="producto">Seleccioná el producto:</label>
          <select 
            className="form-control" 
            id="producto" 
            value={producto?.nombre || ''} 
            onChange={handleProductoChange}>
            <option value="">Elegir...</option>
            {productos[categoria].map((prod) => (
              <option key={prod.nombre} value={prod.nombre}>
                {prod.nombre}
              </option>
            ))}
          </select>
        </div>
      )}

      {producto && (
        <div className="form-group">
          <label htmlFor="inputValue">
            {tipoCalculo === "peso" ? "Cantidad en gramos:" : "Monto en dinero:"}
          </label>
          <input 
            type="number" 
            className="form-control" 
            id="inputValue" 
            value={inputValue} 
            onChange={(e) => setInputValue(e.target.value)} 
            placeholder={tipoCalculo === "peso" ? "Ingresá la cantidad en gramos" : "Ingresá el monto"} />
        </div>
      )}

      {producto && (
        <button className="btn btn-primary mt-3" onClick={calcularPrecio}>
          Calcular
        </button>
      )}

      {total && (
        <div className="alert alert-success mt-3">
          {total}
        </div>
      )}
    </div>
  );
}

export default App;
