const cart = JSON.parse(localStorage.getItem("cart")) || { items: [] };
const divBody = document.querySelector("#cart__items");
const totalQte = document.querySelector("#totalPrice");
console.log(cart);

let total = 0;

// iterate over each item in the cart and create the HTML for it
cart.items.forEach((item) => {
  fetch(`http://localhost:3000/api/products/${item.id}`)
    .then((res) => res.json())
    .then((product) => {
      add_to_cart(product, item);
    });
});

function add_to_cart(product, item) {
  const html = `
        <article class="cart__item" data-id="${item.id}" data-color="${item.color}">
          <div class="cart__item__img">
            <img src="${product.imageUrl}" alt="${product.altTxt}">
          </div>
          <div class="cart__item__content">
            <div class="cart__item__content__description">
              <h2>${product.name}</h2>
              <p>${item.color}</p>
              <p class="product-price">${product.price}€</p>
            </div>
            <div class="cart__item__content__settings">
              <div class="cart__item__content__settings__quantity">
                <p class="it_qte">Qté : ${item.quantity}</p>
                <input type="number" class="itemQuantity" id="${item.id}"  name="itemQuantity" min="1" max="100" value="${item.quantity}" data-price="${product.price}">
              </div>
              <div class="cart__item__content__settings__delete">
                <button class="deleteItem" id=${item.id} >Supprimer</button>
              </div>
            </div>
          </div>
        </article>
      `;
  // add the HTML to the shopping cart page
  divBody.insertAdjacentHTML("beforeend", html);

  totalQte.innerHTML = getAmount(product, item);
  const quantityInput = document.getElementById(item.id);
  console.log(quantityInput);
  quantityInput.addEventListener("input", function () {
    modify_qte(item, quantityInput);
  });

  const remove = document.querySelectorAll(".deleteItem");
  console.log(Object.values(remove)[Object.values(remove).length - 1]);

  Object.values(remove)[Object.values(remove).length - 1].addEventListener(
    "click",
    (e) => {
      let suppr = e.target.id;
      console.log(suppr);

      var buttonClicked = e.target;
      console.log(buttonClicked);

      buttonClicked.parentElement.parentElement.parentElement.parentElement.remove();
      // Find the index of the product to be removed
      let index = cart.items.findIndex((product) => product.id === suppr);
      console.log(index);

      // Remove the product from the cart data
      if (index !== -1) {
        cart.items.splice(index, 1);
      }
      localStorage.setItem("cart", JSON.stringify(cart));
      totalQte.innerHTML = update_total(product, item);
    }
  );
  const submit = document.getElementById("order");
    console.log(submit)
  submit.addEventListener("click", function () {
    validate()
  });
}

function getAmount(product, item) {
  // add price of this item to the total
  total += product.price * item.quantity;
  return total;
}

function modify_qte(item, quantityInput) {
  let new_qte = document.getElementsByClassName(".it_qte");

  console.log("jj", new_qte);
  const newQuantity = parseInt(quantityInput.value);

  item.quantity = newQuantity;

  total = cart.items.reduce((acc, curr) => {
    console.log("currq", curr.quantity);
    console.log("curpr", curr.price);
    return (acc += curr.quantity * curr.price);
  }, 0);
  console.log(total);
  totalQte.innerHTML = total;
  localStorage.setItem("cart", JSON.stringify(cart));
  console.log(cart);
}

function update_total(product, item) {
  const cart_prod = document.querySelectorAll(".cart__item");
  console.log(cart_prod.length);

  const p_total = document.querySelector("#totalPrice");
  console.log(p_total);
  let total = 0;
  for (let i = 0; i < cart_prod.length; i++) {
    let prod = cart_prod[i];
    let price_prod = prod.getElementsByClassName("product-price")[0];
    console.log("j", parseInt(price_prod.textContent));
    let quantity_prod = prod.getElementsByClassName("itemQuantity")[0].value;
    console.log("qte", quantity_prod);
    console.log(product.price, "hel", item.quantity);
    total += parseInt(price_prod.textContent) * quantity_prod;
    console.log(total);
    console.log(cart);
  }
  return total;
}

function validate(){

  const firstNameField = document.getElementById("firstName");
  let valid = true;
  console.log(firstNameField)
  // const lastNameField = document.getElementById("lastName");


  

  if (!firstNameField.value) {
    const nameError = document.getElementById("firstNameErrorMsg");
    nameError.classList.add("visible");
    firstNameField.classList.add("invalid");
    nameError.setAttribute("aria-hidden", false);
    nameError.setAttribute("aria-invalid", true);
  }
  return valid;
}
