
// Cart functionality
let cart = [];

function updateCart() {
    const cartItemsContainer = document.getElementById('cart-items');
    const grandTotalElement = document.getElementById('grand-total');
    cartItemsContainer.innerHTML = '';
    let grandTotal = 0;
    cart.forEach((item, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td><img src="${item.image}" style="width: 50px; height: 50px;" alt="${item.name}"></td>
            <td>${item.name}</td>
            <td>₹${item.price}</td>
            <td>${item.quantity}</td>
            <td>₹${item.price * item.quantity}</td>
            <td><button class="delete-btn" data-index="${index}">Delete</button></td>
        `;
        cartItemsContainer.appendChild(row);
        grandTotal += item.price * item.quantity;
    });
    grandTotalElement.textContent = grandTotal;

    // Attach event listeners for delete buttons
    document.querySelectorAll('.delete-btn').forEach(button => {
        button.addEventListener('click', (e) => {
            const index = e.target.getAttribute('data-index');
            cart.splice(index, 1);
            updateCart();
        });
    });
}

document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', (e) => {
        const name = e.target.getAttribute('data-name');
        const price = parseFloat(e.target.getAttribute('data-price'));
        const image = e.target.getAttribute('data-image');
        const existingItem = cart.find(item => item.name === name);
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({ name, price, quantity: 1, image });
        }
        alert(`${name} added to cart`);
        updateCart();
    });
});

document.getElementById('cartIcon').addEventListener('click', () => {
    const cartDropdown = document.getElementById('cartDropdown');
    cartDropdown.style.display = cartDropdown.style.display === 'none' || cartDropdown.style.display === '' ? 'block' : 'none';
});
