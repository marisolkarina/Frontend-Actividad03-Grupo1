let usuarios = [
    {
        id: "111",
        nombres: "Marisol Karina",
        apellidos: "Pachauri Rivera",
        email: "mpachaurir@uni.pe",
        password: "123456"
    },
    {

    }
]

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

function mostrarProductos(listaProductos) {
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
                <form method="" action="/carrito.html" class="producto__carrito">
                    <input type="number" id="cantidad" min="1" step="1" name="cantidad" value="1"/>
                    <button type="submit">Agregar producto</button>
                </form>
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

