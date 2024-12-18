let usuarios = [
    {
        id: "111",
        nombres: "Marisol Karina",
        apellidos: "Pachauri Rivera",
        email: "mpachaurir@uni.pe",
        password: "12345678",
    },
    {
        id: "222",
        nombres: "Alexia",
        apellidos: "Flores",
        email: "alexia@gmail.com",
        password: "12345678",
    }
]

class Usuario {
    constructor(id, nombres, apellidos, email, password) {
        this.id = id;
        this.nombres = nombres;
        this.apellidos = apellidos;
        this.email = email;
        this.password = password;
    }

    static obtenerUsuarios() {
        return JSON.parse(localStorage.getItem('usuarios')) || usuarios;
    }
}

/* REGISTRO*/
function guardarUsuarios (usuarios) {
    localStorage.setItem('usuarios', JSON.stringify(usuarios));
}

function usuariosOnLoad () {
    //Apenas carga la pagina se guarda en el local storage los usuarios
    let usuariosActuales = Usuario.obtenerUsuarios();
    guardarUsuarios (usuariosActuales);
}

function registrarUsuario (event) {
    event.preventDefault();
    
    const nombres = document.getElementById("nombres").value.trim();
    const apellidos = document.getElementById("apellidos").value.trim();
    const email = document.getElementById("email").value.trim();
    const dni = document.getElementById("dni").value.trim();
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    // Validaciones para la contra y el correo
    if (password !== confirmPassword) {
        alert("Las contraseñas no coinciden.");
        return;
    }

    const listaUsuarios = Usuario.obtenerUsuarios();
    if (listaUsuarios.some(u => u.email === email)) {
        alert("El correo ya está registrado.");
        return;
    }

    const id = Math.floor(Math.random() * 1000).toString();
    // Creando un nuevo usuario
    const nuevoUsuario = { id, nombres, apellidos, email, dni, password };
    listaUsuarios.push(nuevoUsuario);

    // Guardando usuarios en el local storage
    guardarUsuarios (listaUsuarios);

    // Mensaje de éxito y sesión iniciada
    alert("Registro exitoso. ");
}

/* INICIO DE SESIÓN */

function iniciarSesion(event) {
    event.preventDefault();

    const email = document.getElementById("loginEmail").value.trim();
    const password = document.getElementById("loginPassword").value;

    const listaUsuarios = Usuario.obtenerUsuarios();

    const usuario = listaUsuarios.find(u => u.email === email && u.password === password);

    if (usuario) {
        localStorage.setItem('usuarioActivo', JSON.stringify(usuario));
        alert(`¡Bienvenido/a, ${usuario.nombres}!`);
        window.location.href = "index.html"; // Redirigir a la página principal en caso inicie sesión
    } else {
        alert("Correo o contraseña incorrectos.");
    }
}

/* INDEX: PRODUCTOS */

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
            <div class="producto">
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
//buscar productos por palabra, si esta incluida en la descripcion o nombre
function buscarPorPalabra (event) {
    event.preventDefault();
    const stringBuscado = document.getElementById("textoIngresado").value;
    const productosBuscados = productos.filter(prod =>
        prod.nombre.toLowerCase().includes(stringBuscado.toLowerCase()) ||
        prod.descripcion.toLowerCase().includes(stringBuscado.toLowerCase())
    );

    mostrarProductos(productosBuscados);
}

/* CARRITO */

