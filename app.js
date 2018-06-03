require('pretty-error').start();

const DoleiroController = require('./source/controllers/DoleiroController');

const doleiroController = new DoleiroController();

doleiroController.run(() => {
	console.log(' Doleiro API is up and running! ');
})
