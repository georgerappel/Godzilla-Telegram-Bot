module.exports = function (from, to, param, client) {
	var osc = require('node-osc');
	var addr = '/telegram/test'

	if(param && /^[0-9.]+/.test(param)){
		var valor = parseFloat(param);
		var oscclient = new osc.Client('146.164.80.56', 22244);

		oscclient.send(addr, valor, function(){ oscclient.kill });
		return 'OSC Enviado: ' + addr + ' | ' + valor;
	}

	return 'Parâmetro inválido. Necessário número.';
};