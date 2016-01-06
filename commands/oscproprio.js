module.exports = function (from, to, param, client) {
	var osc = require('node-osc');
	var addr = '/telegram/test';
	var valor = 0.9;

	if(param && param.split(" ").length == 2 && /^[0-9.]+/.test(param)){
		var params = param.split(" ");
		var ipaddr = params[0];
		var port = params[1];

		var oscclient = new osc.Client(ipaddr, port);

		oscclient.send(addr, valor, function(){ oscclient.kill });
		return 'OSC Enviado: ' + ipaddr + ":" + port + " | " + addr + ' | ' + valor;
	}

	return 'Parâmetros inválidos. 2 parâmetros necessários: IP e Porta, separados por espaço.';
};