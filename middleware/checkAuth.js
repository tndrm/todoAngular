module.exports = function (req, res, next) {
	if (!req.session.user){
		res.status(401).send('401')
	}else{
		next();
	}
	
}