let carrito = {
        items: [
            // {
            //     idProducto: "300",
            //     cantidad: 1,
            // }
        ],
        // precioTotal: 13.00
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

    static eliminarProducto (id, producto) {
        let miCarrito = JSON.parse(localStorage.getItem("carrito"));

        const productoEliminar = miCarrito.items.find(cp =>
            cp.idProducto.toString() === id.toString()
        );
        const cantidadProducto = productoEliminar.cantidad;

        let precioProd = Number(producto.precio);

        miCarrito.precioTotal -= precioProd*cantidadProducto;

        const itemsActualizados = miCarrito.items.filter(item => {
            return item.idProducto.toString() !== id.toString();
        });

        const carritoActualizado = {
            items: itemsActualizados,
            precioTotal: miCarrito.precioTotal
        };
        carrito = carritoActualizado;

        return carrito;
    }

    static actualizarCantidad (id, nuevaCantidadInput, producto) {

        let miCarrito = JSON.parse(localStorage.getItem("carrito"));

        const productoEditar = miCarrito.items.find(cp =>
            cp.idProducto.toString() === id.toString()
        );

        const cantidadAnterior = productoEditar.cantidad;

        // Actualizar la cantidad
        productoEditar.cantidad = nuevaCantidadInput;

        let precioProd = Number(producto.precio);

        // Actualizar el precio total
        miCarrito.precioTotal = miCarrito.precioTotal - (precioProd * cantidadAnterior) + (precioProd * nuevaCantidadInput);

        carrito.items = miCarrito.items;
        carrito.precioTotal = miCarrito.precioTotal;

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

function eliminarProducto (id) {
    const productoEliminar = Producto.findById(id);

    Carrito.eliminarProducto(id, productoEliminar);

    //Guardando carrito en el local storage
    localStorage.setItem('carrito', JSON.stringify(carrito));

    mostrarCarrito(carrito);
}

function actualizarCantidad (id) {
    const productoEditar = Producto.findById(id);
    const nuevaCantidad = Number(document.getElementById(`cantNueva${id}`).value);

    Carrito.actualizarCantidad(id, nuevaCantidad, productoEditar);

    localStorage.setItem('carrito', JSON.stringify(carrito));

    mostrarCarrito(carrito);
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
            <tr id="prod${item.idProducto}">
                <td>
                    <div class="carrito__eliminar">
                        <button type="submit" onclick='eliminarProducto(${producto.id})'><i class="bi bi-x-lg"></i></button>
                    </div>
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
                    <div class="carrito__actualizar">
                        <input type="number" name="cantidad" value="${item.cantidad}" id="cantNueva${producto.id}" min="1">
                        <button type="submit" onclick='actualizarCantidad(${producto.id})'>Actualizar</button>
                    </div>
                </td>
                <td>S/. ${producto.precio} </td>
                <td>S/. ${producto.precio * item.cantidad} </td>
            </tr>
        `;
    });

    document.getElementById("contenidoCarrito").innerHTML = productosCarrito;

}


/* PEDIDO */

function confirmarPedido (event) {
    event.preventDefault();

    const miCarrito = JSON.parse(localStorage.getItem("carrito"));
    const idRandom = Math.floor(Math.random() * 1000).toString();

    miCarrito.items.map(item =>
        item.idProducto = Producto.findById(item.idProducto).nombre
    )

    const miPedido = {
        id: idRandom,
        ...miCarrito,
        estado: 'pendiente',
        fechaPedido: new Date(),
        fechaEntrega: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 dias despues del pedido
    }

    // Guardando pedido en el local storage
    localStorage.setItem('pedido', JSON.stringify(miPedido));
    let pedidoGuardado = JSON.parse(localStorage.getItem("pedido"));

    const idPedido = pedidoGuardado.id;
    const precioTotal = pedidoGuardado.precioTotal;
    const estado = pedidoGuardado.estado;
    const fechaPedido = pedidoGuardado.fechaPedido;
    const fechaEntrega = pedidoGuardado.fechaEntrega;

    let mensajeProductos = miPedido.items
        .map(item => `- ${item.idProducto}: ${item.cantidad}`)
        .join('\n');

    alert(`Pedido existoso!\n\nPedido ID: ${idPedido}\n\nProductos:\n${mensajeProductos}\n\nTotal: S/. ${precioTotal}
        \nEstado: ${estado}\n\nFecha de pedido: ${fechaPedido}\n\nFecha de entrega: ${fechaEntrega}`);

    window.location.href = "index.html"; // Redirigir a la página principal luego de hacer el pedido
}