const express = require('express');
const nodemailer =require('nodemailer');
const app= express();
const multer = require('multer');
//const upload = multer();
const mysql = require('mysql');
const bodyParser =require('body-parser');
const {PythonShell} = require('python-shell');
var spawn = require("child_process").spawn; 

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//app.use(upload.array());
var server = app.listen(3000, "127.0.0.1", function () {

    var host = server.address().address
    var port = server.address().port
  
    console.log("Application listening at http://%s:%s", host, port)
  
  });
  
//░░░░░░░░░░░░░░░░░░░░░ Database connection ░░░░░░░░░░░░░░░░░░░░░░░

// var conn =mysql.createConnection({ 
//   host:'Database.gallantfusiontech.com',
//   user :'c19GFTdev',
//   password:'temp1234',
//   database:'c19LS'
// });
var conn =mysql.createConnection({
  host:'localhost',
  user :'root',
  password:'',
  database:'artifex'
});
 conn.connect(function(err){
   if (err)console.log('Problem in Database Connection');
   else console.log('Mysql connection Established');
  });



  
//░░end mail template using emails save in database.(sender mail ,reciver mail ,mail template)░░
function sleep(milliseconds) {
  const date = Date.now();
  let currentDate = null;
  do {
    currentDate = Date.now();
  } while (currentDate - date < milliseconds);
}
   
app.post('/mail',function(req,res){
  console.log(req.body);   
   conn.query('select * from senders_email_data',function(err,result,fields){


     var allsenders=[];allsenders=result;
  console.log(allsenders); 
    
     conn.query('select * from mail_templ ',function(sqlerr,sqlTemplateResult,sqlfield){
       var templateData =sqlTemplateResult;
       console.log(templateData);
      
      
      

 
      conn.query('select * from mailsendto',function(mailToErr,mailToResult,mailToField){
         if (err) console.log(mailToErr);
         var mailTo =[];mailTo = mailToResult;
         console.log(mailTo.length);
         var allresponses;

         for (let i = 0; i < mailTo.length; i++) {   
              if(mailTo[i].total_mail_send < 1){ // Send mail only if one time mail is send

                  
                  var randomSender = Math.floor(Math.random() * allsenders.length);      
                  var mailsender ={}; mailsender =allsenders[randomSender];
                  var randMailTemplate = Math.floor(Math.random() * templateData.length);
                  
                  var tranport = nodemailer.createTransport({
              
                    service:'gmail',
                    auth:{
                        user: mailsender.email,
                        pass: mailsender.pass
                          }
                    });

                    var mailHtml =templateData[randMailTemplate].mail_template.replace(/'\r\n'/g,'<br>');
                  const message ={
                      from: mailsender.email, // Sender address
                      to: mailTo[i].email,         // List of recipients
                      subject: templateData[randMailTemplate].subject, // Subject line
                      text: mailHtml     // html body  
                }; 
              
                

                  tranport.sendMail(message,(error, info)=>{
                    if(error){           
                      res.end(JSON.stringify(error));
                    }else{
                      //Update mailsendto table + 1 when mail sended
                      conn.query("update mailsendto set total_mail_send = total_mail_send + 1 where email = '" + mailTo[i].email+"'");
                          allresponses ="Mail send successfully Code: "+ info.response +" <br>";
                          console.log(allresponses);
                          res.end(allresponses);       

                    
                    }
                    });       
                    console.log('before');
                    sleep(Math.floor( Math.random()*10000));  //Mails are send after the Random interval 
                    console.log('After');
              }
            
       }
       
      
     });  


     });
 });
 


})




app.post('/deleteTemplate',(req,res)=>{
 
  console.log(req.body);
    var qry= 'delete from mail_templ where temp_id ='+ req.body.temp_id;
    
   conn.query(qry,(err,result)=>{
     if (err)  res.status(200).send('Error in Template deletion');
      res.status(200).json({
        status:'Template is delete successfully',
        response:result
        
      });
   });
})
//All senders data is hear
app.get('/users',function(req,res){

  conn.query('select * from senders_email_data',function(err,result,fields){
    if(!err) res.end(JSON.stringify(result));

  });
});
app.post('/deleteAllUsers',(req,res)=>{
  conn.query('truncate table  mailsendto',(err,result)=>{
    if (err) res.status(200).send('Error to')

  });
})

