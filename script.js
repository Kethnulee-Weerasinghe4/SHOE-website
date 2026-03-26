// ================= CART OPEN / CLOSE =================
const cartSidebar = document.getElementById("cartSidebar");
const closeCart = document.getElementById("closeCart");

function openCart() {
    cartSidebar.classList.add("active");
}

if (closeCart) {
    closeCart.addEventListener("click", () => {
        cartSidebar.classList.remove("active");
    });
}


// ================= ADD TO CART =================
const addBtn = document.getElementById("addToCart");

if (addBtn) {
    addBtn.addEventListener("click", () => {

        // to avoids wrong data if page has multiple h1/h2
        const name = document.querySelector(".product__info h1")?.textContent;

        const priceText = document.querySelector(".product__info h2")?.textContent;

        // to extract only numbers from "LKR 13,000"
        const price = parseInt(priceText.replace(/[^0-9]/g, ""));

        // to use getAttribute to keep relative path (not full URL)
        const image = document.querySelector(".product__image img").getAttribute("src");

        const size = document.getElementById("size")?.value || "N/A";
        const quantity = parseInt(document.getElementById("quantity")?.value) || 1;

        const product = { name, price, image, size, quantity };

        let cart = JSON.parse(localStorage.getItem("cart")) || [];

        const existing = cart.find(item => item.name === name && item.size === size);

        if (existing) {
            existing.quantity += quantity;
        } else {
            cart.push(product);
        }

        // localStorage stores only strings / to convert object into JSON string
        localStorage.setItem("cart", JSON.stringify(cart));

        alert("Added to cart!");
        loadCart();
    });
}


// ================= LOAD CART =================
function loadCart() {
    const cartItems = document.getElementById("cartItems");
    const cartTotal = document.getElementById("cartTotal");

    if (!cartItems) return; // to prevents errors on pages without cart

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    cartItems.innerHTML = "";

    // to handle empty cart UI
    if (cart.length === 0) {
        cartItems.innerHTML = "<p>Your cart is empty</p>";
        cartTotal.textContent = "LKR 0";
        return;
    }

    let total = 0;

    cart.forEach((item, index) => {
        total += item.price * item.quantity;

        cartItems.innerHTML += `
            <div class="cart__item">
                <img src="${item.image}">

                <div class="cart__info">
                    <p>${item.name}</p>
                    <p>Size: ${item.size}</p>
                    <p>Qty: ${item.quantity}</p>
                    <p>LKR ${item.price.toLocaleString()}</p>
                </div>

                <button class="remove__btn" onclick="removeItem(${index})">Remove</button>
            </div>
        `;
    });

    cartTotal.textContent = "LKR " + total.toLocaleString();
}


// ================= REMOVE ITEM =================
function removeItem(index) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    cart.splice(index, 1);

    localStorage.setItem("cart", JSON.stringify(cart));
    loadCart();
}


// ================= INIT =================
loadCart();