/*function getCartKey() {

    const userId = localStorage.getItem("userId");

    return "cart_" + userId;
}

let cart = [];


function loadCart()
{
    let cart = JSON.parse(localStorage.getItem(getCartKey())) || [];
    let cartItems = document.getElementById("cart-items");
    let totalAmount=0;
    cartItems.innerHTML="";

    cart.forEach((item,index) => {
        let itemTotal=item.price * item.quantity;
        totalAmount+=itemTotal;

        cartItems.innerHTML +=`

            <tr>
                <td><img src="${item.imageUrl}" width="50"></td>
                <td>${item.name}</td>
                <td>${item.price}</td>
                <td>
                    <button class="btn btn-sm btn-secondary" onclick="changeQuantity(${index},-1)">-</button>
                    ${item.quantity}
                    <button class="btn btn-sm btn-secondary" onclick="changeQuantity(${index},1)">+</button>
                </td>
                <td>₹ ${itemTotal}</td>
              
                <td><button class="btn btn-danger btn-sm" onclick="removeFromCart(${index})">X</button></td>
            </tr>
        `;
    });
    document.getElementById("total-amount").innerText=totalAmount;
}

/*
function addToCart(id,name,price,imageUrl)
{
    console.log("Adding product to cart:",id,name,price,imageUrl);

    price=parseFloat(price);
    let itemIndex=cart.findIndex((item) => item.id===id)
    if(itemIndex!==-1)
    {
        cart[itemIndex].quantity+=1;
    }
    else{
        cart.push({
            id:id,  // for easy tracking
            name: name,
            price: price,
            imageUrl:imageUrl,
            quantity:1
        });      
    }
    //localStorage.setItem("cart",JSON.stringify(cart));
    localStorage.setItem(getCartKey(), JSON.stringify(cart));
    updateCartCounter();
    
}*/
/*
function addToCart(id, name, price, imageUrl) {

    console.log(
        "Adding product to cart:",
        id,
        name,
        price,
        imageUrl
    );

    price = parseFloat(price);

    let cart =
        JSON.parse(localStorage.getItem(getCartKey())) || [];

    let itemIndex =
        cart.findIndex(item => item.id === id);

    if (itemIndex !== -1) {

        cart[itemIndex].quantity += 1;

    } else {

        cart.push({

            id: id,
            name: name,
            price: price,
            imageUrl: imageUrl,
            quantity: 1

        });

    }

    localStorage.setItem(
        getCartKey(),
        JSON.stringify(cart)
    );

    updateCartCounter();

}


function updateCartCounter() {

    const cartKey = getCartKey();

    const cart =
        JSON.parse(localStorage.getItem(cartKey)) || [];

    const totalQuantity = cart.reduce(
        (total, item) => total + item.quantity,
        0
    );

    const badge =
        document.querySelector(".cart-badge");

    if (badge) {
        badge.innerText = totalQuantity;
    }
}

function changeQuantity(index,change)
{
    let cart= JSON.parse(localStorage.getItem(getCartKey())) || [];
    cart[index].quantity+=change;
    if(cart[index].quantity<=0) cart.splice(index,1);
    localStorage.setItem(getCartKey(),JSON.stringify(cart));
    loadCart();
    updateCartCounter();
}

function removeFromCart(index)
{
    let cart= JSON.parse(localStorage.getItem(getCartKey())) || [];
    cart.splice(index,1);
    localStorage.setItem(getCartKey(),JSON.stringify(cart));
    loadCart();
    updateCartCounter();
}


//document.addEventListener("DOMContentLoaded",loadCart);
document.addEventListener("DOMContentLoaded", () => {

    if(document.getElementById("cart-items")){
        loadCart();
    }

});

function goToCheckout() {
    window.location.href = "checkout.html";
}*/
function getCartKey() {
    const userId = localStorage.getItem("userId");

    if (!userId) {
        return "cart_guest";
    }

    return "cart_" + userId;
}


function getCart() {
    return JSON.parse(localStorage.getItem(getCartKey())) || [];
}


function saveCart(cart) {
    localStorage.setItem(getCartKey(), JSON.stringify(cart));
}


function addToCart(id, name, price, imageUrl) {

    console.log("Adding product:", id, name);

    let cart = getCart();

    price = parseFloat(price);

    const existingItem = cart.find(item => item.id === id);

    if (existingItem) {

        existingItem.quantity += 1;

    } else {

        cart.push({
            id: id,
            name: name,
            price: price,
            imageUrl: imageUrl,
            quantity: 1
        });

    }

    saveCart(cart);

    updateCartCounter();

    alert("Product added to cart!");
}


function updateCartCounter() {

    const cart = getCart();

    const badge = document.querySelector(".cart-badge");

    if (badge) {

        badge.innerText = cart.length;

    }
}


function loadCart() {

    const cart = getCart();

    const cartItems = document.getElementById("cart-items");

    if (!cartItems) {
        return;
    }

    let totalAmount = 0;

    cartItems.innerHTML = "";

    cart.forEach((item, index) => {

        const itemTotal = item.price * item.quantity;

        totalAmount += itemTotal;

        cartItems.innerHTML += `
            <tr>

                <td>
                    <img src="${item.imageUrl}" width="50">
                </td>

                <td>${item.name}</td>

                <td>₹${item.price}</td>

                <td>

                    <button
                        class="btn btn-sm btn-secondary"
                        onclick="changeQuantity(${index}, -1)">
                        -
                    </button>

                    ${item.quantity}

                    <button
                        class="btn btn-sm btn-secondary"
                        onclick="changeQuantity(${index}, 1)">
                        +
                    </button>

                </td>

                <td>
                    ₹${itemTotal}
                </td>

                <td>

                    <button
                        class="btn btn-danger btn-sm"
                        onclick="removeFromCart(${index})">
                        X
                    </button>

                </td>

            </tr>
        `;
    });

    document.getElementById("total-amount").innerText = totalAmount;
}


function changeQuantity(index, change) {

    let cart = getCart();

    if (!cart[index]) {
        return;
    }

    cart[index].quantity += change;

    if (cart[index].quantity <= 0) {

        cart.splice(index, 1);

    }

    saveCart(cart);

    loadCart();

    updateCartCounter();
}


function removeFromCart(index) {

    let cart = getCart();

    cart.splice(index, 1);

    saveCart(cart);

    loadCart();

    updateCartCounter();
}


function goToCheckout() {

    const cart = getCart();

    if (cart.length === 0) {

        alert("Your cart is empty!");

        return;
    }

    window.location.href = "checkout.html";
}


document.addEventListener("DOMContentLoaded", () => {

    updateCartCounter();

    if (document.getElementById("cart-items")) {

        loadCart();

    }

});