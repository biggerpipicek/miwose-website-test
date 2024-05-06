function fetchProductDescriptions(callback) {
    fetch('../../pages/description.txt')
        .then(response => response.text())
        .then(text => {
            // Split the text file content into an array of lines
            const lines = text.split('\n');
            callback(lines);
        })
        .catch(error => {
            console.error('Error fetching product descriptions:', error);
        });
}

function modalOpen(event) {
    // Prevent default link behavior
    event.preventDefault();

    // Get productId from data-product-id attribute
    const productId = parseInt(event.currentTarget.getAttribute('data-product-id'));

    // Check if the modal already exists
    var existingModal = document.getElementById('modalOpen');

    if (!existingModal) {
        // Fetch the product descriptions
        fetchProductDescriptions(function(lines) {
            var modalHTML = `<div class="modal fade" id="modalOpen" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="modallabel" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h1 class="modal-title fs-5" id="modallabel">Info</h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">`;

            // Check if productId is valid
            if (!isNaN(productId) && productId >= 1 && productId <= lines.length) {
                // Display the product description for the specified productId
                //modalHTML += `<p>${productId}. ${lines[productId - 1]}</p>`;
                modalHTML += `<p>${lines[productId - 1]}</p>`;
            } else {
                // Display a message for invalid productId
                modalHTML += `<p>Invalid product ID</p>`;
            }

            modalHTML += `</div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-primary" data-bs-dismiss="modal">Chápu</button>
                        </div>
                    </div>
                </div>
            </div>`;

            var modalWrapper = document.createElement('div');
            modalWrapper.innerHTML = modalHTML;
            document.body.appendChild(modalWrapper);

            // Initialize Bootstrap modal
            var modal = new bootstrap.Modal(document.getElementById('modalOpen'));
            modal.show();

            // Remove modal when it is closed
            document.getElementById('modalOpen').addEventListener('hidden.bs.modal', function () {
                this.remove();
            });
        });
    } else {
        // If modal exists, simply open it
        var modal = new bootstrap.Modal(existingModal);
        modal.show();
    }
}