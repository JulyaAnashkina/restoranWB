$(document.forms['login-form']).on('submit', function () {
    var form = $(this);

    $('.error', form).html('');
    $(":submit", form).button("loading");

    $.ajax({
        url: "/login",
        method: "POST",
        data: form.serialize(),
        complete: function () {
            $(":submit", form).button("reset");
        },
        statusCode: {
            200: function () {
                form.html("Вы вошли в сайт").addClass('alert-success');
                window.location.href = "/";
            },
            401: function () {
                $('.error', form).html("Ошибка авторизации: введеные имя или пароль неверные");
            }
        }
    });
    return false;
});