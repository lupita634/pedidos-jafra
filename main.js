// --------- 1. CONFIGURACIÓN DE SERVICE WORKER -------------------
if ('serviceWorker' in navigator) {
    console.log('Puedes usar los Service Workers del navegador');
    navigator.serviceWorker.register('/Pedidos%20Jafra/sw.js')
        .then(res => console.log('✅ Service Worker cargado correctamente:', res))
        .catch(err => console.log('❌ Error al registrar el Service Worker:', err));
} else {
    console.log('NO PUEDES USAR LOS Service Workers EN ESTE NAVEGADOR');
}
// ----------------------------------------------------------------



// --------- 2. LocalStorage para usuario ---------------------------
document.addEventListener('DOMContentLoaded', () => {
    const usuarioGuardado = localStorage.getItem('usuario');
    if (usuarioGuardado) {
        console.log('Usuario guardado en LocalStorage:', usuarioGuardado);
    }

    const inputUsuario = document.createElement('input');
    inputUsuario.placeholder = 'Escribe tu usuario';
    inputUsuario.style.margin = '10px';

    const btnGuardarUsuario = document.createElement('button');
    btnGuardarUsuario.textContent = 'Guardar Usuario';
    btnGuardarUsuario.style.margin = '5px';

    document.body.appendChild(inputUsuario);
    document.body.appendChild(btnGuardarUsuario);

    btnGuardarUsuario.addEventListener('click', () => {
        const nuevoUsuario = inputUsuario.value.trim();
        if (nuevoUsuario) {
            localStorage.setItem('usuario', nuevoUsuario);
            console.log('Nuevo usuario guardado:', nuevoUsuario);
            alert(`Usuario guardado: ${nuevoUsuario}`);
        }
    });
});
// -----------------------------------------------------------------



// --------- 3. SessionStorage para carrito -------------------------
document.addEventListener('DOMContentLoaded', () => {
    if (!sessionStorage.getItem('carrito')) {
        sessionStorage.setItem('carrito', JSON.stringify([]));
    }

    const inputProducto = document.createElement('input');
    inputProducto.placeholder = 'Nombre del producto';
    inputProducto.style.margin = '10px';

    const inputPrecio = document.createElement('input');
    inputPrecio.placeholder = 'Precio';
    inputPrecio.type = 'number';
    inputPrecio.style.margin = '5px';

    const btnAgregarProducto = document.createElement('button');
    btnAgregarProducto.textContent = 'Agregar al carrito';
    btnAgregarProducto.style.margin = '5px';

    document.body.appendChild(inputProducto);
    document.body.appendChild(inputPrecio);
    document.body.appendChild(btnAgregarProducto);

    btnAgregarProducto.addEventListener('click', () => {
        const nombre = inputProducto.value.trim();
        const precio = parseFloat(inputPrecio.value);

        if (nombre && !isNaN(precio)) {
            const carrito = JSON.parse(sessionStorage.getItem('carrito'));
            const nuevoId = carrito.length > 0 ? carrito[carrito.length - 1].id + 1 : 1;

            carrito.push({ id: nuevoId, nombre, precio });
            sessionStorage.setItem('carrito', JSON.stringify(carrito));

            console.log('Carrito actualizado:', carrito);
            alert(`Producto agregado: ${nombre} - $${precio}`);
        }
    });
});
// -----------------------------------------------------------------



// --------- 4. IndexedDB para historial offline -------------------
document.addEventListener('DOMContentLoaded', () => {
    let request = indexedDB.open('historialDB', 1);

    request.onupgradeneeded = function(event) {
        let db = event.target.result;
        db.createObjectStore('pedidos', { keyPath: 'id', autoIncrement: true });
    };

    request.onsuccess = function(event) {
        let db = event.target.result;

        const btnGuardarHistorial = document.createElement('button');
        btnGuardarHistorial.textContent = 'Guardar carrito en historial';
        btnGuardarHistorial.style.margin = '10px';
        document.body.appendChild(btnGuardarHistorial);

        btnGuardarHistorial.addEventListener('click', () => {
            const carrito = JSON.parse(sessionStorage.getItem('carrito'));

            if (carrito.length > 0) {
                const tx = db.transaction('pedidos', 'readwrite');
                const store = tx.objectStore('pedidos');

                carrito.forEach(item => {
                    store.add({
                        producto: item.nombre,
                        cantidad: 1,
                        precio: item.precio,
                        fecha: new Date()
                    });
                });

                tx.oncomplete = () => {
                    console.log('Carrito guardado en IndexedDB');
                    alert('Carrito guardado en historial offline.');
                };
            }
        });

        const tx2 = db.transaction('pedidos', 'readonly');
        const store2 = tx2.objectStore('pedidos');
        const req = store2.getAll();

        req.onsuccess = function() {
            console.log('Historial de pedidos en IndexedDB:', req.result);
        };
    };
});
// -----------------------------------------------------------------



// --------- 5. Scroll suave con jQuery -----------------------------
document.addEventListener("DOMContentLoaded", () => {
    if (window.$) {
        $("#menu a, nav a").click(function (e) {
            const destino = $(this).attr('href');

            if (destino === "secciones/formulario.html") {
                window.location.href = destino;
                return;
            }

            e.preventDefault();

            if ($(destino).length) {
                $('html, body').animate({
                    scrollTop: $(destino).offset().top
                }, 600);
            }
        });
    } else {
        console.warn("⚠ jQuery no cargó, el scroll suave no funcionará.");
    }
});
