$(document).ready(function () {

    var userName = $("input#userName")
    var userPass = $("input#userPass")

    $("#loginButton").on("click", function (e) {
        e.preventDefault();

        var userData = {
            user: userName.val().trim(),
            password: userPass.val().trim()
        };

        if (!userData.user || !userData.password) {
            return;
        }

        loginUser(userData.user, userData.password);
    })

    function loginUser(user, password) {
        $.post("/api/login", {
            user_id: user,
            user_password: password
        }).then(function (data) {
            window.location.replace(data);
            // If there's an error, log the error
        }).catch(function (err) {
            console.log(err);
        });
    }
});
