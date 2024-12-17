let usuarios = [
    {
        id: "111",
        nombres: "Marisol Karina",
        apellidos: "Pachauri Rivera",
        email: "mpachaurir@uni.pe",
        password: "123456",
        // carrito: {
        //     items: [
        //         {
        //             idProducto: "200",
        //             cantidad: 1
        //         },
        //         {
        //             idProducto: "300",
        //             cantidad: 1
        //         }
        //     ],
        //     precioTotal: 28.00
        // }
    },
    {
        id: "222",
        nombres: "Alexia",
        apellidos: "Flores",
        email: "alexia@gmail.com",
        password: "123456",
        // carrito: {
        //     items: [],
        //     precioTotal: 0
        // }
    }
]

class Usuario {
    constructor(id, nombres, apellidos, email, password) {
        this.id = id;
        this.nombres = nombres;
        this.apellidos = apellidos;
        this.email = email;
        this.password = password;
        // this.carrito = carrito;
    }

}



let productos = [
    {
        id: "100",
        nombre: "Alfombra Cognitiva Estrella",
        urlImagen: "https://www.cochikis.pe/wp-content/uploads/2022/07/alfombracognitiva1.jpg",
        descripcion: "Estimula las habilidades cognitivas de tu mascota con nuestra alfombra cognitiva estrella que posee capas para esconder treats y estimular el instinto de rastreo y olfato.",
        precio: 129.00,
        categoria: "perro",
        color: "rojo"
    },
    {
        id: "200",
        nombre: "Accecan Collar Michi Flores",
        urlImagen: "https://www.cochikis.pe/wp-content/uploads/2023/04/accecan-collar-corbatita-michi-miniflores.jpg",
        descripcion: "Estimula las habilidades cognitivas de tu mascota con nuestra alfombra cognitiva estrella que posee capas para esconder treats y estimular el instinto de rastreo y olfato.",
        precio: 15.00,
        categoria: "gato",
        color: "celeste"
    },
    {
        id: "300",
        nombre: "Ferplast Ball With Bell 5.5 CM",
        urlImagen: "https://www.cochikis.pe/wp-content/uploads/2023/09/ferplast-pelota-para-roedores-5cm.jpg",
        descripcion: "Pelota de ingredientes naturales con un cascabel dentro. Sirve para reducir el crecimiento excesivo de los dientes. Este juego dental es ideal como pasatiempo para los roedores.",
        precio: 13.00,
        categoria: "conejo",
        color: "marron"
    }
]

class Producto {
    constructor(id, nombre, urlImagen, descripcion, precio) {
        this.id = id;
        this.nombre = nombre;
        this.urlImagen = urlImagen;
        this.descripcion = descripcion;
        this.precio = precio;
    }

    static findById (id) {
        const productoDeseado = productos.find(producto =>
            producto.id.toString() === id.toString()
        );
        return productoDeseado;
    }
}

function mostrarProductosAll () { mostrarProductos(productos)}

function mostrarProductos (listaProductos) {
    let productosVisualizados = '';
    listaProductos.forEach(prod => {
        productosVisualizados += `
            <div style="margin: 10px; padding: 10px;" class="producto">
                <figure>
                    <img src="${prod.urlImagen}" alt="${prod.nombre}">
                    <figcaption class="producto__titulo">${prod.nombre}</figcaption>
                </figure>
                <div class="producto__caracteristicas">
                    <p>S/. ${prod.precio.toFixed(2)}</p>
                    <p>Categoría: ${prod.categoria}</p>
                    <p>Color: ${prod.color}</p>
                    <p>${prod.descripcion}</p>
                </div>
                <div class="producto__carrito">
                    <input type="number" min="1" step="1" id="cantidad${prod.id}" value="1"/>
                    <button type="submit" onclick='agregarMiProducto(${prod.id})'>Agregar producto</button>
                </div>
            </div>
        `;
    });
    document.getElementById("misProductos").innerHTML = productosVisualizados;
}

function filtrarPorCategoria (categoria) {
    const productosFiltrados = productos.filter(producto =>
        producto.categoria.toLocaleLowerCase() === categoria.toLocaleLowerCase()
    );
    mostrarProductos(productosFiltrados);
}

function filtrarPorColor (color) {
    const productosFiltrados = productos.filter(producto =>
        producto.color.toLowerCase() === color.toLowerCase());
    mostrarProductos(productosFiltrados);
}

