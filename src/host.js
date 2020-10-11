const express = require('express');
const nodemailer =require('nodemailer');
const app= express();
const mysql = require('mysql');
const bodyParser =require('body-parser');
// const Imap = require('imap');
// const inspect = require('util').inspect;
// const simpleParser = require('mailparser').simpleParser;






app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var server = app.listen(3001, "127.0.0.1", function () {

    var host = server.address().address
    var port = server.address().port
  
    console.log("Application listening at http://%s:%s", host, port)
  
  });

  var conn =mysql.createConnection({
    host:'Database.gallantfusiontech.com',
    user :'c19GFTdev',
    password:'temp1234',
    database:'c19LS'
 });
 conn.connect(function(err){
   if (err)console.log('Problem in Database Connection'); 
   else console.log('Mysql connection Established');
  });

  app.post('/sessionedit',function(req,res){
    var postdata = req.body;
    console.log(postdata);
    var qry = "insert into host_data(host_name) VALUES ("+  mysql.escape(postdata.host_name.replace(/ /g,''))+")";
    
   console.log(qry);
    conn.query(qry,function(err,result,fields){
      if(err) throw err;
      res.end(JSON.stringify(result));
  
    });
    });

  app.get('/session',function(req,res){

conn.query('select * from host_data',function(err,result,filds){
    res.end(JSON.stringify(result));
});

  });  