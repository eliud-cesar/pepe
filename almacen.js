// LOS ELEMENTOS DE LOS DETALLES DEL PRODUCTO
const Productsname = document.getElementById('products-name')
const codeProduct = document.getElementById('code-product')
const description = document.getElementById('description')
const clasification = document.getElementById('clasification')
const stock = document.getElementById('stock')
const dateBuy = document.getElementById('date-buy')
const dateExpiry = document.getElementById('date-expiry')
const priceBuy = document.getElementById('price-buy')
const priceSale = document.getElementById('price-sale')

// LISTANDO LOS NOMBRES DEL PRODUCTOS
const forData = (array) => {
    array.forEach(data => {
        const htmlProduct = `<p id="${data.codigo}" >${data.nombre}</p>`
        Productsname.insertAdjacentHTML('beforeend', htmlProduct)
    })
}

// FUNCION: MOSTRAR LOS DEMAS DATOS CUANDO SE DE CLICK EN EL NOMBRE DEL PRODUCTO
const ViewDetailsProduct = (array, id) => {
    const response = array.find(producto => producto.codigo === id )
    
    codeProduct.innerText = response.codigo
    description.innerText = response.descripccion
    clasification.innerText = response.clasificacion
    stock.innerText = response.existencias
    dateBuy.innerText = response.fechaCompra
    dateExpiry.innerText = response.fechaCaducidad
    priceBuy.innerText = response.precioCompra
    priceSale.innerText = response.precioVenta
}

// FUNCION: OBTENGO LOS NOMBRES DE LOS PRODUCTOS PARA LLAMAR A LA FUNCION (ViewDetailsProducts)
const DeatilsProducts = data => {
    document.getElementById('cola500').addEventListener('click', () => ViewDetailsProduct(data, "cola500"))
    document.getElementById('pepsi400').addEventListener('click', () => ViewDetailsProduct(data, "pepsi400"))
    document.getElementById('sabritado').addEventListener('click', () => ViewDetailsProduct(data, "sabritado"))
    document.getElementById('chilessanm').addEventListener('click', () => ViewDetailsProduct(data, "chilessanm"))
    document.getElementById('panbimbo').addEventListener('click', () => ViewDetailsProduct(data, "panbimbo"))
    document.getElementById('sardinas').addEventListener('click', () => ViewDetailsProduct(data, "sardinas"))
    document.getElementById('bonafon600').addEventListener('click', () => ViewDetailsProduct(data, "bonafon600"))
    document.getElementById('coca175').addEventListener('click', () => ViewDetailsProduct(data, "coca175"))
    document.getElementById('takisfuego').addEventListener('click', () => ViewDetailsProduct(data, "takisfuego"))
    document.getElementById('garrafongua').addEventListener('click', () => ViewDetailsProduct(data, "garrafongua"))
}


// CONSULTAR LA BASE DE DATOS
fetch('./base-de-datos.json')
    .then(res => res.json())
    .then(data => {
        let dataBase = data
        forData(dataBase)
        DeatilsProducts(dataBase)
    })
    .catch(err => console.log(err))
