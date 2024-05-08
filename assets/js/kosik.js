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

document.addEventListener("DOMContentLoaded", () => {
    const addToCartButtons = document.querySelectorAll(".addToCart");
    addToCartButtons.forEach(button => {
        button.addEventListener("click", function() {
            const card = this.closest(".card");
            const productId = card.dataset.productId;
            const productName = card.querySelector(".product-name").textContent;
            let productPrice = 0;

            const priceInput = card.querySelector(".form-control");
            if (priceInput) {
                productPrice = parseFloat(priceInput.value) || 0;
            } else {
                const productPriceElement = card.querySelector(".product-price");
                productPrice = parseFloat(productPriceElement.textContent) || 0;
            }

            const productImage = card.querySelector(".product-image").src;

            addProductToCart({ productId, productName, productPrice, productImage, quantity: 1 });

        });
    });
});

function addProductToCart(product) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let found = cart.find(p => p.productId === product.productId);
    if (found) {
        found.quantity += 1;
    } else {
        cart.push(product);
    }
    localStorage.setItem("cart", JSON.stringify(cart));

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
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const productsWrapper = document.querySelector(".products-wrapper");
    productsWrapper.innerHTML = "";

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
    let cart = JSON.parse(localStorage.getItem("cart"));
    let product = cart.find(p => p.productId === productId);
    if (product) {
        product.quantity += change;
        if (product.quantity <= 0) {
            cart = cart.filter(p => p.productId !== productId);
        }
        localStorage.setItem("cart", JSON.stringify(cart));
        displayCart();
    }
}

function getTotalPrice() {
    let totalPrice = 0;
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.forEach(product => {
        totalPrice += product.productPrice * product.quantity;
    });
    return totalPrice;
}

function coupon_notification(txt, addclass) {

    const notification = document.createElement("div");
    notification.className = `alert d-flex align-items-center fixed-bottom ${addclass}`;
    notification.id = "coupon_load";
    notification.setAttribute("role", "alert");
    notification.innerHTML = `<div>${txt}</div>`;

    const notifContainer = document.getElementById("notification-container");
    notifContainer.appendChild(notification);

    const notifications = notifContainer.querySelectorAll(".alert");
    if (notifications.length > 1) {
        notifContainer.removeChild(notifications[0]);
    }

    setTimeout(()=>{
        notification.remove();
    },5000);
    
}

let COUPON_APPLIED = false;

function applyCoupon() {
    if (couponApplied) {
        var alreadyApplied = "Kupon již byl aplikován!";
        var addclass = "alert-info";
        console.log("Coupon already applied!");
        coupon_notification(alreadyApplied, addclass);
        return;
    }

    const coupon_code = document.getElementById("coupon").value;
    const coupons = [
        { name: "COUPON_TEST", percentage: 5 },
        { name: "TEST", percentage: 100 },
        { name: "MIWOSE", percentage: 50 },
    ];
    const coupon_find = coupons.find(coupon => coupon.name === coupon_code);

    if (!coupon_find) {
        var failed = "Kupón nebyl nalezen!";
        var addclass = "alert-danger";
        console.log("Invalid Coupon Code!");
        coupon_notification(failed, addclass);
    } else {
        var success = "Kupón byl aplikován!";
        var addclass = "alert-success";
        coupon_notification(success, addclass);
        const discountPercentage = coupon_find.percentage / 100;
        let totalPrice = getTotalPrice();
        const discountAmount = totalPrice * discountPercentage;

        totalPrice -= discountAmount;

        document.querySelector(".finalPrice").textContent = `${totalPrice.toFixed(2)}`;
        couponApplied = true;
    }
}

document.getElementById("couponLoad").addEventListener("click", function(event) {
    applyCoupon();
    event.preventDefault();
});

// Function to format the total price and display it
function displayTotalPrice(totalPrice) {
    document.querySelector(".finalPrice").textContent = `${totalPrice.toFixed(2)}`;
}

// Update the displayed total price when the page loads
window.onload = function() {
    const totalPrice = getTotalPrice();
    displayTotalPrice(totalPrice);
};

document.getElementById("couponLoad").addEventListener("click", function(event) {
    var coupon = document.getElementById("coupon");
    
    if (coupon.value === "") {
        console.log("Pole je prázdné!");
        coupon.setAttribute("data-bs-container", "body");
        coupon.setAttribute("data-bs-toggle", "popover");
        coupon.setAttribute("data-bs-placement", "right");
        coupon.setAttribute("data-bs-trigger", "focus");
        coupon.setAttribute("data-bs-content", "Pole je prázdné!");
        
        event.preventDefault();

        var popover = new bootstrap.Popover(coupon);
        popover.show();

        setTimeout(function(){
            popover.hide();
        },5000);

    } else {
        var existingPopover = bootstrap.Popover.getInstance(coupon);
        if(existingPopover) {
            existingPopover.dispose();
        }
    }

    event.preventDefault();
});

function payment_notification() {

    const notification = document.createElement("div");
    notification.className = `alert d-flex align-items-center fixed-bottom alert-danger`;
    notification.id = "coupon_load";
    notification.setAttribute("role", "alert");
    notification.innerHTML = `<div>Máte prázdný košík!<br>Zkuste něco přidat a pokračovat poté!</div>`;

    const notifContainer = document.getElementById("notification-container");
    notifContainer.appendChild(notification);

    const notifications = notifContainer.querySelectorAll(".alert");
    if (notifications.length > 1) {
        notifContainer.removeChild(notifications[0]);
    }

    setTimeout(()=>{
        notification.remove();
    },5000);
    
}

document.getElementById("paymentButton").addEventListener("click", function(event) {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    if(cart.length === 0) {
        event.preventDefault();

        payment_notification();
    }
})