const $ = require('jquery');
var host = sessionStorage.getItem("hostname");

$(document).ready(()=>{    
  console.log(host);
           
            
              fatchAllUsers();
              
           
            
  

  
  setInterval(()=>{
  $.ajax({
    url: host+'/mailtemp',
    method:'GET', 
    dataType : "json",
    contentType: "application/json; charset=utf-8",
    success:  data=>{  
        
     var a= data;
     document.getElementById('mailData').innerHTML;      
     var allData='';
    for (let i = 0; i < a.length; i++) {
                allData += '<tr><td>'+a[i].temp_id+
                   '</td><td>'+a[i].subject+
                   '</td><td>'+
                   '<button class="btn btn-warning" onclick=" modeltemplate(`'+a[i].temp_id+'`,`'+a[i].subject+'`,`'+a[i].mail_template +'`);showMod3()">Edit</button>'+'</td></tr>';
                         
    }
   $('#mailData').html(allData);    

  }
  });
},3000);

  
  setInterval(()=>{ 
   
     
  $.ajax({
   url: host +'/mailrecivers',
   method:'GET', 
   dataType : "json",
   contentType: "application/json; charset=utf-8",
   success:  data=>{  
    var a = data;
          
    var allData='';
        for (let i = 0; i < a.length; i++) {
                    allData += '<tr><td>'+a[i].sno+
                        '</td><td>'+a[i].email+
                        '</td><td>'+a[i].total_mail_send;
            
        }     
       
        $('#mailRecivers').html(allData);    
   }  
  })
  
},1000);





  $('#SendTemplate').submit(function(e){   
    e.preventDefault();
    if(confirm('Are You Want to Send mails to all the Reciver ?'))
    {
    $.ajax({
      data:$('#SendTemplate').serializeArray(),
      url: host+'/mail',
      type:'POST',      
      cache: false,      
      success:function(data){alert(data +'. Please wait, Mails are Sending'); }
    });
    
  }
  });


  
  $('#editEmailTemplate').submit(function(e){   
    e.preventDefault();
    $.ajax({
      data:$('#editEmailTemplate').serializeArray(),
      url: host+'/editemailtemplate',
      type:'POST',      
      cache: false,      
      success:function(data){console.log(data);}

    });
    console.log($('editEmailTemplate').serializeArray());
  });

  $('#deleteTemplate').click((e)=>{

  e.preventDefault();
  if(confirm('Are you sure to delete th template.'))
  {
    
    $.ajax({
      data:$('#temp_id').serializeArray(),
      url:host + '/deleteTemplate',
      type:'POST',
      cache:false,
      success:(data)=>{
       alert(data.status);
     

      }
    });
    
  }
})

  
  $('#newEmailTemplate').submit(function(e){   
    e.preventDefault();
    $.ajax({
      data:$('#newEmailTemplate').serializeArray(),
      url: host+'/newEmailTemplate',
      type:'POST',      
      cache: false,      
      success:function(data){
        alert(data);
    
      }

    });
    
  });
  
// Add new email id
  $('#newUser').on('submit',function(e){
   
    e.preventDefault();


    $.ajax({
      data:$('#newUser').serializeArray(),
      url: host+'/adduser',
      type:'POST',      
      cache: false,      
      success:function(data){alert(data)}

    });
  
    
  });

$('#deleteAllUsers').click(function(e){
  e.preventDefault();
  if (confirm('Are you sure to delete all the Emails from This list'))
  {
    if(confirm('Emails are Not Recover again.'))
    {
      $.ajax({
        url: host+'/deleteAllUsers',
        type:'POST',      
        cache: false,      
        success:function(data){alert('All the Emails are Deleted Successfully'); }
    
      });
    }
  }

})

  $('#updateForm').submit(function(e){
   
   e.preventDefault();
  
  
   $.ajax({
     data:$('#updateForm').serializeArray(),
     url: host+'/update',
     type:'POST',      
     cache: false,      
     success:function(data){alert('Details are updated!! Plz Refresh for Changes ') }
  
   });
  
  });

  //Delete the details
  $('#deletereco').on('click',function(e){
   if(confirm("Do you want to delete record"))
   {
    e.preventDefault();
   
   
    $.ajax({
      data:$('#sno').serializeArray(),
      url: host+'/delete' ,
      type:'POST',      
      cache: false,      
      success:function(data){alert('Details are Deleted!!')},   
    });

  
   }
   });
  
  

   $('#keywordForm').submit(function(e){
    e.preventDefault();
    const newhost = host +'/addNewEmails';
    
    $.ajax({
     url:newhost,
     type:'POST',
     cache:false,
     data: $('#keywordForm').serializeArray(),
     success:function(data){
      $('#loadgif').hide();
       $('#addemailresult').show();
       $('#addemailresult p').text(data);
       
     }
    });
  })
 
});

function modeltemplate(temp_id,EmailSub,TemplHTML)
{
  $('#temp_id').val(temp_id);
  $('#EmailSub').val(EmailSub);
  $('#TemplHTML').val(TemplHTML);
}


function showSendmail()
{
  $('#emailSender').hide();
  $('#sendMails').show();
  //$('#sendMails').load('emailSenders.html');
  $('#users').hide();
  $('#addemails').hide()
}
function users()
{
  $('#emailSender').hide();
  $('#sendMails').hide();
  $('#users').show();
  $('#addemails').hide()

}
function showEmailsenders()
{
  $('#emailSender').show();
  $('#sendMails').hide();
  $('#users').hide();
  $('#addemails').hide()

}
function addEmails()
{
  $('#emailSender').hide();
  $('#sendMails').hide();
  $('#users').hide();
  $('#addemails').show();
}






function fatchAllUsers(){
  
  setInterval(()=>{
    $.ajax({
      url: host+'/users',
      method:'GET', 
      dataType : "json",
      contentType: "application/json; charset=utf-8",
      success: data=>{
    try { 
        
       
            var a= data;
            document.getElementById('data').innerHTML;      
            var allData='';
            for (let i = 0; i < a.length; i++) {
                        allData += '<tr><td>'+a[i].sno+
                          '</td><td>'+a[i].name+
                          '</td><td>'+a[i].email+
                          '</td><td>'+
                          '<button class="btn btn-warning" onclick=" modelValue(`'+a[i].sno+'`,`'+a[i].name+'`,`'+a[i].email+'`,`'+a[i].pass+'`);showMod()">Edit</button>'+'</td></tr>';                           
            }
           $('#data').html(allData);    

 
        } catch (error) {
              console.log(error);
        }
      }
  });
},3000);
  
}