var express = require('express');
var app = express();
app.set('port', process.env.PORT || 3000);
app.use(express.static(__dirname + '/public')); //__dirname resolves to project folder

app.get('/', function (req, res) {
   res.sendFile(__dirname + '/public/landing.html');
})

app.listen(app.get('port'), function(){
	console.log('Express started press Ctrl-c to terimnate.');
});