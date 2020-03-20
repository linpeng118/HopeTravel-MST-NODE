
var express = require('express')
var router = express.Router()

const {connection,multer,app} = require('../connect')

//获取国家
router.get('/country',(req,res)=>{
	connection.query(`SELECT * FROM country`,(err,data)=>{
		if(err){
			res.status(500).send(err).end();
}
		else{
			res.status(200).send({code:0,data:data}).end()
}
})
})

//获取分类
router.get('/category',(req,res)=>{
	connection.query(`SELECT * FROM category WHERE status = ${req.query.status}`,(err,data)=>{
		if(err){
			res.status(500).send(err).end();
}
		else{
			res.status(200).send({code:0,data:data}).end();
}
})
})

module.exports = router
