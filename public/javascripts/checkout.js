$(document.forms['order']).on('submit', function () {
    var form = $(this);
    $.ajax({
        url: "/order",
        method: "GET",
        data: form.serialize(),
        complete: function () {
            $(":submit", data).button("reset");
        },
        statusCode: {
            200: function () {
                alert("Ваш заказ принят. Заказ будет доставлен в течении часа. Оплата при получении.");
                window.location.href = "/cart";
            }
        }
    });
    return false;
});