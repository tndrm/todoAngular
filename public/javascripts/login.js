function checkUser(argument) {
	event.preventDefault();
	console.log($('#login').val())
	var user = {
		username : $('#login').val(),
		password : $('#password').val()
		}
	console.log(user)
	$.ajax({
		url: "/loginUser",
		method: "POST",
		data: user,
		statusCode:{
			200:function () {
				window.location.href = "/"
			},
			403:function () {
				alert('Incorrect Login or Password')
			}
		}
	})	
}