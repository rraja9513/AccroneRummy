const router=require('express').Router();
const passport=require('passport');
const multer=require('multer');
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './uploads/');
  },
  filename: function(req, file, cb) {
      cb(null, Date.now() + file.originalname);  
  }
});
const fileFilter = (req, file, cb) => {
  // reject a file
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(null, false);
  }
};
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5
  },
  fileFilter: fileFilter
});
// const upload=multer({dest:'uploads/'});
let User=require('../models/user.model');
router.route('/').post((req, res) => {
    User.find()
      .then(users => res.json(users))
      .catch(err => res.status(400).json('Error: ' + err));
  });
  router.route('/:id').get((req, res) => {
    User.findById(req.params.id)
      .then(users => res.json(users))
      .catch(err => res.status(400).json('Error: ' + err));
  });
  router.route('/search').post((req, res) => {
    User.find({$or:[{fullname:req.body.name},{adharnumber:req.body.name},{pannumber:req.body.name},{drivinglicencenumber:req.body.name}]})
      .then(users => res.json(users))
      .catch(err => res.status(400).json('Error: ' + err));
  });
  router.route('/signup').post((req,res)=>{
  const Users=new User({fullname:req.body.fullname,phonenumber:req.body.phonenumber,email:req.body.email,username:req.body.username});   
        User.register(Users,req.body.password,function(err,user){
            if(err)
            {
              var redir = { returnCode: "Failure",
                            returnMsg:"User Already Registered"};
                            return res.json(redir);
                          }
            else{
                passport.authenticate("userLocal")(req,res,function(){
                    if (req.user) {
                        var redir = { returnCode: "Success",
                                      returnMsg:"User registered Successfully"};
                        return res.json(redir);
                  } else {
                    res.status(400).json({ message: 'SignupFailed' });
                  }
                });
            }
        })
    });
router.route('/login').post((req,res)=>{
   if(!req.body.email){
    res.json({success: false, message: "email  was not given"})
  } else {
    if(!req.body.password){
      res.json({success: false, message: "Password was not given"})
    }else{
      passport.authenticate('userLocal', function (err, user, info) { 
         if(err){
           res.json({success: false, message: err})
         } else{
          if (! user) {
            var redir={
                Code:"Fa",
                Msg:"Login Failed"
            }
            return res.json(redir)
          } else{
            req.login(user, function(err){
              if(err){
                res.json({success: false, message: err})
              }
              else{
                  var redir={
                      Code:"Su",
                      Msg:"Login Success",
                      id:user._id
                  }
                  return res.json(redir)
              }
            })
          }
         }
      })(req, res);
    }
  }
 });
 router.route('/forgotpassword').post((req,res)=>{
    User.findOne({ email: req.body.email })
    .then((user) => {
        user.setPassword(req.body.password,(err, user) => {
            if (err) return next("User Not Found");
            user.save();
            res.status(200).json({ message: 'Successful Password Reset' });
        });
    })
    .catch((err)=>{
      res.json("User  Not  Found")
    })
});
 router.route('/changepassword').post((req,res)=>{
  User.findOne({ email: req.body.email })
  .then((user) => {
      user.changePassword(req.body.oldpassword, req.body.newpassword,(err, user) => {
          if (err) return next(err);
          user.save();
          res.status(200).json({ message: 'Password Change Successful' });
      });
  })
  .catch((err)=>{
    res.json("User  Not  Found")
  })
});
router.post('/update/:id',upload.array('documents',4),(req,res,next)=>{
    User.findById(req.params.id)
      .then(user => {
        user.adharnumber = req.body.adharnumber;
        user.pannumber = req.body.pannumber;
        user.drivinglicencenumber=req.body.drivinglicencenumber;
        user.passportnumber=req.body.passportnumber;
        user.adhardocument=req.files[0].path;
        user.pandocument=req.files[1].path;
        user.drivinglicencedocument=req.files[2].path;
        user.passportdocument=req.files[3].path;
        user.save()
          .then(() => res.json('User updated!'))
          .catch(err => res.status(400).json('Error: ' + err));
      })
      .catch(err => res.status(400).json('Error: ' + err));
  });
  router.route('/:id').delete((req, res) => {
    User.findByIdAndDelete(req.params.id)
      .then(() => res.json('User deleted.'))
      .catch(err => res.status(400).json('Error: ' + err));
  });
  router.route('/delete').post(async(req,res)=>{
    const ids=req.body.arrayids;
    await User.deleteMany({_id:{$in:ids}})
    res.status(200).json({ message: 'Deleted Successfully'});
  });
 module.exports=router;