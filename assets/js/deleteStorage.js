if (window.location.pathname === "/uspesna_platba.html") {
    // Remove cart items
    localStorage.removeItem("cart");

    // Remove user data
    localStorage.removeItem("user_data");

    // Remove applied coupon
    localStorage.removeItem("COUPON_APPLIED");

    // Reset coupon flag
    localStorage.setItem("COUPON_APPLIED_FLAG", false);
}