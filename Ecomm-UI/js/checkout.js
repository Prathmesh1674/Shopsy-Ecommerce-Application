/*const userId = localStorage.getItem("userId");

const cartKey = "cart_" + userId;

const cart =
    JSON.parse(localStorage.getItem(cartKey)) || [];

const orderSummary = document.getElementById("orderSummary");
const totalAmount = document.getElementById("totalAmount");

let total = 0;

cart.forEach(item => {

    total += item.price * item.quantity;

    orderSummary.innerHTML += `

        <div class="d-flex justify-content-between mb-2">

            <span>${item.name} x ${item.quantity}</span>

            <span>₹${item.price * item.quantity}</span>

        </div>

    `;
});

totalAmount.innerText = total;

document
    .getElementById("checkoutForm")
    .addEventListener("submit", placeOrder);

async function placeOrder(e) {

    e.preventDefault();
    console.log("Place Order clicked");

    const cart =
    JSON.parse(localStorage.getItem(cartKey)) || [];

    console.log(cart);

    if(cart.length === 0){

        alert("Cart is empty!");

        return;
    }

    const productQuantities = {};

    let totalAmount = 0;

    cart.forEach(item => {

        productQuantities[item.id] = item.quantity;

        totalAmount += item.price * item.quantity;

    });

    const orderRequest = {

        productQuantities: productQuantities,
        totalAmount: totalAmount

    };

    const userId = localStorage.getItem("userId");
    console.log(userId);

    const token = localStorage.getItem("token");
    console.log(token);

    console.log("Before Fetch");
    try{

        const response = await fetch(
            `${BASE_URL}/orders/place/${userId}`,
            {

                method:"POST",

                headers:{
                    "Content-Type":"application/json",
                    "Authorization":"Bearer " + token
                },

                body:JSON.stringify(orderRequest)

            }
        );


        if(!response.ok){

            alert("Unable to place order");

            return;

        }

        const order = await response.json();

        console.log(order);

        alert("Order Placed Successfully!");

        localStorage.removeItem(cartKey);

       // window.location.href="order-success.html";
        window.location.href = "cart.html";

         console.log("After Fetch");

    }
    catch(error){

        console.error(error);

        alert("Server Error");

    }

}*/
const userId = localStorage.getItem("userId");

const cart = getCart();

const orderSummary =
    document.getElementById("orderSummary");

const totalAmountElement =
    document.getElementById("totalAmount");

let total = 0;


// ===============================
// DISPLAY ORDER SUMMARY
// ===============================

cart.forEach(item => {

    total += item.price * item.quantity;

    orderSummary.innerHTML += `

        <div class="d-flex justify-content-between mb-2">

            <span>
                ${item.name} x ${item.quantity}
            </span>

            <span>
                ₹${item.price * item.quantity}
            </span>

        </div>

    `;
});

totalAmountElement.innerText = total;


// ===============================
// PLACE ORDER
// ===============================

document
    .getElementById("checkoutForm")
    .addEventListener("submit", placeOrder);


async function placeOrder(e) {

    e.preventDefault();

    console.log("Place Order clicked");


    const cart = getCart();

    console.log("Cart:", cart);


    if (cart.length === 0) {

        alert("Cart is empty!");

        return;
    }


    const productQuantities = {};

    let totalAmount = 0;


    cart.forEach(item => {

        productQuantities[item.id] =
            item.quantity;

        totalAmount +=
            item.price * item.quantity;

    });


    const orderRequest = {

        productQuantities: productQuantities,

        totalAmount: totalAmount

    };


    const userId =
        localStorage.getItem("userId");

    const token =
        localStorage.getItem("token");


    console.log("User ID:", userId);

    console.log("Order Request:", orderRequest);


    try {

        const response = await fetch(
            `${BASE_URL}/orders/place/${userId}`,
            {

                method: "POST",

                headers: {

                    "Content-Type":
                        "application/json",

                    "Authorization":
                        "Bearer " + token

                },

                body:
                    JSON.stringify(orderRequest)

            }
        );


        if (!response.ok) {

            console.error(
                "Order failed:",
                response.status
            );

            alert("Unable to place order");

            return;
        }


        const order =
            await response.json();


        console.log(
            "Order created:",
            order
        );


        alert(
            "Order Placed Successfully!"
        );


        // Clear ONLY this user's cart
        localStorage.removeItem(
            getCartKey()
        );


        // Go to success page
        //window.location.href ="order-success.html";
         window.location.href = "index.html";


    }
    catch (error) {

        console.error(error);

        alert("Server Error");

    }

}