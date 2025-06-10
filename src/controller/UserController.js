const {User} =  require('../models');
const uploadProfileImage = async (req,res)=>{
  try {
    const user = await req.user;
 
    const dbuser = await User.findByPk(user.id) 
    
    if(!req.file) return res.status(400).json({msg:"no file uploaded"});
   
    dbuser.profileImage = req.file.filename;
    await dbuser.save();
    res.json({msg:"Profile image upload",filename:req.file.filename});
  } catch (err) {
    return res.status(500).json({ messages: err.message });
  }
} 

module.exports = uploadProfileImage;