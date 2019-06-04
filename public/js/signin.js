$(document).ready(function () {
    $("#loginButton").on("click", function (e) {
        e.preventDefault();

        var userName = $("#userName").val().trim();
        var userPass = $("#userPass").val().trim();

        $.ajax("/api/users/login", {
            type: "GET",
            data: {
                user_id: userName,
                user_password: userPass
            }
        }).then(
            function (test) {
               console.log(test)
            }
        ).catch(
            function(error){
                console.log(error)
            }
        )
        $("#welcomeBanner").text(`Welcome, ${userName}`)
    })
});