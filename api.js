module.default={
//获取数据接口
app.all('/api/test',(req,res) => {
    console.log("api test")
    connection.query(`SELECT * FROM food`, (err, data) => {
        if (err) {
            res.status(500).send('err').end();
        }else{
            res.json(data);
        }
    });
});
}
