let allProducts = [];

// Helper function to render product cards
function renderProducts(products) {
    $("#products").empty();

    if (products.length === 0) {
        $("#products").html('<p style="grid-column: 1/-1; text-align: center; color: #64748b; padding: 32px;">No products match your search query.</p>');
        return;
    }

    $.each(products, function (index, product) {
        $("#products").append(`
            <article>
                <div class="product-img-box">
                    <img src="${product.thumbnail}" alt="${product.title}" loading="lazy">
                </div>
                <div class="product-details">
                    <span class="category-tag">${product.category}</span>
                    <h2>${product.title}</h2>
                    <div class="product-meta">
                        <span class="price-tag">$${product.price}</span>
                        <span class="rating-tag">⭐ ${product.rating || "4.5"}</span>
                    </div>
                </div>
            </article>
        `);
    });
}

// 1. Core AJAX GET request using jQuery
$("#loadProducts").click(function () {
    const limit = $("#productLimit").val() || 5;
    const loadBtn = $(this);

    loadBtn.prop("disabled", true).text("⏳ Loading...");
    $("#status")
        .removeClass("success error")
        .addClass("loading")
        .text("Sending GET request to DummyJSON API...");

    $.ajax({
        url: `https://dummyjson.com/products?limit=${limit}`,
        method: "GET",
        success: function (response) {
            allProducts = response.products;
            renderProducts(allProducts);

            $("#status")
                .removeClass("loading error")
                .addClass("success")
                .text(`Loaded ${response.products.length} products successfully.`);

            loadBtn.prop("disabled", false).text("🔄 Reload products");
        },
        error: function () {
            $("#status")
                .removeClass("loading success")
                .addClass("error")
                .text("The product request failed. Check your internet connection.");

            loadBtn.prop("disabled", false).text("🛒 Load products");
        }
    });
});

// 2. Input Event: Live Search Filter on loaded products
$("#searchProducts").on("input", function () {
    const query = $(this).val().toLowerCase().trim();
    if (!allProducts.length) return;

    const filtered = allProducts.filter(function (product) {
        return product.title.toLowerCase().includes(query) ||
               product.category.toLowerCase().includes(query);
    });

    renderProducts(filtered);
});
