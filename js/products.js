let catId1 = localStorage.getItem('catID');
const products_url = `https://japceibal.github.io/emercado-api/cats_products/${catId1}.json`;

let divListaProductos = document.getElementById('prod-list-container');
let btnFilter = document.getElementById('rangeFilterCount');
let btnlimpiar = document.getElementById('clearRangeFilter')
let inputMin = document.getElementById('rangeFilterCountMin');
let inputMax = document.getElementById('rangeFilterCountMax');
let btnPrecioA = document.getElementById('sortAsc');
let btnPrecioD = document.getElementById('sortDesc');
let btnRel = document.getElementById('sortByCount');
let productos = [];


const d = document;
function buscarProducto(input, selector) {
    d.addEventListener("keyup", e => {
        if (e.target.matches(input)) {
            console.log(e.target.value)

            d.querySelectorAll(selector).forEach(el =>
                el.textContent.toLowerCase().includes(e.target.value)
                ? el.classList.remove("filter")
                : el.classList.add("filter")
                );
        }
    });
}

document.addEventListener("DOMContentLoaded", function () {

    function mostrarProductos(productos) {
        divListaProductos.innerHTML = '';
        let filtro = filtrarProducto(productos);
        for (let product of filtro) {
            divListaProductos.innerHTML += `
        <div class="list-group-item list-group-item-action producto">
            <div class="row">
                <div class="col-3">
                    <img src="${product.image}" class="img-thumbnail">
                </div>
                <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                        <h4 class="mb-1">${product.name} - ${product.currency} ${product.cost}</h4>
                        <div>
                            <small class="text-muted">
                                ${product.soldCount} vendidos
                            </small>
                        </div>
                    </div>
                    ${product.description}
                </div>
            </div>
        </div>
        `;
        };
    }

    btnPrecioA.addEventListener('click', function (event) {
        productos.sort((product1, product2) => {
            if (product1.cost < product2.cost) {
                return -1;
            } else if (product1.cost > product2.cost) {
                return 1;
            } else {
                return 0;
            }
        });
        mostrarProductos(productos);
    });

    btnPrecioD.addEventListener('click', function (event) {
        productos.sort((product1, product2) => {
            if (product1.cost > product2.cost) {
                return -1;
            } else if (product1.cost < product2.cost) {
                return 1;
            } else {
                return 0;
            }
        });
        mostrarProductos(productos);
    });

    btnRel.addEventListener('click', function (event) {
        productos.sort((product1, product2) => {
            if (product1.soldCount > product2.soldCount) {
                return -1;
            } else if (product1.soldCount < product2.soldCount) {
                return 1;
            } else {
                return 0;
            }
        });
        mostrarProductos(productos);
    });

    function filtrarProducto() {
        let productosFiltrados = productos.filter(product => {
            if (inputMin.value === '' && inputMax.value === '') {
                return true;
            }
            else if (inputMin.value === '') {
                product.cost < inputMax.value;
            }
            else if (inputMax.value === '') {
                return product.cost > inputMin.value;
            }
            return product.cost > inputMin.value && product.cost < inputMax.value;
        })
        return productosFiltrados;
    };

    let productos = [];
    let parrafo = document.getElementById('p1');

    btnFilter.addEventListener('click', function () {
        mostrarProductos(productos)
    });

    fetch(products_url)
        .then(respuesta => respuesta.json())
        .then(datos => {
            let htmlp = datos.catName;
            parrafo.innerHTML += htmlp
        });
    fetch(products_url)
        .then(respuesta => respuesta.json())
        .then(datos => {
            productos = datos.products;
            mostrarProductos(productos)
        });

    buscarProducto(".buscar", ".producto");

});

btnlimpiar.addEventListener('click', function () {
    window.location='products.html';
});