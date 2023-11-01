const productsContainer = document.querySelector('.product-container');
const showMore = document.querySelector(".btn-show");
const categoriesContainer = document.querySelector (".categories")
const categoriesList = document.querySelectorAll(".category")
const cartBtn = document.querySelector (".cart-label")
const cartMenu = document.querySelector (".cart")
const productsCart = document.querySelector (".cart-container")
const total = document.querySelector (".total")
const succesModal = document.querySelector (".add-modal")



const createProductTemplate = (product) => {
    const {id, nombre, precio, imagen} = product;
    return `
    <div class= "product">
        <img src=${imagen} alt= ${nombre} />
        <div class="product-info">
            <div class= "product-top">
                <h3>${nombre}</h3>
            </div>

            <div class= "product-bot">
                <span>$${precio}</span>
                <button class="btn-add"
                data-id="${id}"
                data-name="${nombre}"
                data-price="${precio}"
                data-img="${imagen}">Reservar</button>
            </div>
        </div>
    </div>

    
    `;
}

const isLastIndexOf = () =>{
    return appState.currentProductsIndex === appState.productsLimit 
    -1
}

const showMoreProducts = () =>{
    appState.currentProductsIndex += 1;
    let {products, currentProductsIndex} = appState;
    renderProducts(products[currentProductsIndex])
    if(isLastIndexOf()){
        showMore.classList.add("hidden")
    }
    
}

const renderProducts = (productList) => {
    productsContainer.innerHTML += productList
    .map(createProductTemplate)
    .join("");
}

const applyFilter = ({target}) => {
    if(!isInactiveFilter(target)) return;
    changeFilterState(target)
    productsContainer.innerHTML = ""
    if(appState.activeFilter){
        renderFilterProducts();
        appState.currentProductsIndex = 0;
        return; 
    }
    renderProducts(appState.products[0]);
}

const renderFilterProducts = () => {
    const filteredProducts = productsData.filter(
        (product) => product.category === appState.activeFilter
    );
    renderProducts (filteredProducts);
}
const isInactiveFilter = (eLement) => {
    return (
        eLement.classList.contains("category") &&
        !eLement.classList.contains("active")
    )
}

const changeFilterState = (btn) =>{
    appState.activeFilter = btn.dataset.category;
    changeBtnActiveState(appState.activeFilter)

}

const changeBtnActiveState = (selectedCategory) => {
    const categories = [...categoriesList]
    categories.forEach((categoryBtn) => {
        if(categoryBtn.dataset.category !== selectedCategory){
            categoryBtn.classList.remove ("remove");
            return;
        }
        categoryBtn.classList.add("active")
    })
}

const setShowMoreVisibility = () => {
    if (!appState.activeFilter){
        showMore.classList.remove("hidden");
        return;
    }
    showMore.classList.add("hidden")
}

const toggleCart = () =>{
    cartMenu.classList.toggle("open-cart")
} 

let cart = JSON.parse(localStorage.getItem("cart")) || [];

const saveCart = () => {
    localStorage.setItem("cart", JSON.stringify (cart));
};


const renderCart = () => {
    if(!cart.length){
        productsCart.innerHTML = `
        <p class= "empty-msg">Aun no has reservado un vuelo</p>
        `;
        return;
    }
    productsCart.innerHTML = cart.map(createCartProduct).join("");
}

const createCartProduct = (cartProduct) => {
    const {id, nombre, imagen, precio, quantity} = cartProduct;
    return `
    <div class="cart-item">
        <img src="${imagen}" alt="${nombre} />
        <div class="item-info">
            <h3 class="item-title">${nombre}</h3>
            <span class="item-price">$${precio}</span>
        </div>
        <div class="item-handler">
            <span class="quantity-handler down" data-id=${id}>-</span>
            <span class="item-quantity">${quantity}</span>
            <span class="quantity-handler up" data-id=${id}>+</span>
        </div>
    </div>
    `;
};

const showCartTotal = () => {
    total.innerHTML =  `${getTotal()} Dlls `
}

const getTotal = () => {
    return cart.reduce((acc, cur) => acc + Number(cur.precio) * cur.quantity, 0)
}

const addProduct = (e) =>{
    if(!e.target.classList.contains("btn-add")) {return};
    const product = createProductData(e.target.dataset)
    if(isExistingProduct(product)){
        addUnit(product);
        showSuccesModal("Se ha reservado el vuelo");
    } else {
        createCartProduct(product)
        showSuccesModal("El vuelo se agrego al carrito")
    };

};

const createProductData = (product) => {
    const {id, nombre, precio, imagen} = product
    return {id, nombre, precio, imagen};
}

const isExistingProduct = (product) => {
    return cart.find((item) => item.id === product.id)
};

const addUnit = (product) =>{
    cart = cart.map((cartProduct) =>
    cartProduct.id === product.id
    ? {...cartProduct, quantity: cartProduct.quantity +1}
    :cartProduct
    )
}


const showSuccesModal = (msg) => {
    succesModal.classList.add("active-modal");
    succesModal.textContent = msg;
    setTimeout(() =>{
        succesModal.classList.remove("active-modal")
    }, 1500);
};

const createCardProduct = (product) => {
    cart = [...cart, {...product, quantity: 1}]
};


const updateCartState = () => {
    saveCart();
    renderCart();
    showCartTotal();
}

const init = () => {
    renderProducts(appState.products[0])
    showMore.addEventListener("click", showMoreProducts)
    categoriesContainer.addEventListener("click", applyFilter)
    cartBtn.addEventListener("click", toggleCart)
    document.addEventListener("DOMContentLoaded", renderCart)
    document.addEventListener("DOMContentLoaded", showCartTotal)
    productsContainer.addEventListener("click", addProduct)
};

init();