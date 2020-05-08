module.exports = function(req, res, next){
    if(req.isAuthenticated()){
        return next()
    } else {
        res.redirect('/users/signin')
    }
}

module.exports.notLogged = function(req, res, next){
    if(!req.isAuthenticated()){
        return next()
    } else {
        res.redirect('/class/')
    }
}