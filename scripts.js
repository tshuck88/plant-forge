$(document).on("click", ".product-image-option", function() {
    const selectedImage = $(this);
    const selectedImageSrc = $(this).attr("src");

    $(".product-image-option").removeClass("active-image");
    $(selectedImage).addClass("active-image");
    $(".main-product-image, .modal-image").attr("src", selectedImageSrc);
})