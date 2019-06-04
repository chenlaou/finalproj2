$(document).ready(function () {

    var emailUser = $("input#emailRegister")
    var registerUser = $("input#userRegister")
    var passwordUser = $("input#passwordRegister")
    var verifyPass = $("input#passVerify")

    $("#registerButton").on("click", function (e) {
        e.preventDefault();

        var userData = {
            email: emailUser.val().trim(),
            user: registerUser.val().trim(),
            password: passwordUser.val().trim(),
        };

        if (!userData.email || !userData.user || !userData.password) {
            return;
        }
        
        if (verifyPass.val() === passwordUser.val()) {            
            signUpUser(userData.email, userData.user, userData.password);
        } else {
            alert("wrong")
        }

        function signUpUser(email, user, password) {

            $.post("/api/users/signup", {
                email: email,
                user_id: user,
                user_password: password
            }).then(function (data) {
                window.location.replace(data);
            })
        }
    });
});