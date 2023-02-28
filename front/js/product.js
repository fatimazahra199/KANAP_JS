const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get('id');
console.log(productId)
let products;

fetch(`http://localhost:3000/api/products/${productId}`)
    .then(response => response.json()) // Read the response as text
    .then(products => {
        add_items(products)
    })

const colors = document.querySelector('#colors')

function add_items(products) {


    let items = document.querySelector(".item__img")
    let logo_img = document.createElement("img")
    logo_img.src = products.imageUrl
    logo_img.alt = products.altTxt
    items.appendChild(logo_img)


    let title = document.getElementById('title')
    title.innerHTML = products.name

    let price = document.getElementById('price')
    price.innerHTML = products.price

    let description = document.getElementById('description')
    description.innerHTML = products.description


    for (let i = 0; i < products.colors.length; i++) {
        const option = document.createElement('option')
        colors.appendChild(option)
        option.innerHTML = products.colors[i]
    }




}

const cart = JSON.parse(localStorage.getItem('cart')) || { items: [] };
const btn = document.getElementById('addToCart')


btn.addEventListener('click', (e) => {
    let quantity = parseInt(document.getElementById('quantity').value);
    console.log(quantity)
    let color = document.getElementById('colors').value;
    console.log(color)
    // let price =  document.getElementById('price')
    // console.log(price)
    if (!colors.value || quantity == 0) {
        return alert('please fill quantity and option fields')
    }
    // else {
    //     return alert("your product is in the cart")
    // }
    const priceElement = document.getElementById("price");
    const price = parseInt(priceElement.textContent);
    console.log(price);


    let cart_item = null;
    for (let i = 0; i < cart.items.length; i++) {
        if (cart.items[i].id === productId) {
            cart_item = cart.items[i];
            break;
        }
    }

    // if the product exists, update the quantity and color fields
    if (cart_item) {
        cart_item.quantity += quantity;
        cart_item.color = color;
    }
    // otherwise, create a new cart item object and add it to the items array
    else {
        let new_cart_item = {
          id: productId,
          quantity: quantity,
          color: color,
          price: price
        };
        cart.items.push(new_cart_item);
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    console.log(cart)
})
