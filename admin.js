window.onload = function() {
    const password = prompt("Please enter the admin password to access orders.");
    
    // Hardcoded password (change as needed)
    const adminPassword = "admin123"; // Change this password to your preferred password

    if (password !== adminPassword) {
        alert("Incorrect password! You are not authorized to view this page.");
        window.location.href = "index.html"; // Redirect back to home page if the password is incorrect
    } else {
        loadOrders(); // If the password is correct, load the orders
    }
};

// Load and display orders if the password is correct
function loadOrders() {
    const orderListDiv = document.getElementById('order-list');
    
    for (let i = 0; i < localStorage.length; i++) {
        const orderKey = localStorage.key(i);
        
        if (orderKey.startsWith('order-')) {
            const orderData = JSON.parse(localStorage.getItem(orderKey));

            const orderDetails = `
                <div class="order">
                    <h3>Table Number: ${orderData.tableNumber}</h3>
                    <h4>Order Details:</h4>
                    <ul>
                        ${orderData.orders.map(order => `
                            <li>${order.name} (x${order.qty}) - $${order.total.toFixed(2)}</li>
                        `).join('')}
                    </ul>
                    <strong>Total: $${orderData.orders.reduce((sum, order) => sum + order.total, 0).toFixed(2)}</strong>
                </div>
                <hr>
            `;
            
            orderListDiv.innerHTML += orderDetails;
        }
    }

    if (orderListDiv.innerHTML === '') {
        orderListDiv.innerHTML = '<p>No orders placed yet.</p>';
    }
};