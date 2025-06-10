const multer = require("multer");
const path = require('path');


const storage = multer.diskStorage(
    {
        destination:(req,file,cb)=>{
            cb(null , 'uploads/')
        },
        filename:(req,file,cb)=>{
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random()*1E9);
            console.log("uniqueSuffix",uniqueSuffix)
            cb(null,uniqueSuffix + path.extname(file.originalname));
        }
    }
)

const upload = multer({
    storage,
    limits:{fileSize:5*1024*1024},
    fileFilter:(req,file,cb)=>{
        const ext = path.extname(file.originalname).toLowerCase();
        console.log("ext",ext)
        if(ext!=='.jpg' && ext !='.jpeg' && ext!=='.png'){
            return cb(new Error('only images are allowed (.jpg, .jpeg, .png)'))
        }
        cb(null, true);
    }
});


module.exports = upload;