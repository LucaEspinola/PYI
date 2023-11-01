
const productsData = [
    {
        id: 1,
        nombre: "Berlin 🇩🇪",
        imagen: "scripts/ubicaciones/Berlin.jpg",
        precio: 1200,
        category: "Europa",
    },
    {
        id: 2,
        nombre: "Buenos Aires 🇦🇷",
        imagen: "scripts/ubicaciones/Buenosaires.jpeg",
        precio: 1100,
        category: "America",
    },
    {
        id: 3,
        nombre: "Pekin 🇨🇳",
        imagen: "scripts/ubicaciones/pekin.jpg",
        precio: 1255,
        category: "Asia",
    },
    {
        id: 4,
        nombre: "Roma 🇮🇹",
        imagen: "scripts/ubicaciones/roma.jpg",
        precio: 1390,
        category: "Europa",
    },
    {
        id: 5,
        nombre: "Sidney 🇿🇦",
        imagen: "scripts/ubicaciones/Sidney.jpg",
        precio: 1000,
        category: "Oceania",
    },
    {
        id: 6,
        nombre: "New York 🇺🇸",
        imagen: "scripts/ubicaciones/newyork.jpg",
        precio: 2500,
        category: "America",
    },
    {   
        id: 7,
        nombre: "Seúl 🇰🇷",
        imagen: "scripts/ubicaciones/Seul.jpg",
        precio: 2050,
        category: "Asia",
    },
    {
        id: 8,
        nombre: "Wellington 🇳🇿",
        imagen: "scripts/ubicaciones/Wellington.jpg",
        precio: 5000,
        category:"Oceania",
    },
    {
        id: 9,
        nombre: "Lima 🇵🇪",
        imagen: "scripts/ubicaciones/Lima.jpg",
        precio: 3000,
        category:"America",
    },
];



const divideProductsInParts = (size) =>{
    let productsList = [];
    for( let i = 0; i < productsData.length; i += size)
    productsList.push(productsData.slice (i, i + size))
return productsList;
}

const appState = {
    products: divideProductsInParts(3),
    currentProductsIndex: 0,
    productsLimit: divideProductsInParts(3).length,
    activeFilter: null
}