//All Recivers data is hear
app.get('/mailrecivers',function(req,res){
  conn.query('select * from  mailsendto',function(err,result,fields){
    if(!err) res.end(JSON.stringify(result));
  });
});

//Mail Template data
app.get('/mailtemp',function(req,res){

  conn.query('select * from mail_templ',function(err,result,fields){
    if(!err)  res.end(JSON.stringify(result));

  });
});


//Delete senders data
app.post('/delete',function(req,res){
  var postdata = req.body;
  conn.query('delete from senders_email_data where sno = '+ postdata.sno ,function(err,result,fields){
    if(err) throw err;
    res.end(JSON.stringify(result));

  });
});

//Add new mail sender 
app.post('/adduser',function(req,res){
  var postdata = req.body;
  var qry = "insert into senders_email_data(name,email,pass) VALUES ('"+postdata.name +"','"+postdata.email +"','"+postdata.pass+"')";
 console.log(qry);
  conn.query(qry,function(err,result,fields){
    if(err) throw err;
    res.end(JSON.stringify(result));

  });
});





app.post('/newEmailTemplate',(req,res)=>{
  var postData=req.body;
    var qry ='insert into  mail_templ ( subject , mail_template)  values ('+ mysql.escape( postData.subject) +','+mysql.escape(postData.mail_template)+')';
  try{
 
    conn.query(qry,(err,result)=>{
      res.status(200).send('New template is created!');
    })
  }catch(err)
  {
    res.send('Error in data insertion');
  }
})
app.post('/editemailtemplate',(req,res)=>{
  var postData=req.body;
    var qry ='UPDATE mail_templ set subject ='+ mysql.escape( postData.subject) +',  mail_template ='+mysql.escape(  postData.mail_template)+' where temp_id ='+postData.temp_id;
    try{
      console.log(qry);
    conn.query(qry,(err,result)=>{
      if(err) console.log(err);
      res.status(200).send(' Template is updated!');
      
    })
  }catch(err)
  {
    res.send('Error in data Update');
  }
})



//send-mail elctron app to update senders data
app.post('/update',function(req,res){
  var postData = req.body
  var qry ="update senders_email_data set `email` = '"
            +postData.email+"' ,`name` = '"
            +postData.name+"' ,pass = '"
            +postData.pass+
            "' where `senders_email_data`.`sno` = "
            +postData.sno;
  console.log(qry);
  conn.query( qry ,function(err,result,fields){
    if(err) throw err;
    res.end(JSON.stringify(result));

  });
});

// All New mails are added into database hear By using python script
app.post('/addNewEmails',(req,res)=>{
  var keyWord =  req.body.keyword;
 

let options = {
  mode: 'text',  
  pythonOptions: ['-u'], // get print results in real-time  
  args: keyWord.replace(/ /g,"+")
};
console.log(options);
  PythonShell.run( __dirname+ './pythonScript.py', options, function (err, result) {
    if(err) throw err;
      console.log(result);
      var flag=0;
      try{
      for (let i = 0; i < result.length; i++) {
      
      var email ='';
  
      if(result[i].slice(-1) == '.')
      {
        email =  result[i].substr(0,result[i].length -1);
      }else{
        email =result[i];
      }
      console.log(email);
      var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      if(email.match(mailformat)) // validate the email Address
      {          
        flag++;
        conn.query('INSERT into mailsendto (email) values('+mysql.escape(email)+')',function(err,newresult){
          console.log(JSON.stringify(newresult));
        })  
      } 
    
        
      }
    }catch (err)
    {
      console.log('Something Went Wrong')
    }
      res.send('Total '+flag+' New Emails are found And Added to Recivers list');
  
  });
 




})

app.post('/login',function(req,res){
  var postData = req.body;

   var qry ='select password,email from users where email = '+ mysql.escape(postData.email) ;
 
     conn.query(qry,function(err,result,fields){
      if (err) { throw err;}
       else {
          //res.end(  JSON.stringify(result));
             if(result[0].password === postData.password )
             {
              res.end('{"true"}');
             }else{
              res.end('{"Password is incorrect"}');
             }
           
      }
      throw "Username is incorrect";
    
      
  });
});

    
