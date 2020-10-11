# `This is Bulk mailer especially  made in Node js, Electrone Js, HTML.
# 🙏Please contribute on it.

# Step1:-
    Create database and insert tables

    CREATE DATABASE artifex; 

    use artifex;
       
       CREATE TABLE IF NOT EXISTS senders_email_data(
        sno int NOT NULL AUTO_INCREMENT, 
        name varchar(30) DEFAULT NULL, 
        email varchar(50) DEFAULT NULL, 
        pass varchar(50) DEFAULT NULL, 
        PRIMARY KEY (sno), 
        UNIQUE KEY email (email)
                );
   
    CREATE TABLE IF NOT EXISTS mail_templ (
      temp_id int NOT NULL AUTO_INCREMENT, 
      subject varchar(39) DEFAULT NULL, 
      mail_template varchar(1200) NOT NULL, 
      PRIMARY KEY (temp_id), 
      UNIQUE KEY subject (subject)
    );
    
    CREATE TABLE IF NOT EXISTS mailsendto (
      sno int NOT NULL AUTO_INCREMENT, 
      email varchar(40) DEFAULT NULL, 
      total_mail_send int(11) DEFAULT 0, 
      PRIMARY KEY (sno), 
      UNIQUE KEY email (email)
    );
   
    CREATE TABLE IF NOT EXISTS user_details (
      sno int NOT NULL AUTO_INCREMENT, 
      name varchar(40) DEFAULT NULL, 
      email varchar(40) DEFAULT NULL, 
      phone varchar(13) DEFAULT NULL, 
      ipv4_add varchar(12) DEFAULT NULL, 
      pro_detail varchar(540) DEFAULT NULL, 
      PRIMARY KEY (sno)
    );

     CREATE TABLE host_data (
        id int(11) NOT NULL AUTO_INCREMENT,
        host_name varchar(70) NOT NULL DEFAULT 'http://127.0.0.1:3000',
        PRIMARY KEY (id)
        ); 

# Step2:-Enter command
           
     send-email>npm install
     send-email>cd src
     send-email/src>node host.js

    This command create a server for index.html 


# Step3:-Create Node server by Entering command       
           
    send-email/src>node server.js


    Create Node server from ./day6/index.js

 #   Step3:-Create react forged app by Enter command
          send-mail>npm start
          
