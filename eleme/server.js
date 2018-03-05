const express = require('express');
const app = express();
const appData = require('./data.json');
const seller = appData.seller;
const goods = appData.goods;
const ratings = appData.ratings;
app.get('/api/ratings',(req,res,next)=>{
	res.json({
		errno:0,
		data:ratings
	})
})
app.get('/api/seller',(req,res,next)=>{
	res.json({
		errno:0,
		data:seller
	})
})
app.get('/api/goods',(req,res,next)=>{
	res.json({
		errno:0,
		data:goods
	})
})
app.use(express.static("./dist"));
app.listen(3000,()=>{
	console.log("服务端口启动在3000端口")
})