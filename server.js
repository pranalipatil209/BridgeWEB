var express = require('express')
    ,app = express()
    ,another = express()
    ,port = process.env.PORT||3000
    ,bodyParser = require('body-parser');

app.use(bodyParser.json());
another.use(bodyParser.json());

app.use(express.static('./app'));

another.use('/',function(req,res){
    console.log(req.url);
});

app.use('/',function(req,res){
    console.log(req.url);
});

app.listen(port,function(){
    console.log('server started at '+port);
});
