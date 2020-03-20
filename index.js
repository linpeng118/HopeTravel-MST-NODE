
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
const fs = require('fs');
const path = require('path');
var multer = require('multer');
const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',         //数据库地址
    user: 'root',                //用户
    password: 'Linpeng19980608.',           //密码
    database: 'HopeTravelMST',               //库名
    port: 3306
});

const corsOption = function(req,res,next){
	res.header('Access-Control-Allow-Origin','*');
	res.header('Access-Control-Allow-Methods','GET,POST,PUT,DELETE,OPTIONS');
	res.header('Access-Control-Allow-Headers','Content-type');
	res.header('Access-Control-Allow-Credentials','true');
	res.header("Cache-Control","no-cache");
	next();
}

//app.use(corsOption);
app.all("*",function(req,res,next){
    //设置允许跨域的域名，*代表允许任意域名跨域
    res.header("Access-Control-Allow-Origin","*");
    //允许的header类型
    res.header("Access-Control-Allow-Headers","content-type");
    //跨域允许的请求方式 
    res.header("Access-Control-Allow-Methods","DELETE,PUT,POST,GET,OPTIONS");
    if (req.method.toLowerCase() == 'options')
        res.send(200);  //让options尝试请求快速结束
    else
        next();
})
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

connection.connect();

//function Result({code:1,message:'',data:{}}){
	//this.code = code;
	//this.message = message;
	//this.data = data; 
//}
 app.get('/api/img',(req,res)=>{
	res.send('img').end();
	console.log('img')
})
//app.use(express.static(path.join(__dirname,"../static")))
var upload=multer({dest:'uploads/'})
//图片上传必须用post方法
app.post('/img',upload.single('uploadFile'),(req,res)=>{
console.log(req);
    fs.readFile(req.file.path,(err,data)=>{
        //如果读取失败
   if(err){return res.send('上传失败')}
    //如果读取成功
    //声明图片名字为时间戳和随机数拼接成的，尽量确保唯一性
    let time=Date.now()+parseInt(Math.random()*999)+parseInt(Math.random()*2222);
   // 拓展名

    let extname=req.file.mimetype.split('/')[1]

    //拼接成图片名
    let keepname=time+'.'+extname
    //三个参数
    //1.图片的绝对路径
    //2.写入的内容
    //3.回调函数
    fs.writeFile(path.join(__dirname,'./uploads/'+keepname),data,(err)=>{
        if(err){return res.send(err)}
        res.send({err:0,msg:'上传ok',data:keepname})
    });
 });
})



//GET FOODS 
app.get('/api/foods',(req,res) => {
    console.log("api food test");
    let result = req.query;
    connection.query(`SELECT * FROM food LIMIT `+result.offset+','+result.limit, (err, data) => {
        if (err) {
            res.status(500).send(err).end();
        }else{
            res.status(200).json(data);
        }
    });
});
//POST MODIFY FOOD
app.post('/api/modifyFood/:food_id',(req,res) => {
	let result = req.params;
	connection.query(`UPDATE food SET `)
})
//POST ADD FOOD
app.post('/api/addFood',(req,res) => {
	let result = req.body;
	connection.query(`INSERT INTO food VALUES('${result.name}','${result.restaurant_name}',NULL,${result.restaurant_id},'${result.description}',${result.packing_price},${result.price},NULL,NULL)`,(err,data) => {
	if(err){
		res.status(500).send(err).end();
}
	else{
		res.status(200).json({'status':0,'msg':'ADD FOOD SUCCESS'});
}
})
})
//GET RESTAUTANR DETAIL
app.get('/api/restaurant/:restaurant_id',(req,res) => {
	connection.query(`SELECT * FROM restaurant WHERE id= `+req.params.restaurant_id,(err, data) => {
		if(err){
		res.status(500).send('err').end();
		}else{
           	 res.status(200).json({'status':0,'data':data[0]});
		}
})
})
//GET RESTAURANTS
app.get('/api/restaurants',(req,res) => {
	let result = req.query;
	connection.query(`SELECT * FROM restaurant LIMIT `+result.offset+','+result.limit,(err,data) => {
		if(err){
			res.send(err).end();
}
		else{
			res.json(data);
}
})
})
//POST ADD RESTAURANT
app.post('/api/addRestaurant',(req,res) => {
	let result = req.body;
	connection.query(`INSERT INTO restaurant VALUES(NULL,'${result.name}','${result.address}',${result.phone},'${result.description}',${result.delivery_price},${result.transport_price},'${result.startTime}','${result.endTime}')`,(err,data) => {
	if(err){
		res.send(err).end();
}
	else{
		res.status(200).json({'status':0,'msg':'add restaurant success'})
}
})
})
//DELETE RESTAURANT DETAIL
app.post('/api/deleteRestaurant/:id',(req,res) => {
	connection.query(`DELETE FROM restaurant WHERE id =`+req.params.id,(err,data) => {
	if(err){
		res.status(500).send(err).end();
}
	else{
		res.status(200).json({'status':0,'msg':'DELETE RESTAURANT SUCCESS'});
}
})
})
//DELETE FOOD
app.post('/api/deleteFood/:food_id',(req,res) => {
	console.log("food delete");
	connection.query(`DELETE FROM food WHERE food_id =`+ req.params.food_id,(err,data) => {
	console.log(err,data);	
	if(err){
			res.status(500).send(err).end();
}
		else{
	                res.status(200).json({'is_delete':1});
}
})
})
//ADMIN LOGIN
app.post('/api/login',(req,res) => {
	let user = req.body;
	connection.query(`SELECT * FROM login WHERE user_name='${user.user_name}'`, (err,result) => {
		if(err){
			res.status(500).send(err).end();
}
		else{
			if(user.user_name == result[0].user_name){
				if(user.password == result[0].password){
				res.status(200).json({'status':0,'msg': "Login success"});
				}

				else{
				res.status(500).json({'status':1,'msg': "UserName or password is error"});
					}
								}
		else{
			res.json({'status':2,'msg':'MANAGER IS NOT EXIST'});
		     }
			}
})
})
//GET MANAGERS
app.get('/api/getManagers',(req,res) => {
	let result = req.query;
	connection.query(`SELECT * FROM manager LIMIT `+result.offset+','+result.limit,(err,data)=>{
		if(err){
			res.status(500).send(err).end();
}
		else{
			res.status(200).json({'status':0,'data':data});
}
})
})
//POST ADD MANAGER
app.post('/api/addManager',(req,res) => {
	let result = req.body;
	connection.query(`INSERT INTO manager VALUES(NULL,'${result.user_name}','${result.age}',now(),'${result.address}')`,(err,data) => {
		if(err){
			res.status(500).send(err).end();
}
		else{
			res.status(200).json({'status':0,'msg':'ADD MANAGER SUCCESS'});
}
})
})
app.listen(8001);
console.log('server start'); 
