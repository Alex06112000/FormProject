const express = require('express');
var mysql=require('mysql');
var db = mysql.createConnection({
   host:'localhost',
   user:'root',
   password:'1a2s3dzxc@',
   database: 'nodemysql'
});
db.connect( (err)=>{
  if(err)throw err;
  console.log("Connected"); 
});
const app = express();
//Creatre db
app.get('/createbd',(req,res)=>{
let sql = 'CREATE DATABASE nodemysql';
db.query(sql,(err,result)=>{
  if(err)throw err;
  console.log(result);
  res.send('database created!');
})
});

// Create table 
app.get('/createpoststable', (req, res) => { 
   let sql = 'CREATE TABLE posts(id int AUTO_INCREMENT, FirstName VARCHAR(255), LastName VARCHAR(255), PRIMARY KEY(id))';
   db.query(sql, (err, result) => { if(err) throw err; 
   console.log(result);
   res.send('Posts table created...');
    }); 
   }); 
   app.get('/', (_, response)=>{
      response.render('form');
  });

  const bodyParser = require('body-parser');
  const urlEncodedParser = bodyParser.urlencoded({extended:false});

  app.set('view engine', 'ejs');
  
  app.get('/', (req, res)=>{
      res.render('forma');
  });


  app.post('/go',urlEncodedParser,(req, res)=>{

   let post = {FirstName:req.body.firstn, LastName:req.body.lastn};
   let sql = 'Insert into posts SET ?';
   let query = db.query(sql,post,(err,result)=>{
      if(err) throw err;   

      console.log(result);
   })

   db.query("SELECT * FROM posts", function (error, results, fields) {
      if (error) {
         throw err;
      }
      if (results.length  > 0) {
         var list=results;
         console.log(list);
         res.send(list);
      }
  });

});


app.listen('3000',()=>{
   console.log("Server started on port 3000");  
});





