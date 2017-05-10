const express = require('express')
const router = express.Router()
router.use(function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*")
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
	next()
})

router.get('/final', function(req, res){
	var spawn = require('child_process').spawn,
			py    = spawn('python', ['poll_final.py']),
			data = '최종',
			dataString = '';

	py.stdout.on('data', function(data){
		dataString += data.toString();
	});
	py.stdout.on('end', function(){
		res.send(dataString);
	});
	py.stdin.write(JSON.stringify(data));
	py.stdin.end();
});

router.get('/total', function(req, res){
	var spawn = require('child_process').spawn,
			py    = spawn('python', ['poll_total.py']),
			data = '종합',
			dataString = '';

	py.stdout.on('data', function(data){
		dataString += data.toString();
	});
	py.stdout.on('end', function(){
		res.send(dataString);
	});
	py.stdin.write(JSON.stringify(data));
	py.stdin.end();
});

router.get('/regional', function(req, res){
	var spawn = require('child_process').spawn,
			py    = spawn('python', ['poll_regional.py']),
			data = '지역별',
			dataString = '';

	py.stdout.on('data', function(data){
		dataString += data.toString();
	});
	py.stdout.on('end', function(){
		res.send(dataString);
	});
	py.stdin.write(JSON.stringify(data));
	py.stdin.end();
});

router.get('/gender', function(req, res){
	var spawn = require('child_process').spawn,
			py    = spawn('python', ['poll_gender.py']),
			data = '성별',
			dataString = '';

	py.stdout.on('data', function(data){
		dataString += data.toString();
	});
	py.stdout.on('end', function(){
		res.send(dataString);
	});
	py.stdin.write(JSON.stringify(data));
	py.stdin.end();
});

router.get('/age', function(req, res){
	var spawn = require('child_process').spawn,
			py    = spawn('python', ['poll_age.py']),
			data = '연령별',
			dataString = '';

	py.stdout.on('data', function(data){
		dataString += data.toString();
	});
	py.stdout.on('end', function(){
		res.send(dataString);
	});
	py.stdin.write(JSON.stringify(data));
	py.stdin.end();
});

module.exports = router
