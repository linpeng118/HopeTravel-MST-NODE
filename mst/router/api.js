const express = require('express');
const router = express.Router()

router.get('/api/dayin',(req,res)=>{
	console.log("dayin");
	res.send("dayin").end();
})

module.exports=router;
