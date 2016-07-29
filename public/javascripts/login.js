$(document).ready(function() {
	$('form').submit(function(event) {
	var user = {
		username : $('#login').val(),
		password : $('#password').val()
		}
	console.log(user)
	$.ajax({
		url: "/loginUser",
		method: "POST",
		data: user,
		cache: false,
		statusCode:{
			200:function () {
				window.location.href = "/"
			},
			403:function () {
				alert('Incorrect Login or Password')
			}
		}
	})	
	event.preventDefault()
})
})