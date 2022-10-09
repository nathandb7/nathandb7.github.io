let cart_url = `https://japceibal.github.io/emercado-api/user_cart/25801.json`;

const UYU_TO_USD = 42;

const s = document.querySelector.bind(document);
const sAll = document.querySelectorAll.bind(document);

const cartProductList = s('#cart-products'),
    totalElement = s('#cart-total'),
    totalProductCountElement = s('#total-product-count');

let products;
let totalProductCount = 0;
let total;

fetch(cart_url)
    .then(respuesta => respuesta.json())
    .then(datos => {
        fetchedProducts = datos.articles;
        console.log(fetchedProducts)
        showCartProducts() 
    });


    function updateTotal() {
        total = array.reduce((accum, product) => {
            let total = accum + product.count * product.unitCost;
            if (array.currency === 'UYU') {
                total /= UYU_TO_USD;
            }
    
            return total;
        }, 0);

        totalElement.innerHTML = 'USD ' + total.toFixed(2);
    }

function updateSubtotal(idx) {
    let subtotal;

    subtotal = array[idx].count * array[idx].unitCost;

    if (array[idx].currency === 'UYU') {
        subtotal /= UYU_TO_USD;
    }

    document.getElementById(`product-subtotal-${idx}`).innerHTML =
        'USD ' + subtotal.toFixed(2);
}

function showCartProducts() {
    array = fetchedProducts.concat(getCarritoPrducts());
    cartProductList.innerHTML = array.reduce((currentHtml, product, idx) => {

        return (currentHtml + `
                <tr>
                <span class="badge badge-primary" id="product-count-badge-${idx}">${product.count}</span>
                <th scope="row"><img src="${product.image}" class="img-thumbnail"/></th>
                <td>${product.name}</td>
                <td>${product.currency} ${product.unitCost}</td>
                <td><input type="number" class="product-count-input" data-product-idx="${idx}" value="${product.count}" min="0"/></td>
                <td><span id="product-subtotal-${idx}">0</span></td>
              </tr>
            `
            );
        }, '');

        for (let productCountInput of sAll('.product-count-input')) {
            const idx = productCountInput.dataset.productIdx;
    
            updateSubtotal(idx);
    
            productCountInput.addEventListener('input', ({ target }) => {
                array[idx].count = +target.value;
    
                document.getElementById(
                    `product-count-badge-${idx}`
                ).innerHTML = +target.value;
    
                updateSubtotal(idx);
                updateTotal();
            });
        }
    }


 



function getCarritoPrducts() {
    const array = JSON.parse(localStorage.getItem('product'))?.array || [];
    array.forEach((product, idx) => (product.id = idx + 1));

    return array;
}

function storeCarrito(product) {
    storedCarrito = getCarritoPrducts();

    const newData = {
        array: storedCarrito.concat({ ...product }),
    };

    localStorage.setItem('product', JSON.stringify(newData));
}
