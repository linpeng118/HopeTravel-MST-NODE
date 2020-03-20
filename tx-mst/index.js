var express = require('express');
var router = express.Router();
var fs = require('fs');
var COS = require('cos-nodejs-sdk-v5');

var cos = new COS({
    SecretId: 'AKIDdcLo20tGYblgLmrHL9i7HBrHgqkPvCDz',
    SecretKey: 'gDVXKxMXUCk9ICwRggQ0LRIyRfeOyJPG',
});

var tengxun_cos = {
    Bucket: 'img-1300320774',
    Region: 'ap-chengdu',
}
var multer  = require('multer')
var upload = multer({ dest: './tmp/' })
// 图片上传
router.all('/api/tengxun/upload', upload.single('file'), function(req, res, next){
    // 文件路径
    var filePath = './' + req.file.path;  
    // 文件类型
    var temp = req.file.originalname.split('.');
    var fileType = temp[temp.length - 1];
    var lastName = '.' + fileType;
    // 构建图片名
    var fileName = Date.now() + lastName;
    // 图片重命名
    fs.rename(filePath, fileName, (err) => {
        if (err) {
            res.end(JSON.stringify({status:'102',msg:'文件写入失败'}));   
        }else{
            var localFile = './' + fileName;  
            var key = fileName;

            // 腾讯云 文件上传
            var params = {
                Bucket: tengxun_cos.Bucket,                         /* 必须 */
                Region: tengxun_cos.Region,                         /* 必须 */
                Key: key,                                           /* 必须 */
                FilePath: localFile,                                /* 必须 */
            }
            cos.sliceUploadFile(params, function(err, data) {
              if(err) {
                fs.unlinkSync(localFile);
                res.end(JSON.stringify({status:'101',msg:'上传失败',error:JSON.stringify(err)}));   
              } else {
                fs.unlinkSync(localFile);
                var imageSrc ='https://img-1300320774.cos.ap-chengdu.myqcloud.com/' + data.Key;
                res.end(JSON.stringify({status:'100',msg:'上传成功',imageUrl:imageSrc}));
              }
            });
        }
    });
})
