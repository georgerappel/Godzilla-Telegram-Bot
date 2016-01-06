module.exports = function (from, to, param, client) {
	if(param)
		return 'QUERO ' + param.toUpperCase();
	return 'QUERO NUTELLA!';
};