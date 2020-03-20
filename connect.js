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
    database: 'HopeTravelMst',               //库名
    port: 3306
});


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

module.exports = {connection,multer,app}
