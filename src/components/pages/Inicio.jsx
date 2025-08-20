import { Container, Row, Form } from "react-bootstrap";
import CardProducto from "./producto/CardProducto";
import { useState } from "react";

const Inicio = ({ productos }) => {
  const [busqueda, setBusqueda] = useState("");

  const handleChange = (e) => {
    setBusqueda(e.target.value);
  };

  const productoFiltrado = productos.filter((producto) =>
    producto.nombreProducto.toLowerCase().includes(busqueda.toLowerCase())
  );
  return (
    <section className="mainSection">
      <img
        className="banner"
        src="https://images.pexels.com/photos/13591748/pexels-photo-13591748.jpeg"
        alt="fondo cafe"
      />
      <Container className="mt-5">
        <h1 className="display-4">Nuestros Productos</h1>
        <Form.Group>
          <Form.Label>Buscar producto</Form.Label>
          <Form.Control
            type="text"
            placeholder="busque un producto por su nombre"
            onChange={handleChange}
            value={busqueda}
          ></Form.Control>
        </Form.Group>
        <hr />
        <Row>
          {productoFiltrado.length > 0 ? (
            productoFiltrado.map((producto) => (
              <CardProducto key={producto.id} producto={producto} />
            ))
          ) : (
            <p>No se encontraron productos con ese nombre</p>
          )}
        </Row>
      </Container>
    </section>
  );
};

export default Inicio;
