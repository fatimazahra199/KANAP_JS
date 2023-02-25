// const geti = JSON.parse(localStorage.getItem('cart'))
// fetch(`http://localhost:3000/api/products/${geti.id}`)
// .then(res=>res.json())
// .then(products=>{
//     const divBody = document.querySelector('#cart__items');
//     divBody.innerHTML = Object.values(products).map(item=>{
//         return `
//         <article class="cart__item" data-id="${item._id}" data-color="${id.color}">
//         <div class="cart__item__img">
//           <img src="${item.imageUrl}" alt="Photographie d'un canapé">
//         </div>
//         <div class="cart__item__content">
//           <div class="cart__item__content__description">
//             <h2>${item.name}</h2>
//             <p>${geti.color}</p>
//             <p>${item.price}€</p>
//           </div>
//           <div class="cart__item__content__settings">
//             <div class="cart__item__content__settings__quantity">
//               <p>Qté :${geti.quantity} </p>
//               <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="42">
//             </div>
//             <div class="cart__item__content__settings__delete">
//               <p class="deleteItem">Supprimer</p>
//             </div>
//           </div>
//         </div>
//       </article>
//         `
//     }).join(' ');
    
// })
// function add_items(products) {

//     divBody.innerHTML = cart.items.forEach(item => {
//     // access the properties of the item object
//     console.log(item.id, item.quantity, item.color);
//     // create and insert HTML elements for the item in the cart page

// const item_img = document.querySelector('.cart__item__img')
// console.log(item_img)

// const item_desc = document.querySelector('.cart__item__content__description')
// console.log(item_desc)
// const item_qte = document.querySelector('.cart__item__content__settings__quantity')
// item_qte.textContent = item.quantity;
// console.log(item_qte)

const cart = JSON.parse(localStorage.getItem('cart')) || { items: [] };
const divBody = document.querySelector('#cart__items');

// iterate over each item in the cart and create the HTML for it
cart.items.forEach(item => {
  fetch(`http://localhost:3000/api/products/${item.id}`)
    .then(res => res.json())
    .then(product => {
      const html = `
        <article class="cart__item" data-id="${item.id}" data-color="${item.color}">
          <div class="cart__item__img">
            <img src="${product.imageUrl}" alt="${product.altTxt}">
          </div>
          <div class="cart__item__content">
            <div class="cart__item__content__description">
              <h2>${product.name}</h2>
              <p>${item.color}</p>
              <p>${product.price}€</p>
            </div>
            <div class="cart__item__content__settings">
              <div class="cart__item__content__settings__quantity">
                <p>Qté : ${item.quantity}</p>
                <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${item.quantity}">
              </div>
              <div class="cart__item__content__settings__delete">
                <p class="deleteItem">Supprimer</p>
              </div>
            </div>
          </div>
        </article>
      `;
      
      // add the HTML to the shopping cart page
      divBody.insertAdjacentHTML('beforeend', html);
    });
});

  