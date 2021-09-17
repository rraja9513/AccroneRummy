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
let Banner=require('../models/banner.model');
router.route('/').post((req, res) => {
    Banner.find()
      .then(banners => res.json(banners))
      .catch(err => res.status(400).json('Error: ' + err));
  });
  router.route('/:id').get((req, res) => {
    Banner.findById(req.params.id)
      .then(banners => res.json(banners))
      .catch(err => res.status(400).json('Error: ' + err));
  });
  router.post('/add',upload.single('image'),(req,res,next)=>{
    const title = req.body.title;
    const image = req.file.path;
    const newBanner=new Banner({
      title,
      image
    })
    newBanner.save()
  .then(() => res.json('Banner added!'))
  .catch(err => res.status(400).json('Error: ' + err));
});
router.post('/update/:id',upload.single('image'),(req,res,next)=>{
  Banner.findById(req.params.id)
    .then(banner => {
      banner.title = req.body.title;
      banner.image = req.file.path;
      banner.save()
        .then(() => res.json('Banner updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});
router.route('/:id').delete((req, res) => {
  Banner.findByIdAndDelete(req.params.id)
    .then(() => res.json('Banner deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});
router.route('/delete').post(async(req,res)=>{
  const ids=req.body.arrayids;
  await Banner.deleteMany({_id:{$in:ids}})
  res.status(200).json({ message: 'Deleted Successfully'});
});
 module.exports=router;