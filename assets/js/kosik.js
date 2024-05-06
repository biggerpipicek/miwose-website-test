//SCRIPT FOR CHECKING IF USER IS GIFTING OR NOT


var checkbox = document.getElementById("gift");
var textinput = document.getElementById("username");

if (checkbox) {
    checkbox.addEventListener("change", function() {
        var container = document.getElementById("giftInput");
        if (this.checked) {
            var newInput = document.createElement("div");
            newInput.classList.add("input-group", "mb-3");
            newInput.innerHTML = `
            <span class="input-group-text" id="addon"><i class="fa-solid fa-pen-nib"></i></span>
            <input type="text" required id="username" class="form-control" placeholder="Pro koho je dárek.." aria-label="Username" aria-describedby="addon">
            `;
            container.appendChild(newInput);
        } else {
            if (container.firstChild) {
                container.removeChild(container.firstChild);
            }
        }
    });
}

//SHOPPING CART SYSTEM

document.addEventListener('DOMContentLoaded', () => {
    const addToCartButtons = document.querySelectorAll('.addToCart');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            const card = this.closest('.card');
            const productId = card.dataset.productId;
            const productName = card.querySelector('.product-name').textContent;
            const priceInput = card.querySelector('.form-control'); // Select the input field
            const productPrice = parseFloat(priceInput.value) || 0; // Retrieve the input field value
            const productImage = card.querySelector('.product-image').src;

            addProductToCart({ productId, productName, productPrice, productImage, quantity: 1 });

        });
    });
});

function addProductToCart(product) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let found = cart.find(p => p.productId === product.productId);
    if (found) {
        found.quantity += 1;
    } else {
        cart.push(product);
    }
    localStorage.setItem('cart', JSON.stringify(cart));

    showNotification();
    displayCart();
}

const MAX_NOTIFS = 4;

function showNotification() {

    const notification = document.createElement("div");
    notification.className = "alert alert-success d-flex align-items-center fixed-bottom";
    notification.id = "addedToCart";
    notification.setAttribute("role", "alert");
    notification.innerHTML = `<div>Produkt úspěšné přidán do Košíku!</div>`;

    const notifContainer = document.getElementById("notification-container");
    notifContainer.appendChild(notification);

    const notifications = notifContainer.querySelectorAll(".alert.alert-success");
    if (notifications.length > MAX_NOTIFS) {
        notifContainer.removeChild(notifications[0]);
    }

    setTimeout(()=>{
        notification.remove();
    },5000);
    
}

function displayCart() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const productsWrapper = document.querySelector('.products-wrapper');
    productsWrapper.innerHTML = '';

    cart.forEach(product => {
        const productHTML = `<div class="card-wrapper productCard">
            <div class="card">
                <div class="card-body">
                    <img src="${product.productImage}" alt="${product.productName}">
                    <h4 class="product-name">${product.productName}</h4>
                    <p><span class="productCounter">${product.quantity}</span> ks</p>
                    <p><span class="productPrice">${product.productPrice * product.quantity}</span> CZK</p>
                </div>
            </div>
            <button class="btn btn-outline-primary" onclick="increase('${product.productId}')"><i class="fa-solid fa-plus"></i></button>
            <button class="btn btn-outline-danger" onclick="decrease('${product.productId}')"><i class="fa-solid fa-minus"></i></button>
        </div>`;
        productsWrapper.innerHTML += productHTML;
    });
}

window.onload = displayCart;

function increase(productId) {
    updateProductQuantity(productId, 1);
    getTotalPrice();
}

function decrease(productId) {
    updateProductQuantity(productId, -1);
    getTotalPrice();
}

function updateProductQuantity(productId, change) {
    let cart = JSON.parse(localStorage.getItem('cart'));
    let product = cart.find(p => p.productId === productId);
    if (product) {
        product.quantity += change;
        if (product.quantity <= 0) {
            cart = cart.filter(p => p.productId !== productId);
        }
        localStorage.setItem('cart', JSON.stringify(cart));
        displayCart();
    }
}

function getTotalPrice() {
    let totalPrice = 0;
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.forEach(product => {
        totalPrice += product.productPrice * product.quantity;
    });
    const totalPriceConsole = `Total Price: ${totalPrice}`;
    console.log(totalPriceConsole);
    document.querySelector('.finalPrice').textContent = `${totalPrice}`;
}

getTotalPrice();