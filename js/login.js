
$(document).ready(function () {

    //  if (sessionStorage.length > 0) {
    //      window.location.href = "./index.html";
    //}
    $("button").click(function (e) {

        var username = $('#username').val();
        var password = $('#password').val();

        $("#username").keyup(function () {
            $("#error").html("");
        });

        $("#password").keyup(function () {
            $("#error").html("");
        });

        if (!(username && password)) {
            $('#error').html("<b>Enter username and password</b><br><br>")
            return
        }


        $.getJSON("http://172.27.94.225:3000/admin",
            function (data) {
                $.each(data, function (key, value) {
                    if (value.username === username && value.password === password) {
                        sessionStorage.setItem("username", value.username);

                        $('form').submit();
                        window.open("./home.html");

                    } else {

                        $('#error').html("<b>Wrong Credentials</b><br><br>").css("color", "tomato");


                    }

                });
            });
    });
});