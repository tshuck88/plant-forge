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
    let quantity;

    if (quantityInput !== undefined) {
        quantity = quantityInput;
    } else {
        quantity = 1;
    }

    const newProduct = {
        name: productName,
        quantity: quantity
    }

    let cart;

    if (sessionStorage.cart) {
        cart = JSON.parse(sessionStorage.getItem("cart"));
    } else {
        cart = [];
    }

    function checkCart(arr, product) {
        const findProduct = arr.filter(obj => { return obj.name === productName});

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