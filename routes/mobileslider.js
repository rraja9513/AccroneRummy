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
let Mobileslider=require('../models/mobileslider.model');
router.route('/').post((req, res) => {
    Mobileslider.find()
      .then(mobilesliders => res.json(mobilesliders))
      .catch(err => res.status(400).json('Error: ' + err));
  });
  router.route('/:id').get((req, res) => {
    Mobileslider.findById(req.params.id)
      .then(mobilesliders => res.json(mobilesliders))
      .catch(err => res.status(400).json('Error: ' + err));
  });
  router.post('/add',upload.single('image'),(req,res,next)=>{
    const title = req.body.title;
    const image = req.file.path;
    const newMobileslider=new Mobileslider({
      title,
      image
    })
    newMobileslider.save()
  .then(() => res.json('Mobileslider added!'))
  .catch(err => res.status(400).json('Error: ' + err));
});
router.post('/update/:id',upload.single('image'),(req,res,next)=>{
  Mobileslider.findById(req.params.id)
    .then(mobileslider => {
      mobileslider.title = req.body.title;
      mobileslider.image = req.file.path;
      mobileslider.save()
        .then(() => res.json('Mobileslider updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});
router.route('/:id').delete((req, res) => {
  Mobileslider.findByIdAndDelete(req.params.id)
    .then(() => res.json('Mobileslider deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});
router.route('/delete').post(async(req,res)=>{
  const ids=req.body.arrayids;
  await Mobileslider.deleteMany({_id:{$in:ids}})
  res.status(200).json({ message: 'Deleted Successfully'});
});
 module.exports=router;