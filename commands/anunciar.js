module.exports = function (from, to, param, client) {
	var sys = require('sys')
	var exec = require('child_process').exec;
	var child;
	// executes `pwd`
	if(param){
		child = exec('echo "' + param + '" | padsp /usr/lib/mbrola/ttp_p.pl', function (error, stdout, stderr) {
		  //sys.print('stdout: ' + stdout);
		  //sys.print('stderr: ' + stderr);
		  if (error !== null) {
		    console.log('exec error: ' + error);
		    return 'Vish... Deu algo errado.';
		  }
		});
		return 'Estou anunciando no NANO...';
	}
	return 'O que eu devo anunciar?';	
};