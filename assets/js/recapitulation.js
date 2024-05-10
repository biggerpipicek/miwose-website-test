let cart = JSON.parse(localStorage.getItem("cart")) || [];
const productsWrapper = document.querySelector(".products-cart");
productsWrapper.innerHTML = "";

cart.forEach(product => {
    const productHTML = `
        <li class="list-group-item"><b>${product.productName}</b> - ${product.quantity} ks - ${product.productPrice * product.quantity} Kč</li>`;
    productsWrapper.innerHTML += productHTML;
});

let coupon = JSON.parse(localStorage.getItem("COUPON_APPLIED")) || [];
const couponsWrapper = document.querySelector(".coupon-cart");
couponsWrapper.innerHTML = "";

if (Object.keys(coupon).length !== 0) {
    const couponHTML = `
        <li class="list-group-item"><b>${coupon.name}</b> - ${coupon.percentage}% <button id='removeCoupon' class="btn btn-outline-danger"><i class="fa-solid fa-minus"></i></button></li>`;
    
    couponsWrapper.insertAdjacentHTML("beforeend", couponHTML);
}

function updateUserDataDisplay(userData) {
    let name_wrapper = document.getElementById("username");
    let gifted_wrapper = document.getElementById("usernameGifted");
    let giftedMainWrapper = document.getElementById("giftedUsernameWrapper");
    let email_wrapper = document.getElementById("email");
    name_wrapper.textContent = userData.username || "";
    
    if(userData.giftedUsername) {
        gifted_wrapper.textContent = userData.giftedUsername;
        giftedMainWrapper.style.display = "block";
    } else {
        giftedMainWrapper.style.display = "none";
    }

    email_wrapper.textContent = userData.email || "";
}

document.addEventListener("DOMContentLoaded", () => {
    let user_data = JSON.parse(localStorage.getItem("user_data")) || {};
    updateUserDataDisplay(user_data);
});

// WE ARE COUNTING THE PRICE AGAIN, BECAUSE I CAN'T SEEM TO IMPORT THE FINALPRICE IN THE CONFIRM.HTML EVEN THOUGHT IT WORKS IN THE CART.HTML (IDK)
document.addEventListener("DOMContentLoaded", () => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    
    // Calculate total price
    let totalPrice = 0;
    cart.forEach(product => {
        totalPrice += product.productPrice * product.quantity;
    });

    let coupon = JSON.parse(localStorage.getItem("COUPON_APPLIED")) || [];
    if (Object.keys(coupon).length !== 0) {
        const discountPercentage = coupon.percentage / 100;
        totalPrice -= totalPrice * discountPercentage;
    }

    const finalPriceElement = document.querySelector(".finalPrice");
    if (finalPriceElement) {
        finalPriceElement.textContent = totalPrice.toFixed(2);
    } else {
        console.error("Element with class '.finalPrice' not found.");
    }
});

function removeCoupon() {
    localStorage.removeItem("COUPON_APPLIED");
    localStorage.setItem("COUPON_APPLIED_FLAG", false);
    const totalPrice = getTotalPrice();
    displayTotalPrice(totalPrice);
    window.location.reload();
}

document.getElementById("removeCoupon").addEventListener("click", removeCoupon);

document.getElementById("pay").addEventListener("click", function() {
    console.log("Pay button clicked");

    // Remove cart items
    localStorage.removeItem("cart");
    console.log("Cart removed");

    // Remove user data
    localStorage.removeItem("user_data");
    console.log("User data removed");

    // Remove applied coupon
    localStorage.removeItem("COUPON_APPLIED");
    console.log("Coupon applied removed");
    
    // Reset coupon flag
    localStorage.setItem("COUPON_APPLIED_FLAG", "false");
    console.log("Coupon applied flag reset");
});