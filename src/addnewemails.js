app.post('/addNewEmails',(req,res)=>{
    var keyWord = req.body.keyword;
    console.log(keyWord);
    
  
    var options={
      mode:'text',   
      args:[keyWord]
    }
  console.log(options);
  
    
  
    PythonShell.run( './pythonScript.py',options,(err,result)=>{
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
  
    
    })
  
  });