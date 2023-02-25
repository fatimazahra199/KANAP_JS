
fetch('http://localhost:3000/api/products')
.then(response => response.json()) // Read the response as text
.then(products => {
    const container = document.querySelector('#items')
    container.innerHTML = Object.values(products).map(product =>  
        `<a href="./product.html?id=${product._id}">
    <article>
      <img src="${product.imageUrl}" alt="${product.altTxt}">
      <h3 class="productName">${product.name}</h3>
      <p class="productDescription">${product.description}</p>
    </article>
  </a>`).join('');

 })
 .catch(error => console.error(error.message)); 