let cart = JSON.parse(localStorage.getItem("cart")) || [];
const productsWrapper = document.querySelector(".lg");
productsWrapper.innerHTML = "";

cart.forEach(product => {
    const productHTML = `
        <li class="list-group-item"><b>${product.productName}</b> - ${product.quantity} ks - ${product.productPrice * product.quantity} Kč</li>`;
    productsWrapper.innerHTML += productHTML;
});

let coupon = JSON.parse(localStorage.getItem("COUPON_APPLIED")) || [];
const productsWrapper = document.querySelector(".lg");
productsWrapper.innerHTML = "";

cart.forEach(product => {
    const couponHTML = `
        <li class="list-group-item"><b>${coupon.name}</b> - ${coupon.percentage} %</li>`;
    productsWrapper.innerHTML += couponHTML;
});