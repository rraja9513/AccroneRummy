const router=require('express').Router();
let Baseurl=require('../models/baseurl.model');
router.route('/').post((req, res) => {
    Baseurl.find()
      .then(baseurls => res.json(baseurls))
      .catch(err => res.status(400).json('Error: ' + err));
  });
  router.route('/:id').get((req, res) => {
    Baseurl.findById(req.params.id)
      .then(baseurls => res.json(baseurls))
      .catch(err => res.status(400).json('Error: ' + err));
  });
  router.route('/add').post((req,res)=>{
    const url = req.body.url;
    const newBaseurl=new Baseurl({
       url
    })
    newBaseurl.save()
  .then(() => res.json('Baseurl added!'))
  .catch(err => res.status(400).json('Error: ' + err));
});
  router.route('/update/:id').post((req,res)=>{
  Baseurl.findById(req.params.id)
    .then(baseurl => {
      baseurl.url = req.body.url;
      baseurl.save()
        .then(() => res.json('Baseurl updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});
router.route('/:id').delete((req, res) => {
  Baseurl.findByIdAndDelete(req.params.id)
    .then(() => res.json('Baseurl deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});
router.route('/delete').post(async(req,res)=>{
  const ids=req.body.arrayids;
  await Baseurl.deleteMany({_id:{$in:ids}})
  res.status(200).json({ message: 'Deleted Successfully'});
});
 module.exports=router;