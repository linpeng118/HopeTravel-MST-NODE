var express = require('express')
var router = express.Router()//GET 分类列表

const {connection,multer,app} = require('../connect')

router.get('/list',(req,res) => {
    let result = req.query;
        if(result.keyword){
    connection.query(`SELECT * FROM category WHERE (CONCAT (IFNULL(name,''),IFNULL(description,'')) like '%${result.keyword}%' OR category_id='${result.keyword}') LIMIT ${(result.page-1)*result.page_size},${result.page_size}`, (err, data) => {

         if (err) {
            res.status(500).send(err).end();
        }else{
        connection.query(`SELECT COUNT(*) FROM category`,(errCount,count)=>{
        if(errCount){
        res.status(500).send(errCount).end();
}
        else{
        res.status(200).send({code:0,data:data,total:count}).end();
}
})
        }
    });

                        }
	else{
        	connection.query(`SELECT * FROM category LIMIT ${(result.page-1)*result.page_size},${result.page_size}`,(err,data)=>{
        if(err){
                res.status(500).send(err).end();
}
        else{
        connection.query(`SELECT COUNT(*) FROM category`,(errCount,count)=>{
                if(errCount){
                res.status(500).send(errCount).end();
}
                else{
                res.status(200).send({code:0,data:data,total:count}).end();
}
})
}
})
}
});

//GET 分类详情
router.get('/:id',(req,res)=>{
        connection.query(`SELECT * FROM category WHERE category_id =`+req.params.id,(err,data)=>{
                if(err){
                        res.status(500).end();
}
                else{
                        res.send({code:0,data:data[0]}).end();
}
})
})

//PUT 分类状态
router.put('/cancel/:id',(req,res)=>{
        //res.send(req.body.status).end()
        connection.query(`UPDATE category SET status = `+req.body.status+ ` WHERE category_id = `+req.params.id,(err,data)=>{
                if(err){
                        res.status(500).send(err).end();
}
                else{
                        res.status(200).send({code:0,msg:"分类状态修改成功!"}).end();
}
})
})

//PUT 分类详情
router.put('/:id',(req,res)=>{
        connection.query(`UPDATE category SET name = '${req.body.name}',description = '${req.body.description}',status=${req.body.status} WHERE category_id = ${req.params.id}`,(err,data)=>{
                if(err){
                        res.status(500).send(err).end();
}
                else{
                        res.status(200).send({code:0,msg:"分享详情编辑成功!"}).end();
}
})
})

//POST 分类详情
router.post('/detail',(req,res)=>{
        connection.query(`INSERT INTO category (name,description,status) VALUES ('${req.body.name}','${req.body.description}','${req.body.status}')`,(err,data)=>{
                if(err){
                        res.status(500).send(err).end();
}
                else{
                        res.status(200).send({code:0,msg:"添加分类成功!"}).end();
}
})
})

//DELETE 分享详情
router.delete('/:id',(req,res)=>{
        connection.query(`DELETE FROM category WHERE category_id = ${req.params.id}`,(err,data)=>{
                if(err){
                        res.status(500).send(err).end();
}
                else{
                        res.status(200).send({code:0,msg:"删除分类成功!"}).end();
}
})
})

module.exports = router
