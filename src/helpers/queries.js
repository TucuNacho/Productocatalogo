const urlproductos =import.meta.env.VITE_API_PRODUCTOS


export const leerProducto = async ()=>{
    try {
        const respuesta = await fetch(urlproductos)
        return respuesta
    } catch (error) {
        console.error(error)
        return null
    }
}

export const obtenerProductoPorId = async (id)=>{
    try {
        const respuesta = await fetch(urlproductos + `/${id}`)
        return respuesta
    } catch (error) {
        console.error(error)
        return null
    }
}

export const crearProducto = async (productoNuevo)=>{
    try {
        const respuesta = await fetch(urlproductos, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(productoNuevo)
        })
        return respuesta
    } catch (error) {
        console.error(error)
        return null
    }
}

export const editarProducto = async (productoEditado, id)=>{
    try {
        const respuesta = await fetch(urlproductos + `/${id}` ,{
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(productoEditado)
        })
        return respuesta
    } catch (error) {
        console.error(error)
        return null
    }
}

export const borrarProductoPorId = async (id)=>{
    try {
        console.log(id);

        const respuesta = await fetch(urlproductos + `/${id}` ,{
            method: 'DELETE',
        })
        console.log(respuesta);

        return respuesta
    } catch (error) {
        console.error(error)
        return null
    }
}
