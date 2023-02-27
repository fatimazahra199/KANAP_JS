const cart = JSON.parse(localStorage.getItem('cart')) || { items: [] };
const divBody = document.querySelector('#cart__items');
let d = 1
let f = 0


// iterate over each item in the cart and create the HTML for it
cart.items.forEach((item) =>{
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
              `
      // add the HTML to the shopping cart page
      divBody.insertAdjacentHTML('beforeend', html);
      d +=  product.price*item.quantity
      totalQte.innerHTML = d
      f +=product.price
    }
    )
})
//console.log(d)
  //const getTotal=()=>{
  //   const data = Object.values(product)
  //   const current_price = localStorage.getItem('price') || []
  //   console.log(current_price)
  //   const filter = data.filter(Number)
  //   d.push(current_price)
  //   localStorage.setItem('price',JSON.stringify())
  //   const rre = filter.reduce((acc,val)=>{
  //     acc += val,0
  //   })
  //   return filter
  //   // Object.values(product).forEach(c=>{
  //   //   console.log('prod',c)
  //   // })
  //   // Object.values(product).reduce((acc,val)=>{acc+=product.price*item.quantity,0 
  //   //   console.log(val)
  //   //   }
  //   // ),[];
  //   // Object.values(product).map(
  //   //   (product) =>{
  //   //   console.log(product)
  //   //   // console.log(product.price)
  //   //   // console.log(item.quantity)
  //   //     total += parseInt(product.price) * parseInt(item.quantity)
  //   //   }
  //   // );
  // // return total;
  //}

  const totalQte = document.querySelector('#totalPrice')