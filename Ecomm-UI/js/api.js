const BASE_URL = "https://shopsy-backend-l7kc.onrender.com";


async function getProducts() {

    const token = localStorage.getItem("token");

    const response = await fetch(`${BASE_URL}/products`, {

        method: "GET",

        headers: {
            "Authorization": "Bearer " + token
        }

    });

    if (!response.ok) {

        console.error(
            "Failed to load products:",
            response.status
        );

        throw new Error("Unable to load products");

    }

    return await response.json();
}

async function loadProducts() {

    try {

        const token = localStorage.getItem("token");

        const response = await fetch(`${BASE_URL}/products`, {

            method: "GET",

            headers: {
                "Authorization": "Bearer " + token
            }

        });

        if (!response.ok) {
            console.error("Failed to load products:", response.status);
            return;
        }

        const products = await response.json();

        console.log(products);

        let trendingList =
            document.getElementById("trending-products");

        let clothingList =
            document.getElementById("clothing-products");

        let electronicsList =
            document.getElementById("electronics-products");

        trendingList.innerHTML = "";
        clothingList.innerHTML = "";
        electronicsList.innerHTML = "";

        products.forEach((product) => {

            let productCard = `
                <div class="col-lg-4 col-md-6">
                    <div class="card h-100">

                        <img
                            src="${product.imageUrl}"
                            class="card-img-top"
                            alt="${product.name}">

                        <div class="card-body d-flex flex-column">

                            <h5 class="card-title">
                                ${product.name}
                            </h5>

                            <p class="card-text">
                                ${product.description}
                            </p>

                            <p class="price">
                                <strong>₹${product.price}</strong>
                            </p>

                            <button
                                class="btn btn-primary mt-auto"
                                onclick="addToCart(
                                    ${product.id},
                                    '${product.name}',
                                    ${product.price},
                                    '${product.imageUrl}'
                                )">

                                Add to Cart

                            </button>

                        </div>

                    </div>
                </div>
            `;

            if (product.category === "Clothing") {

                clothingList.innerHTML += productCard;

            }
            else if (product.category === "Electronics") {

                electronicsList.innerHTML += productCard;

            }
            else if (product.category === "Gadgets") {

                trendingList.innerHTML += productCard;

            }

        });

    }
    catch (error) {

        console.log("Error fetching products:", error);

    }

}
async function loadClothing() {

    try {

        const token = localStorage.getItem("token");

        const response = await fetch(`${BASE_URL}/products`, {

            method: "GET",

            headers: {
                "Authorization": "Bearer " + token
            }

        });

        if (!response.ok) {

            console.error(
                "Failed to load clothing products:",
                response.status
            );

            return;
        }

        const products = await response.json();

        const clothingList =
            document.getElementById("clothing-products");

        if (!clothingList) {
            return;
        }

        clothingList.innerHTML = "";

        products.forEach(product => {

            if (product.category === "Collection") {

                const card = document.createElement("div");

                card.className =
                    "col-lg-4 col-md-6 mb-4";

                card.innerHTML = `

                    <div class="card h-100 shadow">

                        <img
                            src="${product.imageUrl}"
                            class="card-img-top"
                            style="height:250px; object-fit:cover;"
                            alt="${product.name}"
                        >

                        <div class="card-body d-flex flex-column">

                            <h5>
                                ${product.name}
                            </h5>

                            <p>
                                ${product.description}
                            </p>

                            <h4 class="text-success">
                                ₹${product.price}
                            </h4>

                            <button
                                class="btn btn-primary mt-auto add-cart-btn">

                                Add To Cart

                            </button>

                        </div>

                    </div>

                `;

                const button =
                    card.querySelector(".add-cart-btn");

                button.addEventListener("click", () => {

                    addToCart(
                        product.id,
                        product.name,
                        product.price,
                        product.imageUrl
                    );

                });

                clothingList.appendChild(card);

            }

        });

    }
    catch (error) {

        console.error(
            "Error loading clothing products:",
            error
        );

    }

}

