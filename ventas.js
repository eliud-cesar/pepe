// TODOS LOS ELEMENTOS PARA AÑADIR LOS DATOS DEL PRODUCTO A VENDER
const SaleForm = document.getElementById('sale-form')
const SaleDescription = document.getElementById('sale-description')
const SaleClasification = document.getElementById('sale-clasification')
const SaleDateTime = document.getElementById('sale-date_time')
const SaleName = document.getElementById('sale-name')
const SaleDateExpiry = document.getElementById('sale-date_expiry')
const SalePrice = document.getElementById('sale-price')
const SaleTotal = document.getElementById('sale-total')
const SaleMessaje = document.getElementById('sale-messaje')
const SaleButtonEnd = document.getElementById('sale-button_complete')

// VARIABLES
// los productos
let dataBase
// variable si existe el producto a vender
let TrueProduct = false
// el producto que se vendera en caso de que exista
let SaleProduct

// PETICION DE LA BASE DE DATOS
fetch('./base-de-datos.json')
    .then(res => res.json())
    .then(data => {
        dataBase = data
    })
    .catch(err => console.log(err))


// COMPROBACION DEL PRODUCTO CUNADO SE ESCRIBA EL CODIGO Y LAS EXISTENCIAS
SaleForm.addEventListener('change', () => {
    // los valores que se escribieron
    let SaleCode = SaleForm.sale_code.value
    let SaleQuantity = parseInt(SaleForm.sale_quantity.value)
    SaleMessaje.innerText = "Comprobando..."
    // se busca si existe el producto
    const response = dataBase.find(producto => producto.codigo === SaleCode )
    // despues de 800 milisegundos
    setTimeout(() => {
        // si no existe el procducto
        if(!response) {
            SaleMessaje.innerText = "Este producto no existe"
            SaleMessaje.style.color = 'red'
            SaleDescription.innerText = ""
            SaleClasification.innerText = ""
            SaleDateTime.innerText = ""
            SaleName.innerText = ""
            SaleDateExpiry.innerText = ""
            SalePrice.innerText = ""
            SaleTotal.innerText = ""
            TrueProduct = false
            
        // si las cantidad a vender es cero
        } else if(SaleQuantity === 0) {
            SaleMessaje.innerText = "¿Vas a vender o que?"
            SaleMessaje.style.color = 'red'
            SaleTotal.innerText = ""
            TrueProduct = false
            
        // si se quiere vender mas de lo que se tiene
        } else if(SaleQuantity > parseInt(response.existencias)) {
            SaleMessaje.innerText = "No puedes vender mas de lo que no tienes"
            SaleMessaje.style.color = 'red'
            SaleTotal.innerText = ""
            TrueProduct = false
            
        // si todo esta bien
        } else if(response) {
            SaleMessaje.innerText = "Puedes vender"
            SaleMessaje.style.color = 'green'
            // se muestran lo datos
            SaleDescription.innerText = response.descripccion
            SaleClasification.innerText = "Clasificacion: " + response.clasificacion
            SaleDateTime.innerText = "Hora: " + Date()
            SaleName.innerText = response.nombre
            SaleDateExpiry.innerText = "Fecha de caducidad: " + response.fechaCaducidad
            SalePrice.innerText = "Precio unitario: $" + response.precioVenta
            SaleTotal.innerText = "Total: $" + SaleQuantity * response.precioVenta
            TrueProduct = true
            SaleProduct = response
        }
    }, 800)
})

// CUANDO SE LE DE CLICK AL BOTON
SaleButtonEnd.addEventListener('click', () => {
    // si existe el producto
    if(TrueProduct === true) {
        let SaleResultProduct = parseInt(SaleProduct.existencias) - parseInt(SaleForm.sale_quantity.value)
        SaleProduct.existencias = SaleResultProduct
        alert(`Has vendido: ${SaleForm.sale_quantity.value} ${SaleProduct.nombre}. Te queda(n) ${SaleResultProduct} en stock`)
    } else {
        alert('Corrige el error antes de vender')
    }
})
