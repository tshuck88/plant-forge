$(document).ready(function () {

    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    });

    $(document).on("click", ".product-image-option", function () {
        const selectedImage = $(this);
        const selectedImageSrc = $(this).attr("src");

        $(".product-image-option").removeClass("active-image");
        $(selectedImage).addClass("active-image");
        $(".main-product-image, .modal-image").attr("src", selectedImageSrc);
    });

    $(document).on("click", ".add-to-cart-button", function () {
        // const cardTitle = $(this).parent().siblings(".card-body").find(".card-title").text();
        const productName = $(".product-title").text(); // || cardTitle;
        const quantityInput = $(".quantity-input").val();
        const productImage = $(".cover-image").attr("src")

        // let quantity;
        // if (quantityInput !== undefined) {
        //     quantity = quantityInput;
        // } else {
        //     quantity = 1;
        // }

        const newProduct = {
            name: productName,
            quantity: quantityInput,
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
                const cartItem = findProduct[0];
                cartItem.quantity = parseInt(cartItem.quantity) + parseInt(product.quantity);
                console.log(arr);
            }
            sessionStorage.setItem("cart", JSON.stringify(arr));
        }
        checkCart(cart, newProduct)

    });

    const cartArray = JSON.parse(sessionStorage.getItem("cart")) || [];
    console.log(cartArray);

    function isCartEmpty() {
        if (cartArray.length === 0) {
            $(".table-responsive").css("display", "none");
            $("#empty-cart").append("<h2>Your cart is currently empty</h2>");
        }
    }

    function displayCartItems() {

        isCartEmpty();

        for (let i = 0; i < cartArray.length; i++) {

            const tr = $("<tr>");
            const th = $('<th scope="row">');
            const removeButton = $('<button type="button" class="btn remove-button">X</button>');
            const tdImage = $('<img src="' + cartArray[i].image + '" class="cart-product-image">');
            const tdTitle = $('<td class="cart-product-title">').text(cartArray[i].name);
            const tdPrice = $('<td class="cart-product-price">').text(formatter.format(calculatePrice(cartArray[i].quantity)));
            const tdQuantity = $('<td><input type="number" class="cart-product-quantity" min="1" value="' + cartArray[i].quantity + '">');
            const tdTotal = $('<td class="cart-prouct-total">').text(formatter.format(calculateTotal(calculatePrice(cartArray[i].quantity), cartArray[i].quantity)));


            th.append(removeButton);
            tr.append(th);
            tr.append(tdImage);
            tr.append(tdTitle);
            tr.append(tdPrice);
            tr.append(tdQuantity);
            tr.append(tdTotal);
            $("#cart-table").append(tr);
        }

    }

    function calculatePrice(quantity) {

        let price;

        switch (true) {
            case quantity >= 10 && quantity < 20:
                price = 35.95;
                break;
            case quantity >= 20 && quantity < 30:
                price = 33.95;
                break;
            case quantity >= 30 && quantity < 50:
                price = 31.95;
                break;
            case quantity >= 50 && quantity < 100:
                price = 29.95;
                break;
            case quantity >= 100:
                price = 27.95;
                break;
            default:
                price = 37.95
        }
        return price
    }

    function calculateTotal(price, quantity) {
        const total = parseFloat(price) * parseFloat(quantity)
        return total
    }

    displayCartItems();

    $(document).on("click", ".remove-button", function () {
        const productName = $(this).parent().siblings(".cart-product-title").text();
        const itemIndex = cartArray.findIndex(obj => obj.name === productName);
        cartArray.splice(itemIndex, 1);
        $(this).parents("tr").remove();
        sessionStorage.setItem("cart", JSON.stringify(cartArray));
        isCartEmpty();
    });

    $(document).on("click", ".update-cart-button", function () {
        const quantities = $(".cart-product-quantity").map((i, e) => e.value).get();

        for (let i = 0; i < cartArray.length; i++) {
            cartArray[i].quantity = quantities[i];

        }
        
        $("#cart-table").empty();
        displayCartItems()

    })
});

