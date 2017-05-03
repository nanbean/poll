const express = require('express')
const router = express.Router()
router.use(function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*")
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
	next()
})

router.get('/total', function(req, res){
	var spawn = require('child_process').spawn,
			py    = spawn('python', ['poll_total.py']),
			data = '종합',
			dataString = '';

	py.stdout.on('data', function(data){
		dataString += data.toString();
	});
	py.stdout.on('end', function(){
		console.log('Sum of numbers=',dataString);
		res.send(dataString);
	});
	py.stdin.write(JSON.stringify(data));
	py.stdin.end();
});

module.exports = router
