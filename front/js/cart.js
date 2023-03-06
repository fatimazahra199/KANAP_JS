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
  console.log(submit);
  submit.addEventListener("click", function (e) {
    e.preventDefault();
    validate();
  });
}

function getAmount(product, item) {
  // add price of this item to the total
  total += product.price * item.quantity;
  return total;
}

function modify_qte(item, quantityInput) {
  // modify the quantity of the item
  const newQuantity = parseInt(quantityInput.value);
  console.log("yes new", newQuantity);

  //updates the quantity property of the item object with the new quantity entered by the user.
  item.quantity = newQuantity;

  // calculate the new total price for all items in the cart
  total = cart.items.reduce((acc, curr) => {
    console.log("currq", curr.quantity);
    console.log("curpr", curr.price);
    return (acc += curr.quantity * curr.price);
  }, 0);
  console.log(total);

  // update the total quantity displayed
  totalQte.innerHTML = total;

  // save the updated cart to localStorage
  localStorage.setItem("cart", JSON.stringify(cart));
  console.log(cart);
}

function update_total(product, item) {
  // Select all the cart items
  const cart_prod = document.querySelectorAll(".cart__item");
  console.log(cart_prod.length);

  // Select the total price element
  const p_total = document.querySelector("#totalPrice");
  console.log(p_total);

  // Initialize a total variable to keep track of the total price
  let total = 0;

  // Loop through each cart item and calculate the total price
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

  // Return the total price of all items in the cart
  return total;
}

function validate() {
  const firstNameField = document.getElementById("firstName");
  let valid = true;

  if (!firstNameField.value) {
    const nameError = document.getElementById("firstNameErrorMsg");
    nameError.classList.add("visible");
    firstNameField.classList.add("invalid");
    nameError.setAttribute("aria-hidden", false);
    nameError.setAttribute("aria-invalid", true);
  }

  const lastName = document.getElementById("lastName").value.trim();
  const lastNameField = document.getElementById("lastName");
  console.log(lastNameField);
  const lastNameRegex = /^[A-Za-zÀ-ÖØ-öø-ÿ\s-]{2,}$/; // Accepts letters, spaces, and hyphens, at least 2 characters
  const lastNameError = document.getElementById("lastNameErrorMsg");

  if (!lastNameRegex.test(lastName) || !lastNameField.value) {
    lastNameError.innerHTML = "Please enter a valid last name";
    lastNameError.classList.add("visible");
    lastNameError.setAttribute("aria-hidden", false);
    lastNameError.setAttribute("aria-invalid", true);
    lastNameField.classList.add("invalid");
    return false;
  } else {
    lastNameField.classList.add("validate");
    lastNameError.innerHTML = "confirmer";
  }

  // Validate address
  const address = document.getElementById("address").value.trim();
  const addressField = document.getElementById("address");
  const addressRegex = /^[A-Za-z0-9À-ÖØ-öø-ÿ\s-]{2,}$/; // Accepts letters, numbers, spaces, and hyphens, at least 2 characters
  const addressError = document.getElementById("addressErrorMsg");

  if (!addressRegex.test(address) || !addressField.value) {
    addressError.innerHTML = "Please enter a valid address";
    addressError.classList.add("visible");
    addressError.setAttribute("aria-hidden", false);
    addressError.setAttribute("aria-invalid", true);
    addressField.classList.add("invalid");
    return false;
  } else {
    addressField.classList.add("validate");
    addressError.innerHTML = "confirmer";
  }

  // Validate city
  const city = document.getElementById("city").value.trim();
  const cityField = document.getElementById("city");
  const cityRegex = /^[A-Za-zÀ-ÖØ-öø-ÿ\s-]{2,}$/; // Accepts letters, spaces, and hyphens, at least 2 characters
  const cityError = document.getElementById("cityErrorMsg");

  if (!cityRegex.test(city) || !cityField.value) {
    cityError.innerHTML = "Please enter a valid city";
    cityError.classList.add("visible");
    cityError.setAttribute("aria-hidden", false);
    cityError.setAttribute("aria-invalid", true);
    cityField.classList.add("invalid");
    return false;
  } else {
    cityField.classList.add("validate");
    cityError.innerHTML = "confirmer";
  }

  const email = document.getElementById("email").value.trim();

  const emailFiled = document.getElementById("email");
  console.log(emailFiled);
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Accepts a valid email address
  console.log(emailRegex.test(email));
  const emailError = document.getElementById("emailErrorMsg");

  if (!emailRegex.test(email) || !emailFiled.value) {
    emailError.innerHTML = "Please enter a valid email address";
    emailError.classList.add("visible");
    emailError.setAttribute("aria-hidden", false);
    emailError.setAttribute("aria-invalid", true);
    emailFiled.classList.add("invalid");
    return false;
  } else {
    emailFiled.classList.add("validate");
    emailError.innerHTML = "confirmer";
  }
  if (
    lastNameRegex.test(lastName) &&
    addressRegex.test(address) &&
    cityRegex.test(city) &&
    emailRegex.test(email)
  ) {
    const order = {
      contact: {
        firstName: firstName.value,
        lastName: lastName,
        address: address,
        city: city,
        email: email,
      },
      products: [],
    };
    cart.items.forEach((it) => order.products.push(it.id));
    console.log(order.contact);
    localStorage.setItem("formData", JSON.stringify(order));
    console.log(order.contact.email);

    //Send a POST request to the server to create the order
    fetch("http://localhost:3000/api/products/order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(order),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        generateOrderId(order.contact.email, order.products)
        .then((orderId) => {
          console.log(orderId); 
     // Redirect to the confirmation page with the orderId
          window.location.href = `confirmation.html?orderId=${orderId}`;
            })
  .catch((error) => {
    console.error(error);
          });
       
       
      })
      .catch((error) => console.error(error));
  }

  return valid;
}



async function generateOrderId(email, products) {
  const encoder = new TextEncoder();
  const data = encoder.encode(email + JSON.stringify(products));
  console.log("mydata", data);
  const hash = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(hash))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}
