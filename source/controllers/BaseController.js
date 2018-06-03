UserModel = require('../models/UserModel');

module.exports = class BaseController {
	/**
   * authenticate - Método utilizado para autenticar as rotas que precisam de
   * controle de acesso por login.
   */
   authenticate(request, response, next) {
   		const token = request.headers['authorization'];
   		UserModel.findOne({ token })
   			.then((user) => {
   				if ( user ) {
   					next();
   				} else {
   					response.json({error:1,message:"User don't have access!"});
   				}
   			})
   }
};