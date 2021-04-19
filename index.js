const express= require('express');
const app=express();
const path=require('path');
const Files=require('./image');
const mongoose=require('mongoose');
const fileUpload = require('express-fileupload');


app.set('view engine','ejs')
app.set('views',path.join(__dirname,'/views'));
app.use(express.static(path.join(__dirname, '/public')));

app.use(fileUpload());

mongoose.connect('mongodb://localhost:27017/saveFiles', { useNewUrlParser: true, useUnifiedTopology: true})
.then((res)=>{
   console.log("successfully connected to database u can work now");
})
.catch((err)=>{
  console.log('oh no error aa gya');
  throw err;
});

app.get('/',async(req,res)=>{
    const obj =await Files.find({});
  res.render('index',{'obj':obj});
});

app.post('/upload', function(req, res) {
   if(!req.files|| Object.keys(req.files).length === 0)
    res.status(200).send("error aa rahe ha");
    const newPath=__dirname+'\\public\\Images\\'+req.files.sampleFile.name;
    req.files.sampleFile.mv(newPath,(err)=>{
     if(err)
      res.status(500).send('not able to upload file');
    });
    const obj=new Files({file:'Images\\'+req.files.sampleFile.name,tdate:req.body.td});
    obj.save();
    res.redirect('/');
});


app.listen(3000,()=>{
  console.log('App is running on 3000...');
});