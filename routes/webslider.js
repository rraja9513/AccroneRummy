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
let Webslider=require('../models/webslider.model');
router.route('/').post((req, res) => {
    Webslider.find()
      .then(websliders => res.json(websliders))
      .catch(err => res.status(400).json('Error: ' + err));
  });
  router.route('/:id').get((req, res) => {
    Webslider.findById(req.params.id)
      .then(websliders => res.json(websliders))
      .catch(err => res.status(400).json('Error: ' + err));
  });
  router.post('/add',upload.single('image'),(req,res,next)=>{
    const title = req.body.title;
    const image = req.file.path;
    const newWebslider=new Webslider({
      title,
      image
    })
    newWebslider.save()
  .then(() => res.json('Webslider added!'))
  .catch(err => res.status(400).json('Error: ' + err));
});
router.post('/update/:id',upload.single('image'),(req,res,next)=>{
  Webslider.findById(req.params.id)
    .then(webslider => {
      webslider.title = req.body.title;
      webslider.image = req.file.path;
      webslider.save()
        .then(() => res.json('Webslider updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});
router.route('/:id').delete((req, res) => {
  Webslider.findByIdAndDelete(req.params.id)
    .then(() => res.json('Webslider deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});
router.route('/delete').post(async(req,res)=>{
  const ids=req.body.arrayids;
  await Webslider.deleteMany({_id:{$in:ids}})
  res.status(200).json({ message: 'Deleted Successfully'});
});
 module.exports=router;