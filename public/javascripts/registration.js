$(document.forms['registration-form']).on('submit', function() {
    var form = $(this);

    $('.error', form).html('');
    $(":submit", form).button("loading");

    $.ajax({
        url: "/registration",
        method: "POST",
        data: form.serialize(),
        complete: function() {
            $(":submit", form).button("reset");
        },
        statusCode: {
            200: function() {
                form.html("Вы успешно зарегистрированы").addClass('alert-success');
                window.location.href = "/login";
            },
            401: function() {
                $('.error', form).html("Ошибка регистрации");
            }
        }
    });
    return false;
});