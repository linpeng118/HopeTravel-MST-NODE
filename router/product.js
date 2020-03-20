var express = require('express')
var router = express.Router()

const { connection, multer, app } = require('../connect')
    //GET 产品列表
router.get('/list', (req, res) => {
    if (req.query.category_id != '' || req.query.country_id != '' || req.query.keyword != '') {
        connection.query(`SELECT product.product_id,product.img,product.name,
										product.origin_price,product.special_price,product.created_time,
										product.update_time,product.status,product.country_id,
										product.category_id FROM product INNER JOIN country
										 ON (product.country_id = country.country_id) INNER JOIN category 
										 ON (product.category_id = category.category_id) WHERE (product.category_id=${req.query.category_id} 
										 OR product.country_id=${req.query.country_id} OR ((CONCAT (IFNULL(product.name,'')) 
										 like '%${req.query.keyword}%') OR product.product_id=${req.query.keyword}))
											AND  product.status = ${req.query.status} 
											 LIMIT ${(req.query.page-1)*req.query.page_size},${req.query.page_size} `, (err, data) => {
            if (err) {
                res.status(500).send(err).end();
            } else {
                connection.query(`SELECT COUNT(*) FROM product WHERE status = ${req.query.status}`, (errCount, count) => {
                    if (errCount) {
                        res.status(500).send(errCount).end();
                    } else {
                        res.status(200).send({ code: 0, data: data, total: count }).end();
                    }

                })
            }

        })
    } else {
        connection.query(`SELECT * FROM product WHERE status = ${req.query.status} LIMIT ${(req.query.page-1)*req.query.page_size},${req.query.page_size}`, (err, data) => {
            if (err) {
                res.status(500).send(err).end();
            } else {
                connection.query(`SELECT COUNT(*) FROM product WHERE status = ${req.query.status}`, (errCount, count) => {
                    if (errCount) {
                        res.status(500).send(errCount).end();
                    } else {
                        res.status(200).send({ code: 0, data: data, total: count }).end();
                    }
                })
            }
        })
    }
})

//PUT 修改产品状态
router.put('/opt', (req, res) => {
    let datalist = req.body.data.toString();
    connection.query(`UPDATE product SET status = ${req.body.status} WHERE product_id in (${datalist})`, (err, data) => {
        if (err) {
            res.status(500).send(err).end();
        } else {
            res.status(200).send({ code: 0, msg: "修改产品状态成功!" }).end();
        }
    })
})

//DELETE 删除产品
router.delete('/:id', (req, res) => {
    connection.query(`DELETE FROM product WHERE product_id = ${req.params.id}`, (err, data) => {
        if (err) {
            res.status(500).send(err).end();
        } else {
            res.status(200).send({ code: 0, msg: "删除产品成功!" }).end();
        }
    })
})
module.exports = router