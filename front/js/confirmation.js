let url = document.location.href;
let idurl = new URL(url);

let orderId = idurl.searchParams.get("orderId");
console.log(orderId);

document.getElementById("orderId").innerText = orderId;