async function loadAccessories() {

    try {

        /*const response = await fetch(`${BASE_URL}/products`);
        const products = await response.json();*/
        const products = await getProducts();

        let accessoriesList = document.getElementById("accessories-products");

        accessoriesList.innerHTML = "";

        products.forEach((product) => {

            if (product.category === "Tech Zone") {

                accessoriesList.innerHTML += `
                    <div class="col-lg-4 col-md-6 mb-4">
                        <div class="card h-100 shadow">

                            <img src="${product.imageUrl}"
                                 class="card-img-top"
                                 style="height:250px;object-fit:cover;">

                            <div class="card-body d-flex flex-column">

                                <h5>${product.name}</h5>

                                <p>${product.description}</p>

                                <h4 class="text-success">₹${product.price}</h4>

                                <button class="btn btn-primary mt-auto"
                                    onclick="addToCart(
                                        ${product.id},
                                        '${product.name}',
                                        ${product.price},
                                        '${product.imageUrl}'
                                    )">

                                    Add To Cart

                                </button>

                            </div>

                        </div>
                    </div>
                `;

            }

        });

    } catch (error) {

        console.error(error);

    }
}


async function loadWatches() {

    try {

        // const response = await fetch(`${BASE_URL}/products`);
        // const products = await response.json();
        const products = await getProducts();

        let watchesList = document.getElementById("watches-products");

        watchesList.innerHTML = "";

        products.forEach((product) => {

            if (product.category === "Watches") {

                watchesList.innerHTML += `
                    <div class="col-lg-4 col-md-6 mb-4">
                        <div class="card h-100 shadow">

                            <img src="${product.imageUrl}"
                                 class="card-img-top"
                                 style="height:250px;object-fit:cover;">

                            <div class="card-body d-flex flex-column">

                                <h5>${product.name}</h5>

                                <p>${product.description}</p>

                                <h4 class="text-success">₹${product.price}</h4>

                                <button class="btn btn-primary mt-auto"
                                    onclick="addToCart(
                                        ${product.id},
                                        '${product.name}',
                                        ${product.price},
                                        '${product.imageUrl}'
                                    )">

                                    Add To Cart

                                </button>

                            </div>

                        </div>
                    </div>
                `;

            }

        });

    } catch (error) {

        console.error(error);

    }
}


async function loadFootware() {

    try {

        // const response = await fetch(`${BASE_URL}/products`);
        //const products = await response.json();
        const products = await getProducts();

        let footwareList = document.getElementById("footware-products");

        footwareList.innerHTML = "";

        products.forEach((product) => { 

            if (product.category === "Footwear") {

                footwareList.innerHTML += `
                    <div class="col-lg-4 col-md-6 mb-4">
                        <div class="card h-100 shadow">

                            <img src="${product.imageUrl}"
                                 class="card-img-top"
                                 style="height:250px;object-fit:cover;">

                            <div class="card-body d-flex flex-column">

                                <h5>${product.name}</h5>

                                <p>${product.description}</p>

                                <h4 class="text-success">₹${product.price}</h4>

                                <button class="btn btn-primary mt-auto"
                                    onclick="addToCart(
                                        ${product.id},
                                        '${product.name}',
                                        ${product.price},
                                        '${product.imageUrl}'
                                    )">

                                    Add To Cart

                                </button>

                            </div>

                        </div>
                    </div>
                `;

            }

        });

    } catch (error) {

        console.error(error);

    }
}




async function loadTrendingProducts() {

    try {

        // const response = await fetch(`${BASE_URL}/products`);
        //const products = await response.json();
        const products = await getProducts();

        let trendingList = document.getElementById("trending-products");

        trendingList.innerHTML = "";

        products.forEach((product) => {

            if (product.category === "Trending") {

                trendingList.innerHTML += `
                    <div class="col-lg-4 col-md-6 mb-4">
                        <div class="card h-100 shadow">

                            <img src="${product.imageUrl}"
                                 class="card-img-top"
                                 style="height:250px;object-fit:cover;">

                            <div class="card-body d-flex flex-column">

                                <h5>${product.name}</h5>

                                <p>${product.description}</p>

                                <h4 class="text-success">₹${product.price}</h4>

                                <button class="btn btn-primary mt-auto"
                                    onclick="addToCart(
                                        ${product.id},
                                        '${product.name}',
                                        ${product.price},
                                        '${product.imageUrl}'
                                    )">

                                    Add To Cart

                                </button>

                            </div>

                        </div>
                    </div>
                `;

            }

        });

    } catch (error) {

        console.error(error);

    }
}