let ProdId1 = localStorage.getItem('prodID');
let catId1 = localStorage.getItem('catID');
const purl = `https://japceibal.github.io/emercado-api/products/${ProdId1}.json`;
const comenturl = `https://japceibal.github.io/emercado-api/products_comments/${ProdId1}.json`;

let selectedScore = 0;

var category = {};

let fetchedComments = [];

// function para redirigir al clicar en un producto relacionado
function setProd(ProdId) {
    window.localStorage.removeItem('prodID');
    localStorage.setItem('prodID', ProdId);
}

const s = document.querySelector.bind(document);

const productNameHTML = s('#productName'),
    productDescriptionHTML = s('#productDescription'),
    productCostHTML = s('#productCost'),
    productSoldCountHTML = s('#productSoldCount'),
    relatedProductsGallery = s('#related-products-gallery'),
    productimagescarousel = s('#product-images-carousel'),
    carouselIndicators = s('#product-images-carousel .carousel-indicators'),
    carouselImages = s('#product-images-carousel .carousel-inner');

const commentList = s('#comment-list'),
    commentForm = s('#comment-form'),
    userNameInput = commentForm['user-name'],
    commentContentInput = commentForm['comment-content'],
    commentStarButtons = document.querySelectorAll(
        '#user-review-stars .fa-star'
    );

function showImagesGallery(imageList) {
    let carouselIndicatorsHtml = '';
    let carouselImagesHtml = '';
    imageList.forEach((image, idx) => {
        console.log(image, idx);
        carouselIndicatorsHtml += `<button type="button" data-bs-target="#product-images-carousel" data-bs-slide-to="${idx}" ${!idx ? 'class="active"' : ''} ${!idx ? 'aria-current="true"' : ''} aria-label="Slide ${idx}" ></button>`;

        carouselImagesHtml += `<div class="carousel-item ${!idx ? 'active' : ''}">
                        <img src="${image}" class="d-block w-100" alt="img ${idx}">
                    </div>`;
    });

    carouselIndicators.innerHTML = carouselIndicatorsHtml;

    carouselImages.innerHTML = carouselImagesHtml;
}

document.addEventListener("DOMContentLoaded", function () {

    for (let [idx, star] of commentStarButtons.entries()) {
        star.onclick = () => {
            const clickedStar = star;

            for (let star of commentStarButtons) {
                star.classList.remove('checked');
            }

            clickedStar.parentElement.classList.add('checked');
            clickedStar.classList.add('checked');

            selectedScore = idx + 1;
        };
    }

    function resetStars() {
        commentStarButtons[0].parentElement.classList.remove('checked');

        for (let star of commentStarButtons) {
            star.classList.remove('checked');
            selectedScore = 0;
        }
    }

    commentForm.onsubmit = (e) => {
        e.preventDefault();

        const newComment = {
            user: userNameInput.value,
            description: commentContentInput.value,
            score: selectedScore,
            dateTime: new Date().toLocaleString(),
        };
        storeComment(newComment);

        e.target.reset();
        resetStars();
    };

    function getStoredComments() {
        const array = JSON.parse(localStorage.getItem('comments'))?.array || [];
        array.forEach((comment, idx) => (comment.id = idx + 1));

        return array;
    }

    function storeComment(comment) {
        storedComments = getStoredComments();

        const newData = {
            array: storedComments.concat({ ...comment }),
        };

        localStorage.setItem('comments', JSON.stringify(newData));

        renderComments();
    }

    function unstoreComment(id) {
        storedComments = getStoredComments();

        const newData = {
            array: storedComments.filter((comment) => comment.id !== +id),
        };

        localStorage.setItem('comments', JSON.stringify(newData));

        renderComments();
    }

    function resetStars() {
        commentStarButtons[0].parentElement.classList.remove('checked');

        for (let star of commentStarButtons) {
            star.classList.remove('checked');
            selectedScore = 0;
        }
    }

    function genStars(score) {
        let stars = '';
        for (let i = 1; i <= 5; i++) {
            stars += `<i class="fas fa-star ${score === i ? 'checked' : ''}"></i>`;
        }
        return stars;
    }

    function renderComments() {
        let htmlContentToAppend = '';

        const array = fetchedComments.concat(getStoredComments());

        for (let i = 0; i < array.length; i++) {
            const comment = array[i];

            htmlContentToAppend += `
                <div class="list-group-item list-group-item-action">
                <div class="row">
                    <div class="col-3">
                    <img src="img/img_perfil.png" class="img-thumbnail">
                    </div>
                    <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                        <h4 class="mb-1">${comment.user}</h4>
                        <small class="font-muted">
                        <div class="comment-stars">${genStars(comment.score)}</div>
                        ${comment.dateTime}
                        </small>
                    </div>
                    ${comment.description}
                    </div>
                </div>
                ${comment.id
                    ? `
                        <button class='delete-comment' data-delete-id="${comment.id}">
                                <svg width="24px" height="24px" viewBox="0 0 16 16" class="bi bi-trash-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd" d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5a.5.5 0 0 0-1 0v7a.5.5 0 0 0 1 0v-7z"/>
                                </svg>     
                        </button>
                    `
                    : ''
                }
                </div>
            `;
        }
        commentList.innerHTML = htmlContentToAppend;

        const buttons = document.getElementsByClassName('delete-comment');

        for (let item of buttons) {
            item.onclick = ({ currentTarget }) => {
                unstoreComment(currentTarget.dataset.deleteId);
            };
        }
    }
    // fin comentarios

    fetch(purl)
        .then(respuesta => respuesta.json())
        .then(datos => {
            productNameHTML.innerHTML = datos.name;
            productDescriptionHTML.innerHTML = datos.description;
            productCostHTML.innerHTML = `${datos.currency} ${datos.cost}`;
            productSoldCountHTML.innerHTML = datos.soldCount;
            relatedProducts(datos.relatedProducts);
            showImagesGallery(datos.images);
        });

    fetch(comenturl)
        .then(respuesta => respuesta.json())
        .then(datos => {
            console.log(datos)
            fetchedComments = datos;
            renderComments();
        });


    function relatedProducts(relacionados) {
        let relatedhtml = '';
        for (let producto of relacionados) {
            relatedhtml += `<div class="col-lg-3 col-md-4 col-6">
            <div class="d-block mb-4 h-100">
                <a onclick="setProd(${producto.id})" href="product-info.html"><img class="img-fluid img-thumbnail" src="${producto.image}" alt="${producto.name}">
                </a>
                </div>
            </div>`
            relatedProductsGallery.innerHTML = relatedhtml;
        }
    }
});
