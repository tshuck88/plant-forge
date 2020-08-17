$(document).ready(function () {

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

    const cartArray = JSON.parse(sessionStorage.getItem("cart")) || [];
    console.log(cartArray)

    function displayCartItems() {

        if (cartArray.length === 0) {
            $(".table-responsive").css("display", "none");
            $("#empty-cart").append("<h2>Your Cart is currently empty</h2>")
        } else {
            for (let i = 0; i < cartArray.length; i++) {
                const tr = $("<tr>");
                const th = $('<th scope="row">');
                const removeButton = $('<button type="button" class="btn remove-button">X</button>');
                const tdImage = $('<img src="' + cartArray[i].image + '" class="cart-product-image">');
                const tdTitle = $('<td class="cart-product-title">').text(cartArray[i].name);
                const tdPrice = $('<td class="cart-product-price">');
                const tdQuantity = $('<td><input type="number" class="cart-product-quantity" value="' + cartArray[i].quantity + '">');
                const tdTotal = $('<td class="cart-prouct-total">');

                th.append(removeButton);
                tr.append(th);
                tr.append(tdImage);
                tr.append(tdTitle);
                tr.append(tdPrice);
                tr.append(tdQuantity);
                tr.append(tdTotal);

                $("#cart-table").append(tr)
            }
        }


    }

    displayCartItems();



    function deleteItem(item) {
        const itemIndex = cartList.indexOf(item)
        cartArray.splice(itemIndex, 1); // remove from stored array       
        saveCart(cartArray); // save it back into storage
    }

})

