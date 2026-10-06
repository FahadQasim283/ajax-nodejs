$("#loadProducts").click(function () {
    $("#status").text("Loading...");

    $.ajax({
        url: "https://dummyjson.com/products?limit=5",
        method: "GET",
        success: function (response) {
            $("#products").html("");

            $.each(response.products, function (index, product) {
                $("#products").append(`
                    <article>
                        <h2>${product.title}</h2>
                        <p>Price: ${product.price}</p>
                        <p>Category: ${product.category}</p>
                    </article>
                `);
            });

            $("#status").text(`Loaded ${response.products.length} products.`);
        },
        error: function () {
            $("#status").text("The product request failed.");
        }
    });
});
