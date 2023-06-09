// Add event listener to all "Add to Cart" buttons
let addToCartButtons = document.querySelectorAll('.add-to-cart');
addToCartButtons.forEach(button => {
  button.addEventListener('click', () => {
    // Get product information
    let productName = button.previousElementSibling.previousElementSibling.previousElementSibling.textContent;
    let productPrice = button.previousElementSibling.textContent;
    let productQuantity = 1;

    // Check if item already exists in cart
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let existingItem = cart.find(item => item.name === productName);
    if (existingItem) {
      // Increment quantity if item already exists
      existingItem.quantity++;
    } else {
      // Add new item to cart if it doesn't exist
      cart.push({ name: productName, price: productPrice, quantity: productQuantity });
    }

    // Update localStorage
    localStorage.setItem('cart', JSON.stringify(cart));

    // Update Cart page link
    let cartLink = document.querySelector('.cart a');
    let cartTotal = cart.reduce((total, item) => total + item.quantity, 0);
    cartLink.textContent = `Cart (${cartTotal})`;
  });
});

// Get cart data from localStorage
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Populate cart table with items
let cartTable = document.getElementById('cartTable');
let cartTotal = 0;
cart.forEach(item => {
  let row = document.createElement('tr');
  let nameCell = document.createElement('td');
  let priceCell = document.createElement('td');
  let quantityCell = document.createElement('td');
  let totalCell = document.createElement('td');
  nameCell.textContent = item.name;
  
  // Remove currency symbol from price value
  let priceValue = item.price.replace('$', '');
  priceCell.textContent = item.price;
  
  quantityCell.textContent = item.quantity;
  
  // Calculate total based on price and quantity
  let totalValue = parseFloat(priceValue) * item.quantity;
  totalCell.textContent = '$' + totalValue.toFixed(2);
  
  row.appendChild(nameCell);
  row.appendChild(priceCell);
  row.appendChild(quantityCell);
  row.appendChild(totalCell);
  cartTable.appendChild(row);
  
  // Add item total to cart total
  cartTotal += totalValue;
});

// Display cart total
let cartTotalCell = document.getElementById('cartTotal');
cartTotalCell.textContent = '$' + cartTotal.toFixed(2);


// get the clear cart button element
const clearCartBtn = document.querySelector(".clear-cart");

// add event listener to the button
clearCartBtn.addEventListener("click", function() {
  // get the cart table and cart total elements
  const cartTable = document.querySelector("#cartTable");
  const cartTotal = document.querySelector("#cartTotal");

  // remove all rows from the cart table
  while (cartTable.firstChild) {
    cartTable.removeChild(cartTable.firstChild);
  }

  // update the cart total to zero
  cartTotal.textContent = "0.00";
  localStorage.clear();
});

