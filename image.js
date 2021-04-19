const mongoose=require('mongoose');
const FileSchema=new mongoose.Schema({
    file:{
      type:String
   },
   tdate:{
    type:Date,
    default:Date.now
   }
});
module.exports= mongoose.model('Files',FileSchema);