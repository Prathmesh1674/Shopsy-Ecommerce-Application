//const BASE_URL = "http://localhost:8080";

async function loadOrders() {

    const userId = localStorage.getItem("userId");
    const token = localStorage.getItem("token");

    if (!userId || !token) {
        alert("Please login first.");
        window.location.href = "login.html";
        return;
    }

    try {

        const response = await fetch(
            `${BASE_URL}/orders/user/${userId}`,
            {
                headers: {
                    "Authorization": "Bearer " + token
                }
            }
        );

        if (!response.ok) {
            alert("Unable to load orders.");
            return;
        }

        const orders = await response.json();

        console.log(orders);

        displayOrders(orders);

    }
    catch (error) {

        console.error(error);

        alert("Server Error");

    }

}

function displayOrders(orders) {

    const container = document.getElementById("ordersContainer");

    container.innerHTML = "";

    if (orders.length === 0) {

        container.innerHTML = `
            <div class="alert alert-info">
                You haven't placed any orders yet.
            </div>
        `;

        return;
    }

    orders.forEach(order => {

        let products = "";

        order.orderItems.forEach(item => {

            products += `
                <li>
                    ${item.productName}
                    (Qty: ${item.quantity})
                    - ₹${item.productPrice}
                </li>
            `;

        });

        container.innerHTML += `

        <div class="card shadow mb-4">

            <div class="card-header d-flex justify-content-between">

                <div>
                    <strong>Order #${order.id}</strong>
                </div>

                <span class="badge bg-success">
                    ${order.status}
                </span>

            </div>

            <div class="card-body">

                <p>
                    <strong>Order Date:</strong>
                    ${new Date(order.date).toLocaleDateString()}
                </p>

                <p>
                    <strong>Total Amount:</strong>
                    ₹${order.totalAmount}
                </p>

                <hr>

                <h6>Products</h6>

                ${products}

            </div>

        </div>

    `;
    });

}

loadOrders();