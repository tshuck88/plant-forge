$(document).on("click", ".product-image-option", function () {
    const selectedImage = $(this);
    const selectedImageSrc = $(this).attr("src");

    $(".product-image-option").removeClass("active-image");
    $(selectedImage).addClass("active-image");
    $(".main-product-image, .modal-image").attr("src", selectedImageSrc);
});

$(document).on("click", ".add-to-cart-button", function () {
    const cardTitle = $(this).parent().siblings(".card-body").find(".card-title").text();
    const productName = $(".product-title").text() || cardTitle;
    const quantityInput = $(".quantity-input").val();
    const productImage = $(".cover-image").attr("src")
    let quantity;

    if (quantityInput !== undefined) {
        quantity = quantityInput;
    } else {
        quantity = 1;
    }

    const newProduct = {
        name: productName,
        quantity: quantity,
        image: productImage
    }

    let cart;

    if (sessionStorage.cart) {
        cart = JSON.parse(sessionStorage.getItem("cart"));
    } else {
        cart = [];
    }

    function checkCart(arr, product) {
        const findProduct = arr.filter(obj => { return obj.name === productName });

        if (findProduct.length === 0) {
            arr.push(product);
        } else {
            const cartItem = findProduct[0]
            cartItem.quantity = parseInt(cartItem.quantity) + parseInt(product.quantity)
            console.log(arr)
        }
        sessionStorage.setItem("cart", JSON.stringify(arr))
    }

    checkCart(cart, newProduct)

});

// function getCartItems() {
//     return JSON.parse(sessionStorage.getItem("cart") || []);
// }

// const cartArray = getCartItems();

// function displayCartItems() {
//     const tr = $("<tr>");
//     const th = $("<th scope='row'>");
//     const removeButton = $("<button type='button' class='button'>X</button>");


//     for (let i = 0; i < cartArray.length; i++) {

//     }
// }



// function deleteItem(item) {
//     const itemIndex = cartList.indexOf(item)
//     cartArray.splice(itemIndex, 1); // remove from stored array       
//     saveCart(cartArray); // save it back into storage
// }