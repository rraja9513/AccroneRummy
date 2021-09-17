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
let Promotion=require('../models/promotion.model');
router.route('/').post((req, res) => {
    Promotion.find()
      .then(promotions => res.json(promotions))
      .catch(err => res.status(400).json('Error: ' + err));
  });
  router.route('/:id').get((req, res) => {
    Promotion.findById(req.params.id)
      .then(promotions => res.json(promotions))
      .catch(err => res.status(400).json('Error: ' + err));
  });
  router.post('/add',upload.single('image'),(req,res,next)=>{
    const title = req.body.title;
    const shortdescription = req.body.shortdescription;
    const description = req.body.description;
    const image = req.file.path;
    const newPromotion=new Promotion({
      title,
      shortdescription,
      description,
      image
    })
    newPromotion.save()
  .then(() => res.json('Promotion added!'))
  .catch(err => res.status(400).json('Error: ' + err));
});
router.post('/update/:id',upload.single('image'),(req,res,next)=>{
  Promotion.findById(req.params.id)
    .then(promotion => {
      promotion.title = req.body.title;
      promotion.shortdescription = req.body.shortdescription;
      promotion.description = req.body.description;
      promotion.image = req.file.path;
      promotion.save()
        .then(() => res.json('Promotion updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});
router.route('/:id').delete((req, res) => {
  Promotion.findByIdAndDelete(req.params.id)
    .then(() => res.json('Promotion deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});
router.route('/delete').post(async(req,res)=>{
  const ids=req.body.arrayids;
  await Promotion.deleteMany({_id:{$in:ids}})
  res.status(200).json({ message: 'Deleted Successfully'});
});
 module.exports=router;