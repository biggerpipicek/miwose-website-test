import { getTotalPrice } from "kosik.js"

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

coupon.forEach(coupon => {
    const couponHTML = `
        <li class="list-group-item"><b>${coupon.name}</b> - ${coupon.percentage} %</li>`;
    couponsWrapper.innerHTML += couponHTML;
});

getTotalPrice();