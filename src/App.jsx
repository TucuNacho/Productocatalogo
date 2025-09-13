import { BrowserRouter, Routes, Route } from "react-router";
import Administrador from "./components/pages/Administrador";
import DetalleProducto from "./components/pages/DetalleProducto";
import Error404 from "./components/pages/Error404";
import Inicio from "./components/pages/Inicio";
import Login from "./components/pages/Login";
import FormularioProducto from "./components/pages/producto/FormularioProducto";
import Footer from "./components/shared/Footer";
import Menu from "./components/shared/Menu";
import { useEffect, useState } from "react";
import ProtectorAdmin from "./components/routes/ProtectorAdmin";
import { v4 as uuidv4 } from "uuid";

function App() {
  const usuarioLogueado = sessionStorage.getItem("userKey") || {};
  const productosLocalStorage =
    JSON.parse(localStorage.getItem("productos")) || [];
  const [productos, setProductos] = useState(productosLocalStorage);
  const [usuarioAdmin, setUsuarioAdmin] = useState(usuarioLogueado);

  useEffect(() => {
    localStorage.setItem("productos", JSON.stringify(productos));
  }, [productos]);

  useEffect(() => {
    sessionStorage.setItem("userKey", JSON.stringify(usuarioAdmin));
  }, [usuarioAdmin]);
  const crearProducto = (productoNuevo) => {
    //agregar un id unico al producto nuevo
    productoNuevo.id = uuidv4();
    //agregar el producto al state de productos
    setProductos([...productos, productoNuevo]);
    return true;
  };

  const borrarProducto = (idProducto) => {
    const productosFiltrados = productos.filter(
      (itemProducto) => itemProducto.id !== idProducto
    );
    setProductos(productosFiltrados);
    return true;
  };

  const buscarProducto = (idProducto) => {
    const productoBuscado = productos.find(
      (itemProducto) => itemProducto.id === idProducto
    );

    return productoBuscado;
  };
  const editarProducto = (idProducto, productoActualizado) => {
    //lógica para editar un producto
    const productosEditado = productos.map((itemProducto) => {
      if (itemProducto.id === idProducto) {
        return {
          ...itemProducto,
          ...productoActualizado,
        };
      } else {
        return itemProducto;
      }
    });
    setProductos(productosEditado);
    return true;
  };
  return (
    <>
      <BrowserRouter>
        <Menu userAdmin={usuarioAdmin} setUsuarioAdmin={setUsuarioAdmin}></Menu>
        <main>
          <Routes>
            <Route path="/" element={<Inicio productos={productos} />}></Route>

            <Route
              path="/detalle/:id"
              element={
                <DetalleProducto
                  buscarProducto={buscarProducto}
                ></DetalleProducto>
              }
            ></Route>

            <Route
              path="/login"
              element={<Login user={setUsuarioAdmin}></Login>}
            ></Route>

            <Route
              path="/administrador"
              element={<ProtectorAdmin isAdmin={usuarioAdmin}></ProtectorAdmin>}
            >
              <Route
                index
                element={
                  <Administrador
                    productos={productos}
                    setProductos={setProductos}
                    borrar={borrarProducto}
                  ></Administrador>
                }
              ></Route>

              <Route
                path="crear"
                element={
                  <FormularioProducto
                    agregarProducto={crearProducto}
                    titulo={"Crear producto"}
                  ></FormularioProducto>
                }
              ></Route>

              <Route
                path="editar/:id"
                element={
                  <FormularioProducto
                    buscarProducto={buscarProducto}
                    titulo={"Editar producto"}
                    editarProducto={editarProducto}
                  ></FormularioProducto>
                }
              ></Route>
            </Route>

            <Route path="*" element={<Error404></Error404>}></Route>
          </Routes>
        </main>
        <Footer></Footer>
      </BrowserRouter>
    </>
  );
}

export default App;
