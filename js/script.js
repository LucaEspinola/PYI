
const vuelos = [
    {
        id: 1,
        nombre: "Berlin",
        imagen: "scripts/ubicaciones/Berlin.jpg",
        precio: 1200,
    },
    {
        id: 2,
        nombre: "Buenos Aires",
        imagen: "scripts/ubicaciones/Buenos Aires.jpeg",
        precio: 1100,
    },
    {
        id: 3,
        nombre: "Pekin",
        imagen: "scripts/ubicaciones/pekin.jpg",
        precio: 1255,
    },
    {
        id: 4,
        nombre: "Roma",
        imagen: "scripts/ubicaciones/roma.jpg",
        precio: 1390,
    },
    {
        id: 5,
        nombre: "Sidney",
        imagen: "scripts/ubicaciones/Sidney.jpg",
        precio: 1000,
    },
    {
        id: 6,
        nombre: "Tokio",
        imagen: "scripts/ubicaciones/Tokio.jpg",
        precio: 2000,
    }
];

const cart = document.getElementById("cart-panel");
const cartIcon = document.getElementById("cart-icon");
const closeCart = document.getElementById("close-cart");
const cartItems = document.getElementById("cart-items");
const cartCount = document.getElementById("cart-count");
const cartTotal = document.getElementById("cart-total-amount");
const clearCartBtn = document.getElementById("clear-cart");
const productContainer = document.getElementById("product-container");

let cartArray = [];

if (localStorage.getItem("cartItems")) {
    cartArray = JSON.parse(localStorage.getItem("cartItems"));
    updateCartUI();
}

function showProducts() {
    productContainer.innerHTML = "";
    vuelos.forEach((vuelo) => {
        const productCard = document.createElement("div");
        productCard.classList.add("product-card");

        const image = document.createElement("img");
        image.src = vuelo.imagen;

        const name = document.createElement("h3");
        name.textContent = vuelo.nombre;

        const price = document.createElement("p");
        price.textContent = `$${vuelo.precio}`;

        const buyButton = document.createElement("button");
        buyButton.textContent = "Comprar";
        buyButton.addEventListener("click", () => addToCart(vuelo));

        productCard.appendChild(image);
        productCard.appendChild(name);
        productCard.appendChild(price);
        productCard.appendChild(buyButton);

        productContainer.appendChild(productCard);
    });
}

function addToCart(product) {
    cartArray.push(product);
    saveCartToLocalStorage();
    updateCartUI();
}

function updateCartUI() {
    cartItems.innerHTML = "";
    cartCount.textContent = cartArray.length;

    let total = 0;

    cartArray.forEach((product) => {
        const cartItem = document.createElement("li");
        cartItem.classList.add("cart-item");

        const cartItemImg = document.createElement("img");
        cartItemImg.src = product.imagen;

        const cartItemInfo = document.createElement("div");

        const cartItemName = document.createElement("p");
        cartItemName.textContent = product.nombre;

        const cartItemPrice = document.createElement("p");
        cartItemPrice.textContent = `$${product.precio}`;

        cartItemInfo.appendChild(cartItemName);
        cartItemInfo.appendChild(cartItemPrice);

        const removeButton = document.createElement("button");
        removeButton.textContent = "Eliminar";
        removeButton.addEventListener("click", () => removeFromCart(product));

        cartItem.appendChild(cartItemImg);
        cartItem.appendChild(cartItemInfo);
        cartItem.appendChild(removeButton);

        cartItems.appendChild(cartItem);

        total += product.precio;
    });

    cartTotal.textContent = `$${total.toFixed(2)}`;
}

function removeFromCart(product) {
    const index = cartArray.findIndex((item) => item.id === product.id);
    if (index !== -1) {
        cartArray.splice(index, 1);
        saveCartToLocalStorage();
        updateCartUI();
    }
}

function clearCart() {
    cartArray = [];
    saveCartToLocalStorage();
    updateCartUI();
}

function saveCartToLocalStorage() {
    localStorage.setItem("cartItems", JSON.stringify(cartArray));
}

showProducts();

cartIcon.addEventListener("click", () => {
    cart.style.display = "block";
});

closeCart.addEventListener("click", () => {
    cart.style.display = "none";
});

clearCartBtn.addEventListener("click", () => {
    clearCart();
});
