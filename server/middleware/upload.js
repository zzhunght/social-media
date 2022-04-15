const multer = require('multer')
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // nơi lưu tệp
      cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        // tên tệp
      const ext = file.mimetype.split('/')[1] // lấy jpeg
      cb(null, file.fieldname + '-' + Date.now()+'.' + ext)
    }
})
const isImage = (req,file, cb) =>{
    // chỉ những tệp là image mới được lưu
    if(file.mimetype.startsWith('image')){
        cb(null,true)
    }
    else{
        cb(new Error(' Only Image is allowed...'))
    }
}
const upload = multer({
    storage:storage,
    fileFilter:isImage,
})


const multi_upload = upload.array('photos',99)
const single_upload = upload.single('photo')
module.exports = {single_upload , multi_upload}
