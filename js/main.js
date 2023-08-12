let cart = document.querySelector('.cart')
let overlay = document.querySelector('.overlay')
let cartContent = document.querySelector('.cart_content')

let products = document.querySelectorAll('.products>.row>.item')
let productImg = document.querySelectorAll('.item>img')
let productName = document.querySelectorAll('.item>.name')
let productPrice = document.querySelectorAll('.item>.price')

let checkout = document.querySelector('ul.checkout')

let checkoutList = JSON.parse(localStorage.getItem('checkoutList'))?JSON.parse(localStorage.getItem('checkoutList')):[]

let totalPrice = localStorage.getItem('totalPrice') ? localStorage.getItem('totalPrice') : 0

overlay.addEventListener('click', () => {
  cartContent.classList.toggle('active')
  overlay.classList.toggle('active')
})

cart.addEventListener('click', () => {
  cartContent.classList.toggle('active')
  document.querySelector('.product_bar').style.boxShadow='none'
  overlay.classList.toggle('active')
})

products.forEach((item,index) => {
  function showCheckout() {
    checkout.innerHTML = ''
    checkoutList.forEach((datas,id) => {
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
    });
  }


  let checkoutPrice = document.querySelector('.total_price>.tprice')
  item.addEventListener('click', (e) => {
    e.stopPropagation()
    if (e.target.tagName === "BUTTON") {
      checkoutList.push({
        name: productName[index].innerHTML,
        price: +productPrice[index].innerHTML.replace(' USD',''),
        image: productImg[index].getAttribute('src')
      })

      localStorage.setItem('totalPrice',+(totalPrice += (productPrice[index].innerHTML.replace(' USD',''))*1)) 
      localStorage.setItem('checkoutList', JSON.stringify(checkoutList))
      showCheckout()
      checkoutPrice.innerHTML = `${localStorage.getItem('totalPrice')} USD`
    }
  })
  checkoutPrice.innerHTML = `${localStorage.getItem('totalPrice')} USD`
  return showCheckout(),checkoutPrice
})


function removeItem(id) {
  let checkoutItem = document.querySelectorAll('ul.checkout>li')
  if (id !== checkoutItem[id]) {
    checkoutList.splice(id, 1)
    totalPrice -= (+productPrice[id].innerHTML.replace(' USD', ''))
    localStorage.setItem('totalPrice', totalPrice)
    localStorage.setItem('checkoutList', JSON.stringify(checkoutList))
    console.log(checkoutList);
    console.log(totalPrice);
  }
}