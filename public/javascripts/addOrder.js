$(document.forms['dish']).on('submit', function () {
    var form = $(this);
    $.ajax({
        url: "/cart/addDish",
        method: "GET",
        data: form.serialize(),
        complete: function () {
            $(":submit", data).button("reset");
        },
        statusCode: {
            402: function () {
                $('.error', form).html("Вы не зарегистрированы");
            },
            200: function () {
                if (confirm("Товар добавлен в корзину. Перейти в корзину?")) {
                    window.location.href = "/cart";
                }
            },
            401: function () {
                $('.error', form).html("Выберите количество порций");
            },
            403: function () {
                $('.error', form).html("Ошибка добавления корзины");
            }
        }
    });
    return false;
});