const express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
const cors=require('cors');
const corsOption = function(req,res,next){
        res.header('Access-Control-Allow-Origin','*');
        res.header('Access-Control-Allow-Methods','GET,POST,PUT,DELETE');
        res.header('Access-Control-Allow-Headers','Content-Type');
        res.header('Access-Control-Allow-Credentials','true');
        res.header("Cache-Control","no-cache");
        next();
};
const app = express();
app.use(corsOption);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// 配置静态资源目录 整一个文件夹 通过域名能访问
//app.use(express.static(path.join(__dirname,"../static")));
//数据模型
//路由配置
//const upload=require('./router/upload.js');
//app.use('/upload',upload);
//const api=require('./router/api.js');
//app.use('/dayin',api);
app.post('/api/img',(req,res)=>{
	res.send('mst-img').end()
	console.log('img')
})


app.listen(8001, () => console.log("服务器开启"));
