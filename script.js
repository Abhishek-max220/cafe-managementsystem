let totalAmount = 0.00;
let billDetails = [];
let customerOrders = [];

function addToBill(item, price, qtyId) {
    const quantity = document.getElementById(qtyId).value;
    if (quantity < 1) {
        alert("Please select at least 1 item.");
        return;
    }
    const itemTotal = price * quantity;

    // Add item to bill details array
    customerOrders.push({ name: item, qty: parseInt(quantity), total: itemTotal });

    // Update the total amount
    totalAmount += itemTotal;

    // Update the bill summary
    billDetails.push(`${item} (x${quantity}): ₹${itemTotal.toFixed(2)}`);
    document.getElementById("order-summary").innerHTML =
        billDetails.join('<br>') + `<br><strong>Total: ₹${totalAmount.toFixed(2)}</strong>`;
}

function submitOrder() {
    const tableNumber = document.getElementById('table-number').value;
    if (!tableNumber) {
        alert('Please enter your table number.');
        return;
    }

    const orderDetails = {
        tableNumber: tableNumber,
        orders: customerOrders,
        totalBill: totalAmount
    };

    // Store the order in localStorage for admin access
    let adminOrders = JSON.parse(localStorage.getItem('adminOrders')) || [];
    adminOrders.push(orderDetails);
    localStorage.setItem('adminOrders', JSON.stringify(adminOrders));

    alert('Order submitted successfully!');
    clearBill(); // Clear the current bill after submission
}

function clearBill() {
    // Reset bill variables and UI
    totalAmount = 0.00;
    billDetails = [];
    customerOrders = [];
    document.getElementById("order-summary").innerHTML = "No items added yet.";
    document.getElementById("table-number").value = '';
    document.querySelectorAll('.menu-item input[type="number"]').forEach(input => input.value = 1);
}

function viewAdminOrders() {
    const password = prompt("Enter admin password:");
    if (password !== "admin123") {
        alert("Incorrect password!");
        return;
    }

    // Fetch orders from localStorage
    const adminOrders = JSON.parse(localStorage.getItem('adminOrders')) || [];
    const adminOrderList = document.getElementById('admin-order-list');

    if (adminOrders.length === 0) {
        adminOrderList.innerHTML = '<p>No orders available.</p>';
        return;
    }

    // Display orders
    let orderHTML = '';
    let grandTotal = 0;
    adminOrders.forEach(order => {
        orderHTML += `<h3>Table ${order.tableNumber}</h3>`;
        order.orders.forEach(item => {
            orderHTML += `<p>${item.name} (x${item.qty}): ₹${item.total.toFixed(2)}</p>`;
        });
        orderHTML += `<p><strong>Total Bill for Table ${order.tableNumber}: ₹${order.totalBill.toFixed(2)}</strong></p><hr>`;
        grandTotal += order.totalBill;
    });
    orderHTML += `<h2>Grand Total: ₹${grandTotal.toFixed(2)}</h2>`;
    adminOrderList.innerHTML = orderHTML;
}

function clearAdminSummary() {
    if (confirm("Are you sure you want to clear all admin orders?")) {
        localStorage.removeItem('adminOrders');
        document.getElementById('admin-order-list').innerHTML = '<p>No orders available.</p>';
        alert("Admin orders cleared!");
    }
}

function submitFeedback() {
    const rating = document.getElementById("rating").value;
    const comments = document.getElementById("comments").value;

    if (!rating || rating < 1 || rating > 5) {
        alert("Please provide a valid rating between 1 and 5.");
        return;
    }

    const feedbackMessage = `
        <h3>Thank you for your feedback!</h3>
        <p><strong>Rating:</strong> ${rating}/5</p>
        <p><strong>Comments:</strong> ${comments || "No comments provided."}</p>
    `;
    document.getElementById("feedback-output").innerHTML = feedbackMessage;
    document.getElementById("feedback-form").reset();
}