function obtenerOrden() {
    let ordenar = document.getElementById("ordenar");
    let productosOrdenados;
    let tipoOrden = ordenar.value;

    switch (tipoOrden) {
        case "1":
            productosOrdenados = productos.sort((prod1, prod2) => prod1.nombre.localeCompare(prod2.nombre));
            break;
        case "2":
           productosOrdenados = productos.sort((prod1, prod2) => prod1.precio - prod2.precio);
            break;
        case "3":
            productosOrdenados = productos.sort((prod1, prod2) => prod2.precio - prod1.precio);
            break;
        default:
            productosOrdenados = productos;
    }

    mostrarProductos(productosOrdenados);
}


function filtrarPorPrecio () {
    const precios = document.getElementsByName("precio");
    const precioMin = precios[0].value || 0;
    const precioMax = precios[1].value || 0;

    let productosFiltrados;
    if(precioMin === 0) {
        productosFiltrados = productos.filter(producto => producto.precio <= precioMax );
    } else if (precioMax === 0) {
        productosFiltrados = productos.filter(producto => producto.precio >= precioMin );
    } else {
        productosFiltrados = productos.filter(producto => producto.precio >= precioMin && producto.precio <= precioMax );
    }

    mostrarProductos(productosFiltrados);
}

let carrito = {
        items: [
            {
                idProducto: "300",
                cantidad: 1,
            }
        ],
        precioTotal: 0
    }

class Carrito {

    static agregarProducto (producto, cantidadInput) {
        if (!JSON.parse(localStorage.getItem("carrito"))) {
            //Guardando carrito actual en el local storage
            localStorage.setItem('carrito', JSON.stringify(carrito));
        }
        let miCarrito = JSON.parse(localStorage.getItem("carrito"));

        const indiceEnCarrito = miCarrito.items.findIndex(cp => {
            return cp.idProducto.toString() === producto.id.toString();
        });

        let nuevaCantidad;
        const itemsActualizados = [...miCarrito.items];
    
        if (indiceEnCarrito >= 0) {

            nuevaCantidad = miCarrito.items[indiceEnCarrito].cantidad + cantidadInput;

            // Actualizando la cantidad de un producto existente en el carrito
            itemsActualizados[indiceEnCarrito].cantidad = nuevaCantidad;

        } else {

            nuevaCantidad = cantidadInput;

            // Añadiendo producto nuevo al carrito
            itemsActualizados.push({
                idProducto: producto.id,
                cantidad: nuevaCantidad
            });
        }
        
        let precioProd = Number(producto.precio);
        
        const total = miCarrito.precioTotal + precioProd*Number(cantidadInput);
        const carritoActualizado = {
            items: itemsActualizados,
            precioTotal: total
        };
        
        carrito = carritoActualizado;
        
        return carrito;
    }
}

function agregarMiProducto (id) {
    const cantidad = Number(document.getElementById(`cantidad${id}`).value);
    const productoDeseado = Producto.findById(id);

    Carrito.agregarProducto(productoDeseado, cantidad);

    //Guardando carrito en el local storage
    localStorage.setItem('carrito', JSON.stringify(carrito));
}


function mostrarCarrito() {
    if (!JSON.parse(localStorage.getItem("carrito"))) {
        //Guardando carrito actual en el local storage
        localStorage.setItem('carrito', JSON.stringify(carrito));
    }
    //Recuperando carrito del local
    let miCarrito = JSON.parse(localStorage.getItem("carrito"));

    let precioTotalCarrito = miCarrito.precioTotal;
    document.getElementById("total").innerHTML = precioTotalCarrito;

    let productosCarrito = '';
    miCarrito.items.forEach(item => {

        let producto = Producto.findById(item.idProducto);

        productosCarrito += `
            <tr>
                <td>
                    <form action="" method="" class="carrito__eliminar">
                        <button type="submit"><i class="bi bi-x-lg"></i></button>
                    </form>
                </td>
                <td>
                    <img src="${producto.urlImagen}" alt="${producto.nombre}">
                </td>
                <td>
                    <p>${producto.nombre}</p>
                </td>
                <td>${producto.color}</td>
                <td>${producto.categoria}</td>
                <td>
                    <form action="" method="" class="carrito__actualizar">
                        <input type="number" name="cantidad" value="${item.cantidad}" min="1">
                        <button type="submit">Actualizar</button>
                    </form>
                </td>
                <td>S/. ${producto.precio} </td>
                <td>S/. ${producto.precio * item.cantidad} </td>
            </tr>
        `;
    });

    document.getElementById("contenidoCarrito").innerHTML = productosCarrito;

}