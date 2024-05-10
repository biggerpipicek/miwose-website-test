document.addEventListener("DOMContentLoaded", function() {
    if (window.location.pathname === "uspesna_platba.html") {
        // Remove localStorage items
        localStorage.removeItem("cart");
        localStorage.removeItem("user_data");
        
        if (localStorage.getItem("COUPON_APPLIED")) {
            localStorage.removeItem("COUPON_APPLIED");
            localStorage.setItem("COUPON_APPLIED_FLAG", "false");
        }
    }
});