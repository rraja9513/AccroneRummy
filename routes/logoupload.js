const router=require('express').Router();
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
    if (file.mimetype === 'image/png') {
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
let Logoupload=require('../models/logoupload.model');
router.route('/').post((req, res) => {
    Logoupload.find()
      .then(logouploads => res.json(logouploads))
      .catch(err => res.status(400).json('Error: ' + err));
  });
  router.route('/:id').get((req, res) => {
    Logoupload.findById(req.params.id)
      .then(logouploads => res.json(logouploads))
      .catch(err => res.status(400).json('Error: ' + err));
  });
  router.post('/add',upload.single('image'),(req,res,next)=>{
    const image = req.file.path;
    const newLogoupload=new Logoupload({
      image
    })
    newLogoupload.save()
  .then(() => res.json('Logoupload added!'))
  .catch(err => res.status(400).json('Error: ' + err));
});
router.post('/update/:id',upload.single('image'),(req,res,next)=>{
  Logoupload.findById(req.params.id)
    .then(logoupload => {
      logoupload.image = req.file.path;
      logoupload.save()
        .then(() => res.json('Logoupload updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});
router.route('/:id').delete((req, res) => {
  Logoupload.findByIdAndDelete(req.params.id)
    .then(() => res.json('Logoupload deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});
router.route('/delete').post(async(req,res)=>{
  const ids=req.body.arrayids;
  await Logoupload.deleteMany({_id:{$in:ids}})
  res.status(200).json({ message: 'Deleted Successfully'});
});
 module.exports=router;