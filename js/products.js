const products_url = 'https://japceibal.github.io/emercado-api/cats_products/101.json';

document.addEventListener("DOMContentLoaded", function () {

    let productos = [];
    let divListaProductos = document.getElementById('prod-list-container');

    fetch(products_url)
        .then(respuesta => respuesta.json())
        .then(datos => {
            productos = datos.products;
            let htmlContentToAppend = '';
            for (let product of productos) {
                htmlContentToAppend += `
                <div class="list-group-item list-group-item-action">
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
            }
            divListaProductos.innerHTML += htmlContentToAppend;
        });
});