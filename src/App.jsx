import { BrowserRouter, Routes, Route } from "react-router";
import Administrador from "./components/pages/Administrador";
import DetalleProducto from "./components/pages/DetalleProducto";
import Error404 from "./components/pages/Error404";
import Inicio from "./components/pages/Inicio";
import Login from "./components/pages/producto/Login";
import CardProducto from "./components/pages/producto/CardProducto";
import FormularioProducto from "./components/pages/producto/FormularioProducto";
import Footer from "./components/shared/Footer";
import Menu from "./components/shared/Menu";
import { useEffect, useState } from "react";
import ProtectorAdmin from "./components/routes/ProtectorAdmin";

function App() {
  const usuarioLogueado = sessionStorage.getItem("userKey") || false;
  const  productosLocalStorage= JSON.parse(localStorage.getItem("productos")) || []
  const [productos, setProductos] = useState(productosLocalStorage);
  const [usuarioAdmin, setUsuarioAdmin] = useState(usuarioLogueado);
  useEffect(()=>{
    localStorage.setItem("productos", JSON.stringify(productos))
  }, [productos])
  return (
    <>
      <BrowserRouter>
        <Menu userAdmin={usuarioAdmin} setUsuarioAdmin={setUsuarioAdmin}></Menu>
        <main>
          <Routes>
            <Route path="/" element={<Inicio productos={productos}/>}></Route>

            <Route
              path="/detalle"
              element={<DetalleProducto></DetalleProducto>}
            ></Route>

            <Route
              path="/login"
              element={<Login user={setUsuarioAdmin}></Login>}
            ></Route>

            <Route
              path="/administrador"
              element={<ProtectorAdmin isAdmin={usuarioAdmin}></ProtectorAdmin>}
            >
              <Route index element={<Administrador productos={productos} setProductos={setProductos}></Administrador>}></Route>

              <Route
                path="crear"
                element={<FormularioProducto></FormularioProducto>}
              ></Route>

              <Route
                path="editar"
                element={<FormularioProducto></FormularioProducto>}
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
