const express=require('express');
const router=express.Router();
const fs =require('fs');
const path=require('path')
//上传图片的模板
var multer=require('multer');

const corsOpt = function(req,res,next){
	res.header('Access-Control-Allow-Origin','*');
	res.header('Access-Control-Allow-Methods','GET,POST,PUT,DELETE');
	res.header('Access-Control-Allow-Headers','Content-Type');
	res.header('Cache-Control','no-cache');
	next();
}
const app = express();
app.use(corsOpt);
//生成的图片放入uploads文件夹下
var upload=multer({dest:'uploads/'})
//图片上传必须用post方法
router.post('/img',upload.single('files'),(req,res)=>{
console.log(req);
 //   fs.readFile(req.file.path,(err,data)=>{
        //如果读取失败
   // if(err){return res.send('上传失败')}
    //如果读取成功
    //声明图片名字为时间戳和随机数拼接成的，尽量确保唯一性
    //let time=Date.now()+parseInt(Math.random()*999)+parseInt(Math.random()*2222);
    //拓展名
//if(req.file){
  //  let extname=req.file.mimetype.split('/')[1]
//}
    //拼接成图片名
  //  let keepname=time+'.'+extname
    //三个参数
    //1.图片的绝对路径
    //2.写入的内容
    //3.回调函数
    //fs.writeFile(path.join(__dirname,'../../static/img/'+keepname),data,(err)=>{
      //  if(err){return res.send('写入失败')}
        //res.send({err:0,msg:'上传ok'})
   // });
// });
})
module.exports=router;
