let cart = document.querySelector('.cart')
let overlay = document.querySelector('.overlay')
let cartContent = document.querySelector('.cart_content')


let checkout = document.querySelector('ul.checkout')

let tPrice = document.querySelector('.total_price>span.tprice')

let checkoutList = JSON.parse(localStorage.getItem('checkoutList')) ? JSON.parse(localStorage.getItem('checkoutList')) : []

let totalPrice = JSON.parse(localStorage.getItem('totalPrice')) ? JSON.parse(localStorage.getItem('totalPrice')) : 0


function showCheckout() {
  checkout.innerHTML = ''
  checkoutList.forEach((datas, id) => {
    checkout.innerHTML += `
    <li>
      <img src="${datas.image}" alt="">
      <div class="data">
        <div class="name">${datas.name}</div>
        <div class="price">${datas.price}</div>
      </div>
      <div onclick="removeItem(${id})" class="remove"><i class="fi fi-br-minus"></i></div>
    </li>`
    tPrice.innerHTML = totalPrice + ' USD'
  });
}
showCheckout()

function addToCart(id) {
  let productImg = document.querySelectorAll('.item>img')
  let productName = document.querySelectorAll('.item>.name')
  let productPrice = document.querySelectorAll('.item>.price')
  checkoutList.push({
    name: productName[id].innerHTML,
    price: +productPrice[id].innerHTML.replace(' USD', ''),
    image: productImg[id].getAttribute('src')
  })
  localStorage.setItem('checkoutList', JSON.stringify(checkoutList))
  totalPrice += +productPrice[id].innerHTML.replace(' USD', '') 
  localStorage.setItem('totalPrice', JSON.stringify(totalPrice))
  tPrice.innerHTML = totalPrice + ' USD'
  music.play()
  showCheckout()
}
let products = document.querySelectorAll('.products>.row>.item')


function removeItem(id) {
  totalPrice -= checkoutList[id].price
  localStorage.setItem('totalPrice', JSON.stringify(totalPrice))
  tPrice.innerHTML = totalPrice + ' USD'
  checkoutList.splice(id, 1)
  localStorage.setItem('checkoutList', JSON.stringify(checkoutList))
  showCheckout()
}

overlay.addEventListener('click', (e) => {
  e.stopPropagation()
  // cartContent.classList.toggle('active')
  overlay.classList.toggle('modal')
  // overlay.classList.toggle('active')
})

cart.addEventListener('click', () => {
  cartContent.classList.toggle('active')
  document.querySelector('.product_bar').style.boxShadow = 'none'
  overlay.classList.toggle('active')
})


let addProduct = document.querySelector('.add')
let music = document.querySelector('.bg_audio')
addProduct.addEventListener('click', () => {
  document.body.classList.toggle('hidden')
  overlay.classList.remove('active')
  overlay.classList.toggle('modal')
})

let modalContent = document.querySelector('.modal_content')
modalContent.addEventListener('click', (e) => {
  e.stopPropagation()
})

function showProduct() {
  productList.forEach((product, id) => {
    productContent.innerHTML += `
    <div class="item">
      <img
        src="${product.newImg}">
      <div class="name">${product.title}</div>
      <div class="price">${product.price}</div>
      <button onclick='addToCart(${id})'>savatchaga qo'shish</button>
    </div>`
  });
}

// Add Product

let productList = JSON.parse(localStorage.getItem('productList')) ? JSON.parse(localStorage.getItem('productList')) : []

let productContent = document.querySelector('.products>.row')

let addProductImage = document.querySelector('.productImage')
let addProductName = document.querySelector('.productName')
let addProductPrice = document.querySelector('.productPrice')
let addProductBtn = document.querySelector('.addProductInfo')


addProductBtn.addEventListener('click', () => {
  productList.push({
    newImg: addProductImage.value,
    title: addProductName.value,
    price: +addProductPrice.value
  })
  localStorage.setItem('productList', JSON.stringify(productList))
  showProduct()
})
showProduct()