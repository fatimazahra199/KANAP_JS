const cart = JSON.parse(localStorage.getItem("cart")) || { items: [] };
const divBody = document.querySelector("#cart__items");
const totalQte = document.querySelector("#totalPrice");
let total = 0;

// iterate over each item in the cart and create the HTML for it
cart.items.forEach((item) => {

  fetch(`http://localhost:3000/api/products/${item.id}`)
    .then((res) => res.json())
    .then((product) => {

      add_to_cart(product,item)
      // // add event listener to quantity input element
      // const quantityInput = document.getElementById(item.id);
      // console.log(quantityInput);
      // // let pr = quantityInput.dataset.price
      // // console.log('mypr',pr)
      // quantityInput.addEventListener("input", (e) => {
      //   const newQuantity = parseInt(quantityInput.value);
      //   // console.log("my new", newQuantity);
      //   item.quantity = newQuantity;
      //   // let price = e.target.dataset.price
      //   // console.log('my price',price)
      //   total = cart.items.reduce((acc, curr) => {

      //     console.log('currqte',curr.quantity);
      //     // console.log('currpri',curr.price);
      //     return (acc += curr.quantity * curr.price);
      //   }, 0);
      //   console.log(total)
      //   totalQte.innerHTML = total;
      //   localStorage.setItem("cart", JSON.stringify(cart));
      //   console.log(cart)
      // });

      // const removeCart = document.querySelectorAll(".deleteItem")
      // console.log('hell',removeCart)

      // // Object.values(removeCart)[Object.values(removeCart)-1].addEventListener()
        
      // // });

      // removeCart.forEach(e=> console.log('e',
      
      // e.addEventListener('click', (e) => {
      //   console.log('hdkjjhhfej')
      // })))

      // // forEach((t,i) => {
      // //   t.addEventListener("click", (e)=> {

      // //     console.log()
      // //   })

     








      // // add price of this item to the total
      // total += product.price * item.quantity;
      // console.log(total);
      // totalQte.innerHTML = total;
    });
    

});




function add_to_cart(product,item){
  const html = `
        <article class="cart__item" data-id="${item.id}" data-color="${item.color}">
          <div class="cart__item__img">
            <img src="${product.imageUrl}" alt="${product.altTxt}">
          </div>
          <div class="cart__item__content">
            <div class="cart__item__content__description">
              <h2>${product.name}</h2>
              <p>${item.color}</p>
              <p >${product.price}€</p>
            </div>
            <div class="cart__item__content__settings">
              <div class="cart__item__content__settings__quantity">
                <p>Qté : ${item.quantity}</p>
                <input type="number" class="itemQuantity" id="${item.id}"  name="itemQuantity" min="1" max="100" value="${item.quantity}" data-price="${product.price}">
              </div>
              <div class="cart__item__content__settings__delete">
                <button class="deleteItem" data-id=${item.id} >Supprimer</button>
              </div>
            </div>
          </div>
        </article>
      `;
      // add the HTML to the shopping cart page
      divBody.insertAdjacentHTML("beforeend", html);

      totalQte.innerHTML = getAmount(product,item)
      const quantityInput = document.getElementById(item.id);
      console.log(quantityInput);
      quantityInput.addEventListener("input", function() {
        modify_qte(item,quantityInput);
      }) 
    }
    
    function getAmount(product,item){
  // add price of this item to the total
        total += product.price * item.quantity;
        return total;
  }

function modify_qte(item,quantityInput){

    // add event listener to quantity input element
      
      // let pr = quantityInput.dataset.price
      // console.log('mypr',pr)
      // quantityInput.addEventListener("input", (e) => {
        const newQuantity = parseInt(quantityInput.value);
        // console.log("my new", newQuantity);
        item.quantity = newQuantity;
        // let price = e.target.dataset.price
        // console.log('my price',price)
        total = cart.items.reduce((acc, curr) => {
          console.log('currq',curr.quantity);
          return (acc += curr.quantity * curr.price);
        }, 0);
        console.log(total)
        totalQte.innerHTML = total;
        localStorage.setItem("cart", JSON.stringify(cart));
        console.log(cart)
      }



