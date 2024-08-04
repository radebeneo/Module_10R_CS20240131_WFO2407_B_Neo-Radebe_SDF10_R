/*
Challenge:
Make it so that when you click the 'Add to cart' button, whatever is written in the input field should be console logged.
*/

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
import { getDatabase, ref, push, onValue } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-database.js"

const firebaseConfig = {
   databaseURL: "https://add-to-cart-63461-default-rtdb.europe-west1.firebasedatabase.app/"
}
const app = initializeApp(firebaseConfig);
const database = getDatabase(app)

// Elements
const inputFieldEl = document.getElementById("input-field");
const addButtonEl = document.getElementById("add-button");
const cartItemsEl = document.getElementById("cart-items");

// Add item to Firebase and update UI
addButtonEl.addEventListener("click", function() {
    let inputValue = inputFieldEl.value;
    console.log(inputValue); // Log the input value to console

    if (inputValue.trim() !== "") {
        const cartRef = ref(database, 'cart');
        push(cartRef, { item: inputValue });

        inputFieldEl.value = ""; // Clear the input field
    }
});

// Function to update the cart items in the UI
function updateCartItems(snapshot) {
    cartItemsEl.innerHTML = "";
    snapshot.forEach(childSnapshot => {
        const childData = childSnapshot.val();
        let newItem = document.createElement("div");
        newItem.className = "cart-item";
        newItem.textContent = childData.item;
        cartItemsEl.appendChild(newItem);
    });
}

// Retrieve items from Firebase and update UI
const cartRef = ref(database, 'cart');
onValue(cartRef, (snapshot) => {
    updateCartItems(snapshot);
});