var paymentElementDisplay = document.getElementById("payment-type");

function showForm(formId) {
    //HIDE ALL FORMS
    var forms = document.querySelectorAll(".hidden");
    forms.forEach(function(form) {
        form.style.display = "none";

        //CLEARING WHEN DIFFERENT FORM SELECTED
        var formElements = form.querySelectorAll("input");
        formElements.forEach(function(element) {
            element.value = "";
        });
    });

    // SHOW THE SELECTED FORM
    var selectedForm = document.getElementById(formId);
    selectedForm.style.display = "block";
    
    console.log("Selected Form:", selectedForm);
    var paymentMethod = selectedForm.getAttribute("data-payment");
    console.log("Payment Method:", paymentMethod);

    paymentElementDisplay.innerHTML = paymentMethod;
}

// ADJUSTING THE GRID LAYOUT BASED ON THE WIDTH OF THE SCREEN AND CHECKING IF THE PAYMENT METHOD IS SELECTED
function adjustGridLayout() {
    var screenWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    var form = document.querySelector("section > .wrapper > form");
    var paymentMethod = document.querySelector('input[name="paymentMethod"]:checked');

    if (screenWidth >= 992 && paymentMethod) {
        form.style.gridTemplateColumns = "1fr 1fr 1fr";
    } else {
        // PASS
    }
}

adjustGridLayout();
window.addEventListener("resize", adjustGridLayout);
document.querySelectorAll('input[name="paymentMethod"]').forEach(function(input) {
    input.addEventListener("change", adjustGridLayout);
});

//CARD NUMBER LAYOUT
document.querySelectorAll(".card-number").forEach(function(input) {
    input.addEventListener("input", function(e) {
        let value = e.target.value.replace(/\D/g, "").substring(0, 16);
        value = value.replace(/(\d{4})(\d{4})(\d{4})(\d{4})/, "$1-$2-$3-$4");
        e.target.value = value;
    });
});

//EXPIRY DATE LAYOUT
document.querySelectorAll(".expire-date").forEach(function(input) {
    input.addEventListener("input", function(e) {
        let value = e.target.value.replace(/\D/g, "").substring(0, 4);
        value = value.replace(/(\d{2})(\d{2})/, "$1/$2");
        e.target.value = value;
    });
});

//CVV-CVC LAYOUT
document.querySelectorAll(".cvv-cvc").forEach(function(input) {
    input.addEventListener("input", function(e) {
        let value = e.target.value.replace(/\D/g, "").substring(0, 3);
        value = value.replace(/(\d{3})/, "$1");
        e.target.value = value;
    });
});