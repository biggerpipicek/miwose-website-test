let cart = JSON.parse(localStorage.getItem('cart')) || [];
const productsWrapper = document.querySelector('.lg');
productsWrapper.innerHTML = ''; // Clear existing cart display

cart.forEach(product => {
    const productHTML = `
        <li class="list-group-item"><b>${product.productName}</b> - ${product.quantity} ks - ${product.productPrice * product.quantity} Kč</li>`;
    productsWrapper.innerHTML += productHTML;
});