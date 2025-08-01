import { Navigate, Outlet } from "react-router";

const ProtectorAdmin = ({isAdmin}) => {
    //si no soy admin
    if(!isAdmin) {
       return <Navigate to={"/"}/>
    }
    //si soy admin muestro las rutas
    return <Outlet/>
};

export default ProtectorAdmin;
