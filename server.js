// set up ========================
    var express  = require('express');
    var path = require('path');
    var app = express();                   // create app w/ express
    var morgan = require('morgan');             // log requests to the console (express4)
    var bodyParser = require('body-parser');    // pull information from HTML POST (express4)
    var mongojs = require("mongojs");
    var db = mongojs("danylomaster-company-manager-2652696:27017/companies",["companies"]); // connect to mongoDB database
    
    // configuration =================
    app.use(express.static(path.resolve(__dirname, 'public')));                 // set the static files location /public/img will be /img for users
    app.use(morgan('dev'));                                         // log every request to the console
    app.use(bodyParser.json());                                     // parse application/json

// application -------------------------------------------------------------
    app.get('/', function(req, res) {
        res.sendfile('./public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
    });
    
    app.get("/companies",function(req, res) {
      db.companies.find({},{ _id: 0 },function(err,docs){
             res.json(docs);
        });
    });
    
    app.put("/companies",function(req,res){
        db.companies.remove({},function(err,doc){
            db.companies.insert(req.body,function(err,doc){
                res.json(doc);
            });
        });
    });


    // listen (start app with node server.js) ======================================
    app.listen(process.env.PORT || 3000,process.env.IP || "0.0.0.0");
    console.log("App listening on port "+process.env.PORT || 3000);
