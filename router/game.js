var express = require('express')
var router = express.Router()//GET 分类列表

const {connection,multer,app} = require('../connect')

//Gamelist GET
router.get('/list',(req,res)=>{
	connection.query(`SELECT * FROM game`,(err,data)=>{
		if(err){
			res.status(500).send(err).end();
}
		else{
			res.status(200).send({code:0,data:data}).end()
}
})
})
