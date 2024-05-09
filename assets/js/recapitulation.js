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

let user_data = JSON.parse(localStorage.getItem("user_data")) || [];
let name_wrapper = document.getElementById("username");
let gifted_wrapper = document.getElementById("usernameGIfted");
let email_wrapper = document.getElementById("email");
name_wrapper.textContent = user_data.username || "Prázdné pole!"
gifted_wrapper.textContent = user_data.giftedUsername || "Prázdné pole!"
email_wrapper.textContent = user_data.email || "Prázdné pole!";



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