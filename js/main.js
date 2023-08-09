let cart = document.querySelector('.cart')
let overlay = document.querySelector('.overlay')
let cartContent = document.querySelector('.cart_content')

let products = document.querySelectorAll('.products>.row>.item')
let productImg = document.querySelectorAll('.item>img')
let productName = document.querySelectorAll('.item>.name')
let productPrice = document.querySelectorAll('.item>.price')

let checkout = document.querySelector('ul.checkout')

let checkoutList = JSON.parse(localStorage.getItem('checkoutList'))?JSON.parse(localStorage.getItem('checkoutList')):[]


overlay.addEventListener('click', () => {
  cartContent.classList.toggle('active')
  overlay.classList.toggle('active')
})
cart.addEventListener('click', () => {
  cartContent.classList.toggle('active')
  document.querySelector('.product_bar').style.boxShadow='none'
  overlay.classList.toggle('active')
})
let totalPrice = 0
function showCheckout(id) {
  checkoutList.forEach(datas => {
    checkout.innerHTML += `
      <li>
        <img
          src="${datas.image}" alt="">
        <div class="data">
          <div class="name">${datas.name}</div>
          <div class="price">${datas.price}</div>
        </div>
        <div onclick="removeItem(${id})" class="remove"><i class="fi fi-br-minus"></i></div>
      </li>
    `
    return totalPrice += datas.price
  });
}
function removeItem() {
  let checkoutItem = document.querySelectorAll('ul.checkout>li')
  checkoutItem.forEach(element => {
    element.addEventListener('click', () => {
      element.remove()
    })
  })
}
products.forEach((item,id) => {
  let checkoutPrice = document.querySelector('.total_price>.tprice')
  item.addEventListener('click', (e) => {
    e.stopPropagation()
    if (e.target.tagName === "BUTTON") {
      checkoutList.push({
        name: productName[id].innerHTML,
        price: +productPrice[id].innerHTML.replace(' USD',''),
        image: productImg[id].getAttribute('src')
      })
      localStorage.setItem('checkoutList',JSON.stringify(checkoutList))
      showCheckout(id)
      console.log(totalPrice);
    }
    checkoutPrice.innerHTML = `${totalPrice} USD`
  })
})

showCheckout() 