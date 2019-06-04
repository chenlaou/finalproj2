$(document).ready(function () {
    $("#logOff").on("click", function (e) {
       
        $.ajax("/api/logout", {
            type: "POST",
            data: {
                user_id: userName,
                user_password: userPass
            }
        }).then(
            function (test) {
                //    location.reload()
            }
        ).catch(
            function(error){
                console.log(error)
            }
        )
    })
